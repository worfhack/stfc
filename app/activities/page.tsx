// app/activities/page.tsx


import type { Metadata } from "next";
import {
  ActivitiesTexts,
  ActivitiesViewModel, AdditionalActivity,
  ApiActivitiesResponse,
  ApiImage,
  Hero,
  MainActivity, Seo,
  Stat
} from "@/app/activities/type";


// export const dynamic = "force-dynamic";


const getImageUrl = (
    image: ApiImage | {} | null | undefined
): string => {
  if (!image || typeof image !== "object") return "";
  const img = image as ApiImage;

  if (img.sizes && typeof img.sizes["medium_large"] === "string") {
    return img.sizes["medium_large"] as string;
  }
  if (img.url) return img.url;

  return "";
};

const stripTags = (str: string): string =>
    str.replace(/<[^>]*>/g, "").replace(/\s+$/g, "");

/* ===========================
   Mapping API → Vue front
   =========================== */

const mapActivitiesFromApi = (data: ApiActivitiesResponse): ActivitiesViewModel => {
  // SEO
  const seo: Seo = {
    title:
        data.seo?.title ||
        data.title ||
        "Activités du Star Trek French Club",
    description:
        data.seo?.description ||
        "Découvrez les activités du Star Trek French Club : rencontres, quiz, conventions, jeux entre fans et événements autour de l’univers Star Trek.",
    ogImageUrl: data.seo?.og_image
        ? getImageUrl(data.seo.og_image)
        : "",
  };

  // HERO
  const hero: Hero = {
    title: data.hero?.title || "Nos Activités",
    subtitle:
        data.hero?.subtitle ||
        "Découvrez toutes les façons de vivre votre passion pour Star Trek au sein de notre communauté dynamique et inclusive.",
    backgroundUrl:
        (data.hero?.background && getImageUrl(data.hero.background)) ||
        // fallback si pas d'image configurée dans ACF
        "https://readdy.ai/api/search-image?query=Star%20Trek%20Enterprise%20bridge%20with%20crew%20working%20together%2C%20collaborative%20atmosphere%2C%20futuristic%20technology%2C%20professional%20space%20photography%2C%20team%20spirit%2C%20exploration%20theme&width=1920&height=800&seq=activities-hero-bg&orientation=landscape",
  };

  // TEXTES SECTIONS
  const texts: ActivitiesTexts = {
    stats: {
      title:
          data.texts?.stats?.title ||
          "Quelques repères sur notre équipage",
      subtitle:
          data.texts?.stats?.subtitle ||
          "Membres, événements, années d’activité : une communauté bien ancrée dans la galaxie francophone.",
    },
    main: {
      title:
          data.texts?.main?.title ||
          "Activités principales",
      subtitle:
          data.texts?.main?.subtitle ||
          "Plongez au cœur de l’univers Star Trek avec nos activités phares.",
    },
    additional: {
      title:
          data.texts?.additional?.title ||
          "Autres activités",
      subtitle:
          data.texts?.additional?.subtitle ||
          "Explorez encore plus de façons de vous impliquer dans notre communauté.",
    },
    cta: {
      title:
          data.texts?.cta?.title ||
          "Prêt à rejoindre l’aventure ?",
      subtitle:
          data.texts?.cta?.subtitle ||
          "Devenez membre de notre communauté et participez à toutes ces activités passionnantes.",
      primaryLabel:
          data.texts?.cta?.primary_label ||
          "Devenir membre",
      secondaryLabel:
          data.texts?.cta?.secondary_label ||
          "Voir les événements",
    },
  };

  // STATS
  const stats: Stat[] = (data.stats || []).map((stat) => ({
    number: stat.number || "",
    label: stat.label || "",
    icon: stat.icon || "ri-star-line",
  }));

  // ACTIVITÉS PRINCIPALES
  const mainActivities: MainActivity[] = (data.main_activities || []).map(
      (activity) => ({
        title: activity.title || "",
        description: activity.description
            ? stripTags(activity.description)
            : "",
        image: getImageUrl(activity.image),
        icon: activity.icon || "ri-star-line",
        participants: activity.participants || "",
        features: Array.isArray(activity.features)
            ? activity.features
                .map((f) => f.item || "")
                .filter(Boolean)
            : [],
      })
  );

  // AUTRES ACTIVITÉS
  const additionalActivities: AdditionalActivity[] = Array.isArray(
      data.additional_activities
  )
      ? data.additional_activities.map((activity) => ({
        title: activity.title || "",
        description: activity.description
            ? stripTags(activity.description)
            : "",
        icon: activity.icon || "ri-star-line",
        participants: activity.participants || "",
        frequency: activity.frequency || "",
      }))
      : [];

  return { seo, hero, texts, stats, mainActivities, additionalActivities };
};

/* ===========================
   Fetch API
   =========================== */

// Helper brut pour réutiliser dans generateMetadata
async function fetchActivitiesFromApi(): Promise<ApiActivitiesResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_WP_API non défini");
  }

  const res = await fetch(`${baseUrl}/starfleet/v1/activities`, {
    // cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Erreur API activities (${res.status})`);
  }

  return (await res.json()) as ApiActivitiesResponse;
}

async function getActivities(): Promise<ActivitiesViewModel> {
  const json = await fetchActivitiesFromApi();
  return mapActivitiesFromApi(json);
}

/* ===========================
   SEO Next.js (app router)
   =========================== */

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchActivitiesFromApi();
  const seoTitle =
      data.seo?.title || "Activités du Star Trek French Club";
  const seoDescription =
      data.seo?.description ||
      "Découvrez les activités du Star Trek French Club : rencontres, quiz, conventions, jeux entre fans et événements autour de l’univers Star Trek.";
  const ogImageUrl = data.seo?.og_image
      ? getImageUrl(data.seo.og_image)
      : undefined;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

/* ===========================
   Page Component
   =========================== */

export default async function ActivitiesPage() {
  const vm = await getActivities();

  const count = vm.stats.length;
  const colMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  const gridCols: string = colMap[Math.min(count || 1, 4)];

  return (
      <>
        <div className="min-h-screen bg-gray-900 text-white">
          {/*<Header />*/}

          <main className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
              <div
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{ backgroundImage: `url(${vm.hero.backgroundUrl})` }}
              />
              <div className="relative max-w-7xl mx-auto px-6 text-center">
                <h1
                    className="text-5xl md:text-6xl font-bold mb-6"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {vm.hero.title}
                </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  {vm.hero.subtitle}
                </p>
              </div>
            </section>

            {/* Stats Section */}
            {vm.stats.length > 0 && (
                <section className="py-16 bg-gray-800/50">
                  <div className="max-w-7xl mx-auto px-6">
                    {(vm.texts.stats.title || vm.texts.stats.subtitle) && (
                        <div className="text-center mb-10">
                          {vm.texts.stats.title && (
                              <h2
                                  className="text-3xl font-bold mb-3"
                                  style={{ fontFamily: "Orbitron, sans-serif" }}
                              >
                                {vm.texts.stats.title}
                              </h2>
                          )}
                          {vm.texts.stats.subtitle && (
                              <p className="text-gray-300 max-w-2xl mx-auto">
                                {vm.texts.stats.subtitle}
                              </p>
                          )}
                        </div>
                    )}

                    <div className={`grid gap-8 md:grid-cols-2 lg:${gridCols}`}>
                      {vm.stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4">
                              <i
                                  className={`${stat.icon} text-2xl text-white`}
                              ></i>
                            </div>
                            <div
                                className="text-3xl font-bold text-blue-400 mb-2"
                                style={{ fontFamily: "Orbitron, sans-serif" }}
                            >
                              {stat.number}
                            </div>
                            <div className="text-gray-300">{stat.label}</div>
                          </div>
                      ))}
                    </div>
                  </div>
                </section>
            )}

            {/* Main Activities */}
            {vm.mainActivities.length > 0 && (
                <section className="py-20">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                      <h2
                          className="text-4xl font-bold mb-6"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      {vm.texts.main.title}
                    </span>
                      </h2>
                      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        {vm.texts.main.subtitle}
                      </p>
                    </div>

                    <div className="space-y-16">
                      {vm.mainActivities.map((activity, index) => (
                          <div
                              key={index}
                              className={`flex flex-col lg:flex-row items-center gap-12 ${
                                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                              }`}
                          >
                            <div className="lg:w-1/2">
                              <div className="relative overflow-hidden rounded-2xl">
                                {activity.image && (
                                    <img
                                        src={activity.image}
                                        alt={activity.title}
                                        className="w-full h-80 object-cover object-top"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                              </div>
                            </div>

                            <div className="lg:w-1/2">
                              <h3
                                  className="text-3xl font-bold mb-4 text-blue-400"
                                  style={{ fontFamily: "Orbitron, sans-serif" }}
                              >
                                {activity.title}
                              </h3>
                              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                                {activity.description}
                              </p>

                              {activity.participants && (
                                  <p className="text-sm text-blue-300 mb-4">
                                    <i className="ri-group-line mr-2"></i>
                                    {activity.participants}
                                  </p>
                              )}

                              {activity.features.length > 0 && (
                                  <ul className="space-y-3">
                                    {activity.features.map(
                                        (feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="flex items-center text-gray-300"
                                            >
                                              <i className="ri-check-line text-green-400 mr-3"></i>
                                              {feature}
                                            </li>
                                        )
                                    )}
                                  </ul>
                              )}
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                </section>
            )}

            {/* Additional Activities */}
            {vm.additionalActivities.length > 0 && (
                <section className="py-20 bg-gray-800">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                      <h2
                          className="text-4xl font-bold mb-6"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      {vm.texts.additional.title}
                    </span>
                      </h2>
                      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        {vm.texts.additional.subtitle}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {vm.additionalActivities.map((activity, index) => (
                          <div
                              key={index}
                              className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                          >
                            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
                              <i
                                  className={`${activity.icon} text-xl text-white`}
                              ></i>
                            </div>

                            <h3
                                className="text-xl font-semibold mb-3 text-purple-400"
                                style={{ fontFamily: "Orbitron, sans-serif" }}
                            >
                              {activity.title}
                            </h3>

                            <p className="text-gray-300 mb-4 leading-relaxed">
                              {activity.description}
                            </p>

                            <div className="flex items-center justify-between text-sm text-blue-400">
                              {activity.participants && (
                                  <span>
                            <i className="ri-group-line mr-2"></i>
                                    {activity.participants}
                          </span>
                              )}
                              {activity.frequency && (
                                  <span>
                            <i className="ri-time-line mr-2"></i>
                                    {activity.frequency}
                          </span>
                              )}
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h2
                    className="text-4xl font-bold mb-6"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {vm.texts.cta.title}
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  {vm.texts.cta.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap">
                    <i className="ri-user-add-line mr-2"></i>
                    {vm.texts.cta.primaryLabel}
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap">
                    <i className="ri-calendar-line mr-2"></i>
                    {vm.texts.cta.secondaryLabel}
                  </button>
                </div>
              </div>
            </section>
          </main>

          {/*<Footer />*/}
        </div>
      </>
  );
}

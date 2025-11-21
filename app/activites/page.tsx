// app/activities/page.tsx
import {
  RiStarLine,
  RiGroupLine,
  RiCheckLine,
  RiTimeLine,
  RiUserAddLine,
  RiCalendarLine,
} from "react-icons/ri";

import type { Metadata } from "next";
import {
  ActivitiesTexts,
  ActivitiesViewModel, AdditionalActivity,
  ApiActivitiesResponse,
  ApiImage,
  Hero,
  MainActivity, Seo,
  Stat
} from "@/app/activites/type";
import ComeWithUs from "@/components/ComeWithUsSection";
import {cache} from "react";
import {ApiCommunityResponse} from "@/app/types/community-page";
import {buildSeoMetadata} from "@/lib/seo";
import {getImageUrl} from "@/lib/image";

type IconName =
    | "ri-star-line"
    | "ri-group-line"
    | "ri-check-line"
    | "ri-time-line"
    | "ri-user-add-line"
    | "ri-calendar-line"
    | string; // pour laisser passer ce que renvoie l'API
// export const dynamic = "force-dynamic";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "ri-star-line": RiStarLine,
  "ri-group-line": RiGroupLine,
  "ri-check-line": RiCheckLine,
  "ri-time-line": RiTimeLine,
  "ri-user-add-line": RiUserAddLine,
  "ri-calendar-line": RiCalendarLine,
};

function Icon({ name, className }: { name?: IconName; className?: string }) {
  const key = name || "ri-star-line";
  const Comp = ICON_MAP[key] ?? RiStarLine; // fallback
  return <Comp className={className} />;
}


const stripTags = (str: string): string =>
    str.replace(/<[^>]*>/g, "").replace(/\s+$/g, "");



const mapActivitiesFromApi = (data: ApiActivitiesResponse): ActivitiesViewModel => {
  const seo: Seo = {
    seo_title: data.seo?.seo_title || data.title || "",
    seo_description: data.seo?.seo_description || "",
    seo_image: data.seo?.seo_image ? getImageUrl(data.seo.seo_image) : "",
  };

  // HERO
  const hero: Hero = {
    title: data.hero?.title || "",
    subtitle:
        data.hero?.subtitle || "",
    backgroundUrl: (data.hero?.background && getImageUrl(data.hero.background)) || ""
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


const fetchActivitiesFromApi  = cache(async (): Promise<ApiActivitiesResponse> => {

  const baseUrl = process.env.NEXT_PUBLIC_WP_API;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_WP_API non défini");
  }

  const res = await fetch(`${baseUrl}/starfleet/v1/activities`, {
  });

  if (!res.ok) {
    throw new Error(`Erreur API activities (${res.status})`);
  }
  return (await res.json()) as ApiActivitiesResponse;
});

async function getActivities(): Promise<ActivitiesViewModel> {
  const json = await fetchActivitiesFromApi();
  return mapActivitiesFromApi(json);
}


export async function generateMetadata(): Promise<Metadata> {
  const data = await getActivities();
  return buildSeoMetadata(data.seo, getImageUrl);
}

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
                              <Icon name={stat.icon} className="text-2xl text-white" />
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
                                    <Icon name={"ri-group-line"} className="mr-2" />
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
                                              <Icon name={"ri-check-line"} className="text-green-400 mr-3" />
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

                              <Icon name={activity.icon} className="text-xl text-white" />
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

                                  <Icon name={"ri-group-line"} className=" mr-2" />
                                    {activity.participants}
                          </span>
                              )}
                              {activity.frequency && (
                                  <span>
                                     <Icon name={"ri-time-line"} className=" mr-2" />
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

          <ComeWithUs />
          </main>

          {/*<Footer />*/}
        </div>
      </>
  );
}

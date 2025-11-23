// app/univers/page.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiBookLine, RiFilmLine,
  RiLightbulbLine, RiListOrdered,
  RiTimeLine
} from "react-icons/ri";
import ComeWithUs from "@/components/ComeWithUsSection";

export const revalidate = 3600;

type ApiSeo = {
  seo_title?: string;
  seo_description?: string;
  seo_image?: string | null;
};

type ApiHeroBadge = {
  icon?: string;
  label?: string;
};

type ApiHero = {
  title?: string;
  subtitle?: string;
  backgroundImage?: string | null;
  quote?: string;
  quoteAuthor?: string;
  badges?: ApiHeroBadge[];
};

type ApiImage = {
  url?: string | null;
  alt?: string | null;
};

type ChronologyItem = {
  title?: string;
  description?: string;
};

type EncyclopediaCard = {
  icon?: string;
  title?: string;
  description?: string;
};

type GlossaryItem = {
  term?: string;
  definition?: string;
};

type MediasBlock = {
  icon?: string;
  title?: string;
  description?: string;
};

type MediasOrder = {
  icon?: string;
  label?: string;
};

type ApiSections = {
  chronology?: {
    title?: string;
    intro?: string;
    items?: ChronologyItem[];
    button_label?: string;
    image?: ApiImage;
  };
  encyclopedia?: {
    title?: string;
    intro?: string;
    cards?: EncyclopediaCard[];
    glossary_title?: string;
    glossary_items?: GlossaryItem[];
    button_label?: string;
    image?: ApiImage;
  };
  medias?: {
    title?: string;
    intro?: string;
    blocks?: MediasBlock[];
    orders_title?: string;
    orders?: MediasOrder[];
    button_label?: string;
    image?: ApiImage;
  };
  cta?: {
    title?: string;
    text?: string;
    primary_button_label?: string;
    secondary_button_label?: string;
  };
};

type ApiUniversResponse = {
  page: {
    id: number;
    title: string;
    slug: string;
  };
  seo?: ApiSeo;
  hero?: ApiHero;
  sections?: ApiSections;
};


async function getUniversPage(): Promise<ApiUniversResponse | null> {
  const apiBase =
      process.env.NEXT_PUBLIC_WP_API ;

  try {
    const res = await fetch(`${apiBase}/starfleet/v1/univers`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Erreur API Univers:", res.status, await res.text());
      return null;
    }

    return (await res.json()) as ApiUniversResponse;
  } catch (e) {
    console.error("Erreur fetch Univers:", e);
    return null;
  }
}


export default async function UniversPage() {
  const data = await getUniversPage();

  const hero = data?.hero || {};
  const sections = data?.sections || {};

  const heroTitle = hero.title || data?.page?.title || "";
  const heroSubtitle = hero.subtitle || "";
  const heroBg = hero.backgroundImage || "";
  const heroBadges = hero.badges || [];

  const chronology = sections.chronology || {};
  const encyclopedia = sections.encyclopedia || {};
  const medias = sections.medias || {};
  const cta = sections.cta || {};



  return (
      <div className="pt-20">
        <main>




          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-gray-900" />
            {heroBg && (
                <div className="absolute inset-0 opacity-10">
                  <img
                      src={heroBg}
                      alt=""
                      className="w-full h-full object-cover object-top"
                  />
                </div>
            )}

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <nav className="mb-6 text-sm text-gray-400">
                <ol className="flex items-center justify-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-blue-400">
                      Accueil
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-gray-300">
                    {data?.page?.title || ""}
                  </li>
                </ol>
              </nav>

              <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {heroTitle}
              </h1>

              {heroSubtitle && (
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    {heroSubtitle}
                  </p>
              )}

            </div>
          </section>

          {/* Section 1: Chronologie */}
          <section className="py-16 bg-gray-800/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <RiTimeLine className="ri-time-line text-2xl text-blue-400" />
                    </div>
                    {chronology.title && (
                        <h2
                            className="text-3xl font-bold"
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          {chronology.title}
                        </h2>
                    )}
                  </div>

                  {chronology.intro && (
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {chronology.intro}
                      </p>
                  )}

                  <div className="space-y-4 mb-8">
                    {(chronology.items || []).map((item, index) => (
                        <div
                            className="flex items-start gap-3"
                            key={index}
                        >

                          <RiArrowRightSLine  className="ri-time-line text-blue-400 text-xl mt-1" />
                          <div>
                            {item.title && (
                                <h3 className="font-semibold text-lg mb-1">
                                  {item.title}
                                </h3>
                            )}
                            {item.description && (
                                <p className="text-gray-400 text-sm">
                                  {item.description}
                                </p>
                            )}
                          </div>
                        </div>
                    ))}
                  </div>

                  {chronology.button_label && (
                      <Link
                          href="/chronologie-star-trek"
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap"
                      >
                        {chronology.button_label}
                        <RiArrowRightLine />
                      </Link>
                  )}
                </div>

                <div className="relative">
                  {chronology.image?.url && (
                      <div className="rounded-2xl overflow-hidden border border-gray-700 bg-gray-800/40">
                        <img
                            src={chronology.image.url}
                            alt={chronology.image.alt || ""}
                            className="w-full h-auto object-cover object-top"
                        />
                      </div>
                  )}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Encyclopédie */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 relative">
                  {encyclopedia.image?.url && (
                      <div className="rounded-2xl overflow-hidden border border-gray-700 bg-gray-800/40">
                        <img
                            src={encyclopedia.image.url}
                            alt={encyclopedia.image.alt || ""}
                            className="w-full h-auto object-cover object-top"
                        />
                      </div>
                  )}
                  <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                </div>

                <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <RiBookLine className="text-2xl text-purple-400" />
                    </div>
                    {encyclopedia.title && (
                        <h2
                            className="text-3xl font-bold"
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          {encyclopedia.title}
                        </h2>
                    )}
                  </div>

                  {encyclopedia.intro && (
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {encyclopedia.intro}
                      </p>
                  )}

                  {(encyclopedia.cards || []).length > 0 && (
                      <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {(encyclopedia.cards || []).map((card, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
                            >
                              <div className="flex items-center gap-2 mb-2">

                                {card.title && (
                                    <h3 className="font-semibold">{card.title}</h3>
                                )}
                              </div>
                              {card.description && (
                                  <p className="text-sm text-gray-400">
                                    {card.description}
                                  </p>
                              )}
                            </div>
                        ))}
                      </div>
                  )}

                  {(encyclopedia.glossary_title ||
                      (encyclopedia.glossary_items || []).length > 0) && (
                      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/30 rounded-lg p-4 mb-6">
                        {encyclopedia.glossary_title && (
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                              <RiLightbulbLine className="text-yellow-400" />
                              {encyclopedia.glossary_title}
                            </h3>
                        )}
                        <ul className="text-sm text-gray-300 space-y-1">
                          {(encyclopedia.glossary_items || []).map(
                              (item, index) => (
                                  <li key={index}>
                                    {item.term && (
                                        <strong>{item.term}: </strong>
                                    )}
                                    {item.definition}
                                  </li>
                              )
                          )}
                        </ul>
                      </div>
                  )}

                  {encyclopedia.button_label && (
                      <Link
                          href="/encyclopedie-star-trek"
                          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap"
                      >
                        {encyclopedia.button_label}
                        <RiArrowRightLine/>
                      </Link>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Films & Séries */}
          <section className="py-16 bg-gray-800/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <RiFilmLine className="text-red-400" />
                    </div>
                    {medias.title && (
                        <h2
                            className="text-3xl font-bold"
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          {medias.title}
                        </h2>
                    )}
                  </div>

                  {medias.intro && (
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {medias.intro}
                      </p>
                  )}

                  {(medias.blocks || []).length > 0 && (
                      <div className="space-y-4 mb-8">
                        {(medias.blocks || []).map((block, index) => (
                            <div
                                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
                                key={index}
                            >
                              {block.title && (
                                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    {block.icon && (
                                        <i
                                            className={`${block.icon} text-blue-400`}
                                        />
                                    )}
                                    {block.title}
                                  </h3>
                              )}
                              {block.description && (
                                  <p className="text-sm text-gray-400">
                                    {block.description}
                                  </p>
                              )}
                            </div>
                        ))}
                      </div>
                  )}

                  {(medias.orders_title ||
                      (medias.orders || []).length > 0) && (
                      <div className="bg-gradient-to-r from-blue-900/20 to-red-900/20 border border-blue-700/30 rounded-lg p-4 mb-6">
                        {medias.orders_title && (
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <RiListOrdered className="text-yellow-400" />
                              {medias.orders_title}
                            </h3>
                        )}
                        <div className="grid sm:grid-cols-3 gap-3 text-sm">
                          {(medias.orders || []).map((order, index) => (
                              <div
                                  key={index}
                                  className="bg-gray-800/50 rounded p-2 text-center"
                              >
                                {order.label && (
                                    <strong>{order.label}</strong>
                                )}
                              </div>
                          ))}
                        </div>
                      </div>
                  )}

                  {medias.button_label && (
                      <Link
                          href="/films-series-star-trek"
                          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap"
                      >
                        {medias.button_label}
                        <RiArrowRightLine  />

                      </Link>
                  )}
                </div>

                <div className="relative">
                  {medias.image?.url && (
                      <div className="rounded-2xl overflow-hidden border border-gray-700 bg-gray-800/40">
                        <img
                            src={medias.image.url}
                            alt={medias.image.alt || ""}
                            className="w-full h-auto object-cover object-top"
                        />
                      </div>
                  )}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl" />
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30" />
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {cta.title && (
                  <h2
                      className="text-3xl font-bold mb-4"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    {cta.title}
                  </h2>
              )}
              {cta.text && (
                  <p className="text-gray-300 mb-8 text-lg">
                    {cta.text}
                  </p>
              )}

            </div>
          </section>
          <ComeWithUs />
        </main>

      </div>
  );
}

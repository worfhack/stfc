import { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { getImageUrl } from "@/lib/image";
import { cache } from "react";
import Link from "next/link";

type ApiMember = {
  name: string;
  role: string;
  starTrekRank: string;
  rankInsignia?: string;
  photo?: string;
  description?: string;
  specialties?: string[];
  yearsOfService?: string;
  favoriteShow?: string;
};

type Highlight = {
  icon: string;
  title: string;
  text: string;
};

type BlockWithBullets = {
  title: string;
  content: string;
  bullets: string[];
};

type BoardIntro = {
  title: string;
  paragraphs: string[];
};

type ContactSection = {
  title: string;
  text: string;
  primaryCtaLabel: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
};

type AssociationPayload = {
  life: {
    title: string;
    intro: string; // HTML (wysiwyg)
    highlights: Highlight[];
  };
  conventions: {
    title: string;
    intro: string;
    blocks: BlockWithBullets[];
  };
  involvement: {
    title: string;
    intro: string;
    blocks: BlockWithBullets[];
  };
  boardIntro: BoardIntro;
  contact: ContactSection;
};

// conforme à ton JSON API
type BoardSeo = {
  seo_title?: string;
  seo_description?: string;
  seo_image?: string | null;
};

type BoardApiResponse = {
  page: {
    id: number;
    title: string;
    slug: string;
  };
  seo?: BoardSeo;
  hero?: {
    title?: string;
    subtitle?: string;
    quote?: string;
    quoteAuthor?: string;
    backgroundImage?: string;
  };
  association?: AssociationPayload;
  members?: ApiMember[];
};

const fetchBoardPage = cache(async (): Promise<BoardApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_WP_API}/starfleet/v1/board`;
  const res = await fetch(url, {});
  if (!res.ok) {
    throw new Error("Failed to fetch board page");
  }
  return res.json();
});

function getRankColor(rank: string) {
  switch (rank) {
    case "Capitaine":
      return "from-yellow-500 to-orange-500";
    case "Commandant":
      return "from-red-500 to-pink-500";
    case "Lieutenant-Commandant":
      return "from-blue-500 to-cyan-500";
    default:
      return "from-gray-500 to-gray-600";
  }
}

// rotation bleu / violet / jaune
function getAccentTextClass(index: number): string {
  const classes = ["text-blue-400", "text-purple-400", "text-yellow-400"];
  return classes[index % classes.length];
}

function getAccentIconClass(index: number): string {
  const classes = ["text-blue-400", "text-purple-400", "text-yellow-400"];
  return classes[index % classes.length];
}

// fallback d’icône si vide
function getHighlightIcon(icon: string | undefined, index: number): string {
  if (icon && icon.trim() !== "") return icon;
  const defaults = ["ri-group-line", "ri-movie-2-line", "ri-planet-line"];
  return defaults[index % defaults.length];
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchBoardPage();
  // buildSeoMetadata sait gérer ce shape (seo_title, seo_description, seo_image)
  return buildSeoMetadata(data.seo, getImageUrl);
}

export default async function BoardPage() {
  const data = await fetchBoardPage();
  const { hero, members, association } = data;

  const boardMembers: ApiMember[] = members && members.length > 0 ? members : [];

  const life = association?.life;
  const conventions = association?.conventions;
  const involvement = association?.involvement;
  const boardIntro = association?.boardIntro;
  const contact = association?.contact;

  const heroTitle = hero?.title ?? data.page?.title ?? "Vie associative";
  const heroSubtitle = hero?.subtitle ?? "";
  const heroQuote = hero?.quote ?? "";
  const heroQuoteAuthor = hero?.quoteAuthor ?? "";
  const heroBg =
      hero?.backgroundImage ?? "/images/association-bg-stars.jpg";

  const contactTitle = contact?.title ?? "";
  const contactText = contact?.text ?? "";
  const contactPrimaryLabel = contact?.primaryCtaLabel ?? "";
  const contactSecondaryLabel = contact?.secondaryCtaLabel ?? "";

  return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/*<Header />*/}

        <main className="pt-20">
          {/* HERO : Vie associative */}
          <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url('${heroBg}')` }}
            ></div>
            <div className="relative max-w-7xl mx-auto px-6 text-center">
              <h1
                  className="text-5xl md:text-6xl font-bold mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                {heroTitle}
              </span>
              </h1>
              {heroSubtitle && (
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                    {heroSubtitle}
                  </p>
              )}
              {(heroQuote || heroQuoteAuthor) && (
                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-2xl p-6 border border-yellow-500/30 max-w-2xl mx-auto">
                    {heroQuote && (
                        <p
                            className="text-lg font-semibold text-yellow-400 italic mb-2"
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          {heroQuote}
                        </p>
                    )}
                    {heroQuoteAuthor && (
                        <p className="text-sm text-gray-300">{heroQuoteAuthor}</p>
                    )}
                  </div>
              )}
            </div>
          </section>

          {/* SECTION 1 : La vie associative au quotidien */}
          {life && (
              <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-950">
                <div className="max-w-6xl mx-auto px-6">
                  <div className="grid gap-10 md:grid-cols-2 items-start">
                    {/* Colonne de gauche : texte principal */}
                    <div>
                      <h2
                          className="text-3xl md:text-4xl font-bold mb-4"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      {life.title}
                    </span>
                      </h2>

                      {life.intro && (
                          <div
                              className="prose prose-invert max-w-none text-lg text-gray-300 space-y-4"
                              dangerouslySetInnerHTML={{ __html: life.intro }}
                          />
                      )}
                    </div>

                    {/* Colonne de droite : encarts */}
                    <div className="space-y-4">
                      {life.highlights?.map((highlight, idx) => (
                          <div
                              key={idx}
                              className="bg-gray-800/70 border border-gray-700 rounded-2xl p-5"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <i
                                  className={`${getHighlightIcon(
                                      highlight.icon,
                                      idx
                                  )} text-2xl ${getAccentIconClass(idx)}`}
                              />
                              <h3
                                  className={`text-xl font-semibold ${getAccentTextClass(
                                      idx
                                  )}`}
                              >
                                {highlight.title}
                              </h3>
                            </div>
                            <p className="text-gray-300">{highlight.text}</p>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
          )}

          {/* SECTION 2 : Conventions & grands événements */}
          {conventions && (
              <section className="py-16 bg-gradient-to-br from-blue-950/40 via-gray-900 to-purple-950/40 border-y border-gray-800">
                <div className="max-w-6xl mx-auto px-6">
                  <div className="text-center mb-10">
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                    {conventions.title}
                  </span>
                    </h2>
                    {conventions.intro && (
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                          {conventions.intro}
                        </p>
                    )}
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {conventions.blocks?.map((block, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6"
                        >
                          <h3
                              className={`text-xl font-semibold mb-3 ${getAccentTextClass(
                                  idx
                              )}`}
                          >
                            {block.title}
                          </h3>
                          <p className="text-gray-300 mb-4">{block.content}</p>
                          {block.bullets && block.bullets.length > 0 && (
                              <ul className="text-sm text-gray-300 space-y-1">
                                {block.bullets.map((bullet, i) => (
                                    <li key={i}>• {bullet}</li>
                                ))}
                              </ul>
                          )}
                        </div>
                    ))}
                  </div>
                </div>
              </section>
          )}

          {involvement && (
              <section className="py-16 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-b border-gray-800">
                <div className="max-w-6xl mx-auto px-6">
                  <div className="text-center mb-10">
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {involvement.title}
                  </span>
                    </h2>
                    {involvement.intro && (
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                          {involvement.intro}
                        </p>
                    )}
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {involvement.blocks?.map((block, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6"
                        >
                          <h3
                              className={`text-xl font-semibold mb-3 ${getAccentTextClass(
                                  idx
                              )}`}
                          >
                            {block.title}
                          </h3>
                          <p className="text-gray-300 mb-4">{block.content}</p>
                          {block.bullets && block.bullets.length > 0 && (
                              <ul className="text-sm text-gray-300 space-y-1">
                                {block.bullets.map((bullet, i) => (
                                    <li key={i}>• {bullet}</li>
                                ))}
                              </ul>
                          )}
                        </div>
                    ))}
                  </div>
                </div>
              </section>
          )}

          {/* SECTION 4 : Le bureau */}
          {boardIntro && (
              <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center mb-10 md:mb-16">
                    <h2
                        className="text-4xl font-bold mb-6"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {boardIntro.title}
                  </span>
                    </h2>

                    {boardIntro.paragraphs && boardIntro.paragraphs.length > 0 && (
                        <div className="space-y-4 max-w-3xl mx-auto">
                          {boardIntro.paragraphs.map((p, idx) => (
                              <p
                                  key={idx}
                                  className={`text-gray-300 ${
                                      idx === 0 ? "text-xl" : "text-lg"
                                  }`}
                              >
                                {p}
                              </p>
                          ))}
                        </div>
                    )}
                  </div>

                  {boardMembers.length > 0 ? (
                      <>
                        <div className="space-y-16">
                          {boardMembers.map((member, index) => (
                              <div
                                  key={member.name + index}
                                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                                  }`}
                              >
                                <div className="lg:w-1/2 text-center">
                                  <div className="relative inline-block">
                                    {member.photo && (
                                        <img
                                            src={member.photo}
                                            alt={member.name}
                                            className="w-80 h-80 rounded-2xl object-cover border-4 border-gray-700 shadow-2xl"
                                        />
                                    )}

                                    <div className="mt-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                                      <div
                                          className={`text-2xl font-bold bg-gradient-to-r ${getRankColor(
                                              member.starTrekRank
                                          )} bg-clip-text text-transparent mb-1`}
                                          style={{ fontFamily: "Orbitron, sans-serif" }}
                                      >
                                        {member.starTrekRank}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Infos membre */}
                                <div className="lg:w-1/2">
                                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                                    <div className="mb-6">
                                      <h3
                                          className="text-4xl font-bold mb-2 text-blue-400"
                                          style={{ fontFamily: "Orbitron, sans-serif" }}
                                      >
                                        {member.name}
                                      </h3>
                                      <p className="text-xl text-purple-400 font-semibold mb-2">
                                        {member.role}
                                      </p>
                                    </div>

                                    {member.description && (
                                        <div className="relative mb-6">
                                          <div className="absolute -top-4 -left-1 text-5xl text-yellow-500/25 select-none">
                                            “
                                          </div>
                                          <div className="bg-gray-900/70 border border-gray-700/80 rounded-2xl px-6 py-5">
                                            <p className="text-gray-100 leading-relaxed text-lg">
                                              {member.description}
                                            </p>
                                          </div>
                                          <div className="mt-2 text-xs uppercase tracking-wide text-yellow-400/80">
                                            Journal de bord de {member.name}
                                          </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                      {member.yearsOfService && (
                                          <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-500/30">
                                            <div className="text-blue-400 font-semibold mb-1">
                                              Ancienneté
                                            </div>
                                            <div className="text-white text-lg">
                                              {member.yearsOfService}
                                            </div>
                                          </div>
                                      )}
                                      {member.favoriteShow && (
                                          <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/30">
                                            <div className="text-purple-400 font-semibold mb-1">
                                              Série favorite
                                            </div>
                                            <div className="text-white text-lg">
                                              {member.favoriteShow}
                                            </div>
                                          </div>
                                      )}
                                    </div>

                                    {member.specialties && member.specialties.length > 0 && (
                                        <div className="mb-6">
                                          <h4 className="text-lg font-semibold mb-3 text-yellow-400">
                                            Domaines d&apos;action
                                          </h4>
                                          <div className="flex flex-wrap gap-2">
                                            {member.specialties.map((specialty, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
                                                >
                                      {specialty}
                                    </span>
                                            ))}
                                          </div>
                                        </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                          ))}
                        </div>
                      </>
                  ) : (
                      <div className="text-center text-gray-400 mt-10">
                        Les membres du bureau seront annoncés prochainement.
                      </div>
                  )}
                </div>
              </section>
          )}

          {/* SECTION 5 : Contact */}
          {contact && (
              <section className="py-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                  {contactTitle && (
                      <h2
                          className="text-3xl font-bold mb-6"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {contactTitle}
                  </span>
                      </h2>
                  )}
                  {contactText && (
                      <p className="text-xl text-gray-300 mb-8">
                        {contactText}
                      </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {contact.primaryCtaLabel && (
                            <Link
                                href="/nous-contacter"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap inline-flex items-center justify-center"
                            >
                              <i className="ri-mail-line mr-2"></i>
                              {contactPrimaryLabel}
                            </Link>
                    )}


                  </div>
                </div>
              </section>
          )}
        </main>

        {/*<Footer />*/}
      </div>
  );
}

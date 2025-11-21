import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Metadata} from "next";
import {buildSeoMetadata} from "@/lib/seo";
import {getImageUrl} from "@/lib/image";
import {cache} from "react";
import {ApiCommunityResponse} from "@/app/types/community-page";

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

type BoardApiResponse = {
  seo?: {
    title?: string;
    description?: string;
  };
  hero?: {
    title?: string;
    subtitle?: string;
    quote?: string;
    quoteAuthor?: string;
    backgroundImage?: string;
  };
  members?: ApiMember[];
};


const fetchBoardPage = cache(async (): Promise<BoardApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_WP_API}/starfleet/v1/board`;
  const res = await fetch(url, {});
  if (!res.ok) {
    throw new Error("");
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

function getRankDescription(rank: string) {
  switch (rank) {
    case "Capitaine":
      return "Grade de référence pour la mise en route des projets et l’orientation globale du club.";
    case "Commandant":
      return "Officier supérieur chargé de la coordination quotidienne et du soutien opérationnel du bureau.";
    case "Lieutenant-Commandant":
      return "Officier expérimenté en charge de domaines spécialisés et du suivi des actions.";
    default:
      return "";
  }
}



export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchBoardPage();
  return buildSeoMetadata(data.seo, getImageUrl);
}

export default async function BoardPage() {
  const data = await fetchBoardPage();
  const { hero, members } = data;

  const boardMembers: ApiMember[] = members && members.length > 0 ? members : [];

  const heroTitle = hero?.title ?? "Vie associative";
  const heroSubtitle =
      hero?.subtitle ??
      "Un équipage de fans bénévoles qui font vivre le Star Trek French Club au quotidien.";
  const heroQuote =
      hero?.quote ??
      "« L’équipage est plus que la somme de ses membres : c’est une famille. »";
  const heroQuoteAuthor = hero?.quoteAuthor ?? "— Star Trek French Club";
  const heroBg = hero?.backgroundImage ?? "/images/association-bg-stars.jpg";

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
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                {heroSubtitle}
              </p>
              <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-2xl p-6 border border-yellow-500/30 max-w-2xl mx-auto">
                <p
                    className="text-lg font-semibold text-yellow-400 italic mb-2"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {heroQuote}
                </p>
                {heroQuoteAuthor && (
                    <p className="text-sm text-gray-300">{heroQuoteAuthor}</p>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 1 : La vie associative au quotidien */}
          <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-950">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid gap-10 md:grid-cols-2 items-start">
                <div>
                  <h2
                      className="text-3xl md:text-4xl font-bold mb-4"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Une association vivante
                  </span>
                  </h2>
                  <p className="text-lg text-gray-300 mb-4">
                    Le Star Trek French Club est une association loi 1901 animée
                    par des fans bénévoles. Notre objectif : rassembler la
                    communauté francophone autour de Star Trek, créer du lien et
                    faire vivre l’esprit de la Fédération au-delà de l’écran.
                  </p>
                  <p className="text-lg text-gray-300 mb-4">
                    Concrètement, cela passe par l’organisation d’événements,
                    rencontres IRL et en ligne, animations en conventions,
                    contenus éditoriaux, quiz, podcasts, et de nombreux projets
                    portés par les membres eux-mêmes.
                  </p>
                  <p className="text-lg text-gray-300">
                    La vie associative, c’est aussi tout ce travail invisible :
                    préparation des animations, coordination avec les organisateurs
                    d’événements, gestion des partenaires, suivi administratif
                    et accompagnement des bénévoles qui rejoignent l’équipage.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="ri-group-line text-2xl text-blue-400" />
                      <h3 className="text-xl font-semibold text-blue-400">
                        Une communauté fédérée
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Membres, sympathisants, partenaires : chacun trouve sa
                      place, qu’il soit simple curieux ou encyclopédie vivante
                      de Star Trek.
                    </p>
                  </div>

                  <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="ri-movie-2-line text-2xl text-purple-400" />
                      <h3 className="text-xl font-semibold text-purple-400">
                        Des activités variées
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Projections, débriefs d’épisodes, soirées thématiques,
                      jeux de rôle, quiz, ateliers créatifs… La programmation
                      évolue avec les envies de l’équipage.
                    </p>
                  </div>

                  <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <i className="ri-planet-line text-2xl text-yellow-400" />
                      <h3 className="text-xl font-semibold text-yellow-400">
                        L’esprit Starfleet
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Inclusion, curiosité, bienveillance, envie de découvrir et
                      de construire : nous nous inspirons des valeurs de la
                      Fédération pour faire vivre le club.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2 : Conventions & grands événements */}
          <section className="py-16 bg-gradient-to-br from-blue-950/40 via-gray-900 to-purple-950/40 border-y border-gray-800">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-10">
                <h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Conventions & grands événements
                </span>
                </h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  Les conventions sont un pilier de la vie du club : c’est là que
                  nous rencontrons le plus de fans, tenons des stands, proposons
                  des animations et faisons découvrir l’univers de Star Trek à un
                  public très large.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">
                    Stands & rencontres
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Sur les conventions, le club tient des stands aux couleurs de
                    Starfleet&nbsp;: informations, échanges entre fans, photos,
                    mise en avant des activités du club et de la communauté.
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Accueil du public et des nouveaux fans</li>
                    <li>• Présentation des séries et de l’univers</li>
                    <li>• Diffusion des infos sur le club et ses projets</li>
                  </ul>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-purple-400">
                    Animations & programmations
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Quizz géants, conférences, tables rondes, ateliers, jeux
                    de piste, mises en scène : une partie de la programmation
                    des conventions est pensée et animée par le club.
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Quiz en salle et animations plateau</li>
                    <li>• Conférences et présentations thématiques</li>
                    <li>• Activités ludiques pour tous les publics</li>
                  </ul>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                    Coulisses & logistique
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Un stand réussi, ce sont aussi des bénévoles en amont&nbsp;:
                    préparation du matériel, gestion des plannings, transport,
                    montage et démontage, coordination avec l’organisation.
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Préparation des décors et supports</li>
                    <li>• Planification des équipes de bénévoles</li>
                    <li>• Montage, démontage et rangement du stand</li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 text-center">
                <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
                  Rejoindre l’équipe «&nbsp;conventions&nbsp;», c’est participer
                  à la vitrine la plus visible du club, vivre l’événement de
                  l’intérieur et contribuer à faire rayonner l’univers de Star
                  Trek auprès du grand public.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3 : S’impliquer dans la vie du club */}
          <section className="py-16 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-10">
                <h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  S’impliquer dans la vie du club
                </span>
                </h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  La vie associative n’existe que grâce aux membres qui
                  s’impliquent. Chacun peut apporter sa pierre à l’édifice, selon
                  ses envies, ses compétences et son temps disponible.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">
                    Don de temps
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Quelques heures pour tenir un stand, animer un quiz, aider
                    à la logistique d’un événement ou modérer un salon en ligne.
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Animation en convention ou en ligne</li>
                    <li>• Aide ponctuelle sur un événement</li>
                    <li>• Accueil des nouveaux membres</li>
                  </ul>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-purple-400">
                    Compétences & projets
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Graphisme, montage, écriture, développement web, organisation
                    d’événements… Le club vit grâce aux projets portés par les
                    membres.
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Rédaction d’articles ou dossiers</li>
                    <li>• Création graphique & visuelle</li>
                    <li>• Conception d’animations pour conventions</li>
                  </ul>
                </div>

                <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                    Prise de responsabilités
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Envie d’aller plus loin&nbsp;? Certains membres rejoignent des
                    pôles ou le bureau pour coordonner durablement la vie du club.
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Référent «&nbsp;conventions&nbsp;» ou d’activité</li>
                    <li>• Coordination de projets récurrents</li>
                    <li>• Participation au bureau ou à son entourage</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 : Le bureau */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10 md:mb-16">
                <h2
                    className="text-4xl font-bold mb-6"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Le bureau du Star Trek French Club
                </span>
                </h2>

                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                  Le bureau est l’équipage de passerelle de l’association : il
                  guide, coordonne et arbitre pour que la vie du club reste fluide,
                  cohérente et fidèle à l’esprit de la Fédération.
                </p>

                <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-2">
                  Ses membres sont{" "}
                  <span className="font-semibold text-white">
                  élus en Assemblée générale pour un mandat de 2&nbsp;ans
                </span>
                  , et agissent comme des capitaines et officiers de confiance
                  au service de la communauté.
                </p>

                <p className="text-base text-gray-400 max-w-3xl mx-auto">
                  Mais le plus important reste l’ensemble des adhérents&nbsp;: chaque
                  membre du club est indispensable au rayonnement du Star Trek
                  French Club, qu’il soit simple curieux, bénévole ponctuel ou
                  pilier de l’organisation.
                </p>
              </div>

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

              <div className="mt-16 text-center max-w-3xl mx-auto">
                <p className="text-sm text-gray-400">
                  Le bureau n’est pas une tour de contrôle isolée, mais une
                  passerelle au service des adhérents&nbsp;: sans l’énergie,
                  l’imagination et la participation de chacun, le club ne serait
                  qu’une coque vide en orbite autour de ses rêves.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5 : Contact */}
          <section className="py-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2
                  className="text-3xl font-bold mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Contacter le bureau
              </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Le bureau est à votre écoute pour vos questions, idées d’activités
                ou propositions de collaboration autour de Star Trek.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap">
                  <i className="ri-mail-line mr-2"></i>
                  Envoyer un message
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-purple-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap">
                  <i className="ri-calendar-line mr-2"></i>
                  Proposer une rencontre
                </button>
              </div>
            </div>
          </section>
        </main>

        {/*<Footer />*/}
      </div>
  );
}

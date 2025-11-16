import Header from "@/components/Header";
import Footer from "@/components/Footer";

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



async function fetchBoardPage(): Promise<BoardApiResponse> {
  const url = `${process.env.NEXT_PUBLIC_WP_API}/starfleet/v1/board`;
  const res = await fetch(url, {

  });

  if (!res.ok) {
    console.error("Failed to fetch board data", res.status);
    // On renvoie juste un objet vide, on tombera sur le fallback
    return {};
  }

  return res.json();
}

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

export default async function BoardPage() {
  const data = await fetchBoardPage();
  const { hero, members } = data;

  const boardMembers: ApiMember[] =
      members && members.length > 0 ? members :[];

  const heroTitle = hero?.title ?? "Le Bureau";
  const heroSubtitle =
      hero?.subtitle ??
      "";
  const heroQuote =
      hero?.quote ??
      "";
  const heroQuoteAuthor =
      hero?.quoteAuthor ?? "";
  const heroBg =
      hero?.backgroundImage ?? "";

  return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/*<Header />*/}

        <main className="pt-20">
          {/* Hero Section */}
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
                    className="text-lg font-semibold text-yellow-400 italic"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {heroQuote}
                </p>
              </div>
            </div>
          </section>

          {/* Board Members */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2
                    className="text-4xl font-bold mb-6"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Nos officiers bénévoles
                </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Chacun·e apporte ses compétences et son temps pour faire vivre
                  le club et développer les activités autour de Star Trek.
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
                          <img
                              src={member.photo}
                              alt={member.name}
                              className="w-80 h-80 rounded-2xl object-cover border-4 border-gray-700 shadow-2xl"
                          />

                          {member.starTrekRank && (
                              <div
                                  className={`absolute -top-4 -right-4 bg-gradient-to-r ${getRankColor(
                                      member.starTrekRank
                                  )} rounded-full p-4 border-4 border-gray-900 shadow-lg`}
                              >
                                <i
                                    className={`${
                                        member.rankInsignia ?? "ri-star-fill"
                                    } text-2xl text-white`}
                                ></i>
                              </div>
                          )}

                          <div className="mt-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                            <div
                                className={`text-2xl font-bold bg-gradient-to-r ${getRankColor(
                                    member.starTrekRank
                                )} bg-clip-text text-transparent mb-2`}
                                style={{ fontFamily: "Orbitron, sans-serif" }}
                            >
                              {member.starTrekRank}
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* Infos */}
                      <div className="lg:w-1/2">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                          <div className="mb-6">
                            <h3
                                className="text-4xl font-bold mb-2 text-blue-400"
                                style={{ fontFamily: "Orbitron, sans-serif" }}
                            >
                              {member.name}
                            </h3>
                            <p className="text-xl text-purple-400 font-semibold mb-4">
                              {member.role}
                            </p>
                          </div>

                          {member.description && (
                              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                                {member.description}
                              </p>
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
            </div>
          </section>

          {/* Contact */}
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

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  RiRocketLine,
  RiCalendarEventLine,
  RiShieldCheckLine,
  RiStarSmileLine,
  RiSmartphoneLine,
  RiPulseLine,
  RiEarthLine,
  RiHeartLine,
  RiUserSmileLine,
  RiUserAddLine,
  RiMailLine,
} from "react-icons/ri";
import type { IconType } from "react-icons";

const milestones: {
  year: string;
  title: string;
  description: string;
  icon: IconType;
}[] = [
  {
    year: "2015",
    title: "Naissance du STFC",
    description:
        "Création informelle du Star Trek French Club à Lyon, à l’initiative de Renato Negroni, avec une simple page Facebook.",
    icon: RiRocketLine,
  },
  {
    year: "2015–2016",
    title: "Premières Rencontres",
    description:
        "Organisation des premières rencontres à Lyon, puis d’autres projets de rencontres à Paris, Nantes, Clermont-Ferrand…",
    icon: RiCalendarEventLine,
  },
  {
    year: "2016",
    title: "Association Officielle",
    description:
        "Le 8 octobre 2016, le STFC devient officiellement une association loi 1901 pour structurer la communauté.",
    icon: RiShieldCheckLine,
  },
  {
    year: "2017–2019",
    title: "Stands & Conventions",
    description:
        "Présence croissante en salons et conventions, avec un stand dédié pour présenter Star Trek et le STFC au public.",
    icon: RiStarSmileLine,
  },
  {
    year: "2020",
    title: "Adaptation Numérique",
    description:
        "Renforcement des échanges en ligne pour garder le lien pendant la pandémie et continuer à faire vivre la communauté.",
    icon: RiSmartphoneLine,
  },
  {
    year: "2021–2023",
    title: "Turbulences & Résilience",
    description:
        "La vie associative traverse quelques turbulences, mais le club reste vivant grâce à un noyau de bénévoles et de passionnés.",
    icon: RiPulseLine,
  },
  {
    year: "2024+",
    title: "Relance & Nouvelle Phase",
    description:
        "Nouveau site, nouvelle dynamique, et détermination à faire du STFC une grande structure associative francophone dédiée à Star Trek.",
    icon: RiEarthLine,
  },
];

const teamMembers = [
  {
    name: "Renato Negroni",
    role: "Fondateur du STFC",
    avatar:
        "https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20a%20Star%20Trek%20fan%20from%20Lyon%2C%20warm%20smile%2C%20casual%20geek%20style%2C%20subtle%20sci-fi%20vibe&width=300&height=300&seq=renato-1&orientation=squarish",
    bio: "Fan lyonnais à l’origine du STFC en 2015, Renato lance la page, le forum et les premières rencontres, et pose les bases de la communauté.",
    specialties: ["Initiative", "Rencontres", "Animation des débuts"],
  },
  {
    name: "Vania Holodiline",
    role: "Identité Visuelle",
    avatar:
        "https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20a%20creative%20graphic%20designer%2C%20modern%20headshot%2C%20artistic%20yet%20simple%20style%2C%20sci-fi%20inspired&width=300&height=300&seq=vania-1&orientation=squarish",
    bio: "Créatrice des logos du STFC en 2016, Vania donne au club son visage visuel et contribue à son identité reconnaissable en convention.",
    specialties: ["Graphisme", "Identité visuelle", "Univers du club"],
  },
  {
    name: "Bureau & Bénévoles",
    role: "Équipe Associative",
    avatar:
        "https://readdy.ai/api/search-image?query=Group%20portrait%20of%20a%20small%20fan%20club%20team%2C%20friendly%20volunteers%2C%20Star%20Trek%20inspired%20background%2C%20association%20spirit&width=300&height=300&seq=team-1&orientation=squarish",
    bio: "Une équipe de bénévoles qui organise les stands, les rencontres, la communication et le fonctionnement de l’association au quotidien.",
    specialties: ["Organisation", "Stands & conventions", "Vie associative"],
  },
  {
    name: "Communauté STFC",
    role: "Fans & Adhérents",
    avatar:
        "https://readdy.ai/api/search-image?query=Group%20of%20diverse%20sci-fi%20fans%20smiling%2C%20Star%20Trek%20inspired%20community%2C%20warm%20atmosphere%2C%20casual%20clothing&width=300&height=300&seq=community-2&orientation=squarish",
    bio: "Les membres et adhérents sont le cœur du club : sans eux, pas de STFC. Ce sont eux qui font vivre Star Trek en francophonie.",
    specialties: ["Passion", "Cosplay", "Rencontres locales"],
  },
];

const values: { icon: IconType; title: string; description: string }[] = [
  {
    icon: RiHeartLine,
    title: "Passion",
    description:
        "Un amour profond pour l’univers Star Trek, ses histoires, ses personnages et les valeurs qu’il porte depuis plus de 50 ans.",
  },
  {
    icon: RiUserSmileLine,
    title: "Convivialité",
    description:
        "Nous cultivons une ambiance simple, chaleureuse et bienveillante : on vient comme on est, pour partager un bon moment entre fans.",
  },
  {
    icon: RiEarthLine,
    title: "Ouverture",
    description:
        "Fidèles à l’esprit de Star Trek, nous accueillons la diversité des profils, des opinions et des sensibilités, dans le respect de chacun.",
  },
  {
    icon: RiPulseLine,
    title: "Persévérance",
    description:
        "Nous avons connu quelques turbulences, mais l’association est toujours vivante et déterminée à devenir une grande structure associative.",
  },
];

const achievements = [
  { number: "2015", label: "Année de création du STFC" },
  { number: "10+", label: "Rencontres locales organisées" },
  { number: "20+", label: "Salons & conventions avec présence du STFC" },
  { number: "3", label: "Pays francophones représentés par nos membres" },
];

const AboutPage = () => {
  return (
      <div className="min-h-screen bg-gray-900 text-white">

        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
            <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=Star%20Trek%20starship%20exploring%20deep%20space%2C%20majestic%20ship%2C%20nebula%20background%2C%20cinematic%20sci-fi%20style&width=1920&height=800&seq=about-hero-bg&orientation=landscape')] bg-cover bg-center opacity-20" />
            <div className="relative max-w-7xl mx-auto px-6 text-center">
              <h1
                  className="text-5xl md:text-6xl font-bold mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Notre Histoire
              </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Depuis 2015, le Star Trek French Club fait vivre la passion de
                Star Trek en francophonie – une association toujours vivante,
                malgré quelques turbulences, et déterminée à grandir.
              </p>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2
                  className="text-4xl font-bold mb-8"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Notre Mission
              </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Le Star Trek French Club est une association francophone de fans,
                née d&apos;une envie simple : se rencontrer, partager notre amour
                de Star Trek et faire exister la franchise au-delà des écrans, des
                forums et des réseaux sociaux. Nous voulons offrir un espace
                convivial où l&apos;on peut discuter, créer, cosplay-er, débattre,
                rire – bref, vivre Star Trek ensemble.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Au fil des années, nous avons connu des phases d&apos;élan,
                quelques turbulences, des périodes plus calmes… mais
                l&apos;association est toujours là. Et aujourd&apos;hui, notre cap
                est clair : continuer à nous structurer pour devenir une grande
                structure associative francophone dédiée à Star Trek, sans perdre
                notre taille humaine et notre convivialité.
              </p>
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-gray-700">
                <p
                    className="text-2xl font-semibold text-blue-400 italic"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  &quot;Un petit groupe, une grande passion&quot;
                </p>
                <p className="text-gray-400 mt-2">
                  L&apos;esprit qui anime le Star Trek French Club depuis 2015.
                </p>
              </div>
            </div>
          </section>

          {/* History Section */}
          <section className="py-20 bg-gray-900/60 border-y border-gray-800">
            <div className="max-w-5xl mx-auto px-6">
              <h2
                  className="text-4xl font-bold mb-8 text-center"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Un peu d&apos;histoire…
              </span>
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Le Star Trek French Club naît en mai 2015, à Lyon, à
                  l&apos;initiative de Renato Negroni. Au départ, c&apos;est une
                  simple page Facebook qui rassemble des fans de longue date comme
                  des curieux désireux de découvrir l&apos;univers Star Trek.
                </p>
                <p>
                  Très vite, un forum très animé voit le jour : les idées fusent,
                  les débats vont à distorsion 9.99, et une évidence
                  s&apos;impose&nbsp;: les fans ne veulent plus seulement
                  discuter en ligne, ils veulent se rencontrer et construire des
                  projets ensemble.
                </p>
                <p>
                  Les premières rencontres &quot;IRL&quot; sont organisées à Lyon
                  en 2015 et 2016, tandis que l&apos;association se dote d&apos;une
                  identité visuelle grâce aux logos créés par Vania Holodiline. Le
                  8 octobre 2016, le STFC devient officiellement une association
                  loi 1901.
                </p>
                <p>
                  Au fil des années, l&apos;association s&apos;installe dans les
                  salons et conventions avec un stand dédié, et se fait
                  progressivement connaître : médias, interviews, rencontres
                  locales, projets de fans… Comme toute aventure humaine, le STFC
                  a connu des périodes très actives et des moments plus
                  difficiles, avec des turbulences dans la vie associative.
                </p>
                <p>
                  Mais une chose ne change pas : le club est toujours là. Toujours
                  vivant, porté par des bénévoles et des membres qui y croient, et
                  déterminé à poursuivre son voyage dans la durée.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2
                    className="text-4xl font-bold mb-6"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Nos Valeurs
                </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Les principes qui guident notre manière de faire vivre Star Trek
                  au sein d&apos;une association francophone.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                    <div
                        key={index}
                        className="group text-center bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <value.icon className="text-2xl text-white" />
                      </div>
                      <h3
                          className="text-xl font-semibold mb-4 text-blue-400"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                        {value.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2
                    className="text-4xl font-bold mb-6"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Notre Parcours
                </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Les grandes étapes qui ont marqué l&apos;évolution du Star Trek
                  French Club depuis ses débuts.
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />

                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                      <div
                          key={index}
                          className={`flex items-center ${
                              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                          }`}
                      >
                        <div
                            className={`w-1/2 ${
                                index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                            }`}
                        >
                          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                            <div className="flex items-center mb-4">
                              <div
                                  className={`w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full ${
                                      index % 2 === 0 ? "ml-auto mr-4" : "mr-auto ml-4"
                                  }`}
                              >
                                <milestone.icon className="text-xl text-white" />
                              </div>
                              <div
                                  className={
                                    index % 2 === 0 ? "text-right" : "text-left"
                                  }
                              >
                                <div
                                    className="text-2xl font-bold text-blue-400"
                                    style={{ fontFamily: "Orbitron, sans-serif" }}
                                >
                                  {milestone.year}
                                </div>
                              </div>
                            </div>
                            <h3
                                className="text-xl font-semibold mb-3 text-purple-400"
                                style={{ fontFamily: "Orbitron, sans-serif" }}
                            >
                              {milestone.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                        </div>

                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-gray-900 relative z-10" />

                        <div className="w-1/2" />
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2
                    className="text-4xl font-bold mb-6"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Notre Équipe
                </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Une aventure associative portée par des bénévoles, des
                  contributeurs et une communauté de fans engagés.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <div className="text-center mb-6">
                        <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-500/50 mb-4"
                        />
                        <h3
                            className="text-xl font-semibold mb-2 text-blue-400"
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                          {member.name}
                        </h3>
                        <p className="text-purple-400 font-medium mb-4">
                          {member.role}
                        </p>
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {member.bio}
                      </p>

                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.specialties.map((specialty, specialtyIndex) => (
                            <span
                                key={specialtyIndex}
                                className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/30"
                            >
                      {specialty}
                    </span>
                        ))}
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2
                    className="text-4xl font-bold mb-6"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Nos Réalisations
                </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Quelques repères qui montrent le chemin parcouru par le Star
                  Trek French Club depuis sa création.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                    <div key={index} className="text-center group">
                      <div
                          className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300"
                          style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                        {achievement.number}
                      </div>
                      <div className="text-xl text-gray-300">
                        {achievement.label}
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2
                  className="text-4xl font-bold mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Rejoignez Notre Aventure
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Vous aimez Star Trek et vous avez envie de le vivre avec
                d&apos;autres fans ? Montez à bord du STFC et participez, vous
                aussi, à l&apos;écriture de la suite de notre histoire
                associative.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap">
                  <RiUserAddLine className="mr-2 inline-block align-middle" />
                  <span className="align-middle">Devenir Membre</span>
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap">
                  <RiMailLine className="mr-2 inline-block align-middle" />
                  <span className="align-middle">Nous Contacter</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
  );
};

export default AboutPage;

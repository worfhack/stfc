import {IconType} from "react-icons";
import {RiCalendarLine, RiExternalLinkLine, RiStarLine, RiTeamLine, RiVipCrownLine} from "react-icons/ri";
import Image from "next/image";


const benefitIconMap: Record<string, IconType> = {
  "ri-vip-crown-line": RiVipCrownLine,
  "ri-calendar-event-line": RiCalendarLine,
  "ri-team-line": RiTeamLine,
};

const CommunitySection = ({community_items, texts}) => {
  const defaultItems: [] = [];
  console.log(community_items)
  const items = community_items && community_items.length > 0 ?community_items  : defaultItems;
  console.log(texts)
  function getBenefitIcon(iconKey: string | undefined): IconType {
    if (!iconKey) return RiStarLine;
    return benefitIconMap[iconKey] ?? RiStarLine;
  }

  return (
      <section id="communaute" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{fontFamily: "Orbitron, sans-serif"}}
            >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {texts?.community?.title || ""}
            </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {texts?.community?.subtitle || ""}
            </p>
          </div>

          {/* Community Features (items) */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-8">
              <h3
                  className="text-3xl font-bold text-blue-400 mb-6"
                  style={{fontFamily: "Orbitron, sans-serif"}}
              >
                {texts?.community?.text_engagement || ""}
              </h3>

              <div className="space-y-6">
                {items.map((item, index) => {
                  const Icon = getBenefitIcon(item.icon);
                  return (
                      <div key={index} className="flex items-start space-x-4">
                        <div
                            className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full flex-shrink-0">
                          <Icon className="text-2xl text-white"/>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-300">{item.description}</p>
                        </div>
                      </div>
                  );
                })}

              </div>
            </div>

            <div className="relative">

              {texts?.community?.image && (
                  <Image
                      src={texts?.community?.image}
                      width={592}   // taille de base desktop
                      height={499}
                      alt="Communauté Star Trek"

                      className="w-full h-full object-cover object-top rounded-2xl"
                      loading="lazy"
                      sizes="(max-width: 768px) 366px, 592px"
                  />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-2xl"></div>
            </div>
          </div>


          <section className="py-20 px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <div
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">{texts?.community?.text_inscription || ""}</h2>
                  <h2 className="text-3xl font-bold text-white mb-4">

                  </h2>

                </div>


                {texts.community.helloAssoUrl && texts.community.helloAssoUrl !== "#" ? (
                    <a
                        href={texts.community.helloAssoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
            inline-flex items-center justify-center
            bg-gradient-to-r from-green-500 to-blue-500
            hover:from-green-600 hover:to-blue-600
            text-white font-bold
            py-4 px-6 md:px-12
            rounded-lg
            transition-all duration-300 transform hover:scale-105 hover:shadow-lg
            text-lg md:text-xl
            w-full sm:w-auto
            cursor-pointer mb-6
        "
                    >
                      <RiExternalLinkLine className="mr-3"/>
                      S&apos;inscrire sur HelloAsso
                    </a>
                ) : (
                    <button
                        className="bg-gray-700 text-gray-300 font-bold py-4 px-12 rounded-lg text-xl mb-6 cursor-not-allowed"
                        disabled
                    >
                      Lien HelloAsso à venir
                    </button>
                )}

              </div>
            </div>
          </section>


        </div>
      </section>
  );
};

export default CommunitySection;

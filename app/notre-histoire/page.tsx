
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
import ComeWithUs from "@/components/ComeWithUsSection";
import {cache} from "react";
import {Metadata} from "next";
import {buildSeoMetadata} from "@/lib/seo";
import {getImageUrl} from "@/lib/image";



const valueIconMap: Record<string, IconType> = {
  heart: RiHeartLine,
  "user-smile": RiUserSmileLine,
  earth: RiEarthLine,
  pulse: RiPulseLine,
};

const milestoneIconMap: Record<string, IconType> = {
  rocket: RiRocketLine,
  calendar: RiCalendarEventLine,
  shield: RiShieldCheckLine,
  star: RiStarSmileLine,
  phone: RiSmartphoneLine,
  pulse: RiPulseLine,
  earth: RiEarthLine,
};


const fetchHistoirePage = cache(async (): Promise => {
  const url = `${process.env.NEXT_PUBLIC_WP_API}/starfleet/v1/histoire`;
  const res = await fetch(url, {});
  if (!res.ok) {
    throw new Error("Failed to fetch board page");
  }

  return res.json();
});
export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchHistoirePage();
  return buildSeoMetadata(data.seo, getImageUrl);
}
const AboutPage = async () => {
  const data = await fetchHistoirePage();

  const {hero, milestones, values, mission, history, valueText, milestonesText} = data;
  const heroBg =
      hero?.backgroundImage ?? "";
  return (
      <div className="min-h-screen bg-gray-900 text-white">

        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">

            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{backgroundImage: `url('${heroBg}')`}}
            ></div>

            <div className="relative max-w-7xl mx-auto px-6 text-center">
              <h1
                  className="text-5xl md:text-6xl font-bold mb-6"
                  style={{fontFamily: "Orbitron, sans-serif"}}
              >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {hero.title}
              </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                {hero.subtitle}
              </p>
            </div>
          </section>

          <section className="py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2
                  className="text-4xl font-bold mb-8"
                  style={{fontFamily: "Orbitron, sans-serif"}}
              >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
               {mission.title}
              </span>
              </h2>

              {mission.paragraphs.map((value, index) => (
                  <p className="text-xl text-gray-300 leading-relaxed mb-8">
                    {value.text}
                  </p>
              ))}


              <div
                  className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-gray-700">
                <p
                    className="text-2xl font-semibold text-blue-400 italic"
                    style={{fontFamily: "Orbitron, sans-serif"}}
                >
                  {mission.quote.text}

                </p>
                <p className="text-gray-400 mt-2">
                  {mission.quote.caption}
                </p>
              </div>
            </div>
          </section>

          {/* History Section */}
          <section className="py-20 bg-gray-900/60 border-y border-gray-800">
            <div className="max-w-5xl mx-auto px-6">
              <h2
                  className="text-4xl font-bold mb-8 text-center"
                  style={{fontFamily: "Orbitron, sans-serif"}}
              >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {history.title}
              </span>
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">

                {history.paragraphs.map((value, index) => (
                    <p>
                      {value.text}
                    </p>
                ))}


              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2
                    className="text-4xl font-bold mb-6"
                    style={{fontFamily: "Orbitron, sans-serif"}}
                >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {valueText.title}
                </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  {valueText.subtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => {
                  const Icon = valueIconMap[value.icon] ?? RiHeartLine;

                  return (
                      <div
                          key={index}
                          className="group text-center bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                      >
                        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="text-2xl text-white" />
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
                  );
                })}

              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2
                    className="text-4xl font-bold mb-6"
                    style={{fontFamily: "Orbitron, sans-serif"}}
                >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                 {milestonesText.title}
                </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  {milestonesText.subtitle}
                </p>
              </div>

              <div className="relative">
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"/>

                <div className="space-y-12">
                  {milestones.map((milestone, index) => {
                    const Icon = milestoneIconMap[milestone.icon] ?? RiStarSmileLine;

                    return (
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
                                  <Icon className="text-xl text-white" />
                                </div>
                                <div className={index % 2 === 0 ? "text-right" : "text-left"}>
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
                    );
                  })}

                </div>
              </div>
            </div>
          </section>


          <ComeWithUs/>
        </main>
      </div>
  );
};

export default AboutPage;

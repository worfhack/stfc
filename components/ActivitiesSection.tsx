import ComeWithUs from "@/components/ComeWithUsSection";
import Image from "next/image";

const ActivitiesSection = ({activities, texts}) => {


  const count = activities.length;
  console.log(count)
  const colMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };
  const gridCols: string = colMap[Math.min(count || 1, 4)];
  return (
    <section id="activites" className="bg-gray-800">
      <div className="py-20  max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{fontFamily: 'Orbitron, sans-serif'}}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
             {texts?.activities?.title || ""}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {texts?.activities?.subtitle || ""}
          </p>
        </div>
        <div className={`grid gap-8 md:grid-cols-2 lg:${gridCols}`}>
          {/*<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">*/}
            {activities.map((activity, index) => (
                <div
                    key={index}
                    className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="relative overflow-hidden rounded-xl mb-6">
                    {activity.image && (
                        <Image
                            src={activity.image?.url}
                            alt={activity.title}
                            width={592}   // taille de base desktop
                            height={320}
                            className="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                            sizes="(max-width: 768px) 364px, 592px"
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-blue-400" style={{fontFamily: 'Orbitron, sans-serif'}}>
                    {activity.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
            ))}
          </div>
        </div>
    </section>
);
};

export default ActivitiesSection;
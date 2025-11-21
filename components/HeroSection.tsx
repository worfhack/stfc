import { RiRocket2Line, RiCompass3Line } from "react-icons/ri";

interface HeroSectionProps {
    scrollY: number;
}

const STAR_COUNT_LAYER_1 = 18;
const STAR_COUNT_LAYER_2 = 26;

const HeroSection = ({ scrollY }: HeroSectionProps) => {
    return (
        <section
            id="accueil"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20space%20station%20with%20starships%20in%20deep%20space%2C%20nebula%20background%2C%20cinematic%20lighting%2C%20Star%20Trek%20inspired%20universe%2C%20sleek%20metallic%20surfaces%2C%20blue%20and%20purple%20cosmic%20colors%2C%20professional%20sci-fi%20photography%2C%20high%20detail%2C%20dramatic%20atmosphere%2C%20space%20exploration%20theme&width=1920&height=1080&seq=hero-bg&orientation=landscape')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />

            {/* Parallax stars */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Couche 1 : lointaine, lente */}
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        transform: `translateY(${scrollY * 0.05}px)`,
                    }}
                >
                    {Array.from({ length: STAR_COUNT_LAYER_1 }).map((_, i) => (
                        <div
                            key={`star-layer1-${i}`}
                            className="absolute w-1 h-1 bg-white/80 rounded-full"
                            style={{
                                left: `${(i * 37) % 100}%`,
                                top: `${(i * 53) % 100}%`,
                            }}
                        />
                    ))}
                </div>

                {/* Couche 2 : plus proche, léger twinkle */}
                <div
                    className="absolute inset-0 opacity-70"
                    style={{
                        transform: `translateY(${scrollY * 0.1}px)`,
                    }}
                >
                    {Array.from({ length: STAR_COUNT_LAYER_2 }).map((_, i) => (
                        <div
                            key={`star-layer2-${i}`}
                            className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                            style={{
                                left: `${(i * 29 + 13) % 100}%`,
                                top: `${(i * 47 + 7) % 100}%`,
                                animationDuration: `${2 + (i % 5)}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div
                className="relative z-10 max-w-6xl mx-auto px-6 text-left"
                style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            >
                <div className="w-full">
                    <h1
                        className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Explorez
            </span>
                        <br />
                        <span className="text-white">l&apos;Univers Star Trek</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                        Rejoignez la plus grande communauté francophone dédiée à Star Trek.
                        Découvrez des conventions exclusives, des événements passionnants et
                        connectez-vous avec des fans du monde entier.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="#rejoindre"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer text-center whitespace-nowrap inline-flex items-center justify-center"
                        >
                            <RiRocket2Line className="mr-2" />
                            Rejoindre la Flotte
                        </a>
                        <a
                            href="#activites"
                            className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 cursor-pointer text-center whitespace-nowrap inline-flex items-center justify-center"
                        >
                            <RiCompass3Line className="mr-2" />
                            Explorer
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection = ({ scrollY }: HeroSectionProps) => {
  return (
    <section 
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20space%20station%20with%20starships%20in%20deep%20space%2C%20nebula%20background%2C%20cinematic%20lighting%2C%20Star%20Trek%20inspired%20universe%2C%20sleek%20metallic%20surfaces%2C%20blue%20and%20purple%20cosmic%20colors%2C%20professional%20sci-fi%20photography%2C%20high%20detail%2C%20dramatic%20atmosphere%2C%20space%20exploration%20theme&width=1920&height=1080&seq=hero-bg&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
      
      {/* Animated stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div 
        className="relative z-10 max-w-6xl mx-auto px-6 text-left"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="w-full">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Explorez
            </span>
            <br />
            <span className="text-white">l'Univers Star Trek</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Rejoignez la plus grande communauté francophone dédiée à Star Trek. 
            Découvrez des conventions exclusives, des événements passionnants et 
            connectez-vous avec des fans du monde entier.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#rejoindre"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer text-center whitespace-nowrap"
            >
              <i className="ri-rocket-2-line mr-2"></i>
              Rejoindre la Flotte
            </a>
            <a 
              href="#activites"
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 cursor-pointer text-center whitespace-nowrap"
            >
              <i className="ri-compass-3-line mr-2"></i>
              Explorer
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
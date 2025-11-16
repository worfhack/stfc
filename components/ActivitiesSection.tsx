import ComeWithUs from "@/components/ComeWithUsSection";

const ActivitiesSection = () => {
  const activities = [
    {
      icon: 'ri-calendar-event-line',
      title: 'Conventions & Événements',
      description: 'Participez à des conventions exclusives, rencontrez les acteurs et découvrez les dernières nouveautés de l\'univers Star Trek.',
      image: 'https://readdy.ai/api/search-image?query=Star%20Trek%20convention%20with%20fans%20in%20costumes%2C%20futuristic%20exhibition%20hall%2C%20interactive%20displays%2C%20professional%20event%20photography%2C%20vibrant%20atmosphere%2C%20sci-fi%20technology%20demonstrations%2C%20community%20gathering&width=400&height=300&seq=conv-1&orientation=landscape'
    },
    {
      icon: 'ri-live-line',
      title: 'Livestreams & Podcasts',
      description: 'Suivez nos émissions en direct, débats passionnés et analyses approfondies des épisodes et films Star Trek.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20podcast%20studio%20with%20futuristic%20design%2C%20streaming%20equipment%2C%20Star%20Trek%20themed%20background%2C%20modern%20broadcasting%20setup%2C%20blue%20and%20purple%20lighting%2C%20high-tech%20atmosphere&width=400&height=300&seq=stream-1&orientation=landscape'
    },
    {
      icon: 'ri-question-answer-line',
      title: 'Quiz & Concours',
      description: 'Testez vos connaissances avec nos quiz interactifs et participez à des concours pour gagner des prix exclusifs.',
      image: 'https://readdy.ai/api/search-image?query=Interactive%20quiz%20game%20interface%20with%20Star%20Trek%20themes%2C%20holographic%20displays%2C%20futuristic%20UI%20elements%2C%20competitive%20gaming%20atmosphere%2C%20digital%20screens%2C%20engaging%20technology&width=400&height=300&seq=quiz-1&orientation=landscape'
    },
    {
      icon: 'ri-group-line',
      title: 'Communauté Active',
      description: 'Échangez avec des milliers de fans, partagez vos théories et créez des liens durables avec des passionnés comme vous.',
      image: 'https://readdy.ai/api/search-image?query=Diverse%20group%20of%20Star%20Trek%20fans%20discussing%20together%2C%20friendly%20community%20atmosphere%2C%20modern%20meeting%20space%2C%20collaborative%20environment%2C%20inclusive%20gathering%2C%20social%20interaction&width=400&height=300&seq=community-1&orientation=landscape'
    }
  ];

  return (
    <section id="activites" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Nos Activités
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez toutes les façons de vivre votre passion pour Star Trek au sein de notre communauté dynamique
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img 
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-blue-600/90 rounded-full">
                  <i className={`${activity.icon} text-xl text-white`}></i>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-blue-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {activity.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <ComeWithUs></ComeWithUs>
    </section>
  );
};

export default ActivitiesSection;
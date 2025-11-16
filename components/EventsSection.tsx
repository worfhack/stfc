
import Link from "next/link";

const EventsSection = () => {
  const upcomingEvents = [
    {
      date: '15 FÉV',
      title: 'Convention Star Trek Paris 2024',
      location: 'Palais des Congrès, Paris',
      description: 'Rencontrez les acteurs de Strange New Worlds et découvrez les exclusivités de la nouvelle saison.',
      image: 'https://readdy.ai/api/search-image?query=Star%20Trek%20convention%20hall%20with%20futuristic%20displays%2C%20fans%20in%20Starfleet%20uniforms%2C%20interactive%20exhibits%2C%20professional%20event%20photography%2C%20vibrant%20atmosphere%2C%20sci-fi%20technology&width=600&height=400&seq=event-1&orientation=landscape',
      type: 'Convention'
    },
    {
      date: '22 FÉV',
      title: 'Livestream: Analyse Discovery S5',
      location: 'En ligne',
      description: 'Débat en direct sur les derniers épisodes avec nos experts et invités spéciaux.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20streaming%20studio%20with%20Star%20Trek%20themed%20background%2C%20modern%20broadcasting%20equipment%2C%20futuristic%20lighting%20setup%2C%20digital%20displays%2C%20high-tech%20atmosphere&width=600&height=400&seq=event-2&orientation=landscape',
      type: 'Livestream'
    },
    {
      date: '01 MAR',
      title: 'Quiz Géant: Univers Star Trek',
      location: 'Discord & Twitch',
      description: 'Testez vos connaissances lors de notre plus grand quiz interactif de l\'année.',
      image: 'https://readdy.ai/api/search-image?query=Interactive%20quiz%20game%20interface%20with%20holographic%20displays%2C%20Star%20Trek%20themed%20UI%20elements%2C%20competitive%20gaming%20atmosphere%2C%20futuristic%20technology%2C%20engaging%20digital%20environment&width=600&height=400&seq=event-3&orientation=landscape',
      type: 'Quiz'
    }
  ];

  return (
    <section id="evenements" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Événements à Venir
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ne manquez aucun moment fort de notre communauté. Inscrivez-vous dès maintenant !
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="bg-purple-600/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-sm font-bold text-white text-center">
                      {event.date}
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-purple-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {event.title}
                </h3>
                
                <div className="flex items-center text-gray-400 mb-3">
                  <i className="ri-map-pin-line mr-2"></i>
                  <span className="text-sm">{event.location}</span>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {event.description}
                </p>

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap">
                  <i className="ri-calendar-check-line mr-2"></i>
                  S'inscrire
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/events"
            className="inline-flex items-center bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-purple-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap"
          >
            <i className="ri-calendar-line mr-2"></i>
            Voir Tous les Événements
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

const CommunitySection = () => {
  const stats = [
    { number: '15', label: 'Membres Passionnés', icon: 'ri-group-line' },
    { number: '6', label: 'Années d\'Existence', icon: 'ri-time-line' },
    { number: '25+', label: 'Rencontres Organisées', icon: 'ri-calendar-event-line' },
    { number: '100%', label: 'Passion Partagée', icon: 'ri-heart-line' }
  ];

  const testimonials = [
    {
      name: 'Marie L.',
      text: 'Un petit club chaleureux où l\'on se sent vraiment en famille. Chaque membre compte et participe activement.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20happy%20Star%20Trek%20fan%20woman%2C%20modern%20headshot%2C%20genuine%20smile%2C%20casual%20attire%2C%20satisfied%20community%20member%2C%20positive%20expression&width=80&height=80&seq=testimonial-home-1&orientation=squarish'
    },
    {
      name: 'Thomas M.',
      text: 'L\'avantage d\'un petit groupe : tout le monde se connaît et les discussions sont vraiment enrichissantes.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20enthusiastic%20Star%20Trek%20fan%20man%2C%20modern%20headshot%2C%20bright%20smile%2C%20casual%20attire%2C%20happy%20community%20member%2C%20energetic%20expression&width=80&height=80&seq=testimonial-home-2&orientation=squarish'
    },
    {
      name: 'Sophie D.',
      text: 'Une atmosphère conviviale et bienveillante. Parfait pour partager sa passion avec de vrais amis trekkies.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20content%20Star%20Trek%20fan%20woman%2C%20modern%20headshot%2C%20warm%20smile%2C%20casual%20attire%2C%20satisfied%20member%2C%20friendly%20appearance&width=80&height=80&seq=testimonial-home-3&orientation=squarish'
    }
  ];

  return (
      <section id="communaute" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Notre Communauté
            </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Rejoignez une famille de passionnés qui partagent votre amour pour l'univers Star Trek
            </p>
          </div>



          {/* Community Features */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-blue-400 mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Pourquoi Nous Rejoindre ?
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full flex-shrink-0">
                    <i className="ri-shield-star-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Accès Exclusif</h4>
                    <p className="text-gray-300">Bénéficiez d'un accès privilégié aux avant-premières, interviews exclusives et contenus inédits.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-purple-600 rounded-full flex-shrink-0">
                    <i className="ri-team-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Réseau de Passionnés</h4>
                    <p className="text-gray-300">Connectez-vous avec des fans du monde entier et créez des amitiés durables.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-600 rounded-full flex-shrink-0">
                    <i className="ri-trophy-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Récompenses & Concours</h4>
                    <p className="text-gray-300">Participez à des concours réguliers et gagnez des objets de collection rares.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                  src="https://readdy.ai/api/search-image?query=Star%20Trek%20fans%20community%20gathering%20in%20modern%20space%2C%20diverse%20group%20of%20people%20discussing%2C%20friendly%20atmosphere%2C%20futuristic%20meeting%20room%2C%20collaborative%20environment%2C%20inclusive%20community&width=600&height=500&seq=community-main&orientation=landscape"
                  alt="Communauté Star Trek"
                  className="w-full h-full object-cover object-top rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-2xl"></div>
            </div>
          </div>

        </div>
      </section>
  );
};

export default CommunitySection;
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
const AboutPage = () => {
  const milestones = [
    {
      year: '2018',
      title: 'Fondation du Club',
      description: 'Création du Star Trek French Club avec 3 membres fondateurs passionnés.',
      icon: 'ri-rocket-line'
    },
    {
      year: '2019',
      title: 'Premières Rencontres',
      description: 'Organisation de nos premières rencontres régulières avec 8 participants.',
      icon: 'ri-calendar-event-line'
    },
    {
      year: '2020',
      title: 'Adaptation Numérique',
      description: 'Création du groupe WhatsApp pour maintenir le lien pendant la pandémie.',
      icon: 'ri-smartphone-line'
    },
    {
      year: '2021',
      title: '10 Membres',
      description: 'Le club grandit et atteint 10 membres actifs et engagés.',
      icon: 'ri-group-line'
    },
    {
      year: '2022',
      title: 'Première Convention',
      description: 'Participation collective à notre première grande convention Star Trek.',
      icon: 'ri-star-line'
    },
    {
      year: '2023',
      title: 'Rayonnement Francophone',
      description: 'Accueil de nouveaux membres de Belgique et Suisse.',
      icon: 'ri-earth-line'
    },
    {
      year: '2024',
      title: '15 Membres Unis',
      description: 'Un petit club soudé avec 15 membres passionnés et actifs.',
      icon: 'ri-heart-line'
    }
  ];

  const teamMembers = [
    {
      name: 'Alexandre Dubois',
      role: 'Fondateur & Président',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20confident%20Star%20Trek%20club%20founder%2C%20modern%20headshot%2C%20leadership%20presence%2C%20casual%20business%20attire%2C%20visionary%20expression%2C%20approachable%20demeanor&width=300&height=300&seq=founder-1&orientation=squarish',
      bio: 'Passionné de Star Trek depuis l\'enfance, Alexandre a créé le club pour rassembler la communauté francophone. Ingénieur de formation, il organise les conventions et gère les partenariats.',
      specialties: ['Conventions', 'Partenariats', 'Stratégie']
    },
    {
      name: 'Marie Lefevre',
      role: 'Directrice Contenu',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20creative%20content%20director%2C%20modern%20headshot%2C%20artistic%20expression%2C%20casual%20attire%2C%20creative%20professional%2C%20engaging%20personality&width=300&height=300&seq=director-1&orientation=squarish',
      bio: 'Journaliste spécialisée en science-fiction, Marie supervise tous nos contenus : podcasts, articles et analyses. Elle anime également nos livestreams les plus populaires.',
      specialties: ['Podcasts', 'Rédaction', 'Animation']
    },
    {
      name: 'Thomas Martin',
      role: 'Responsable Technique',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20tech%20specialist%2C%20modern%20headshot%2C%20technical%20expertise%2C%20casual%20attire%2C%20problem%20solver%20appearance%2C%20innovative%20mindset&width=300&height=300&seq=tech-1&orientation=squarish',
      bio: 'Développeur passionné, Thomas gère toute l\'infrastructure technique du club : site web, bots Discord, streaming et applications mobiles.',
      specialties: ['Développement', 'Infrastructure', 'Innovation']
    },
    {
      name: 'Sophie Moreau',
      role: 'Community Manager',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20friendly%20community%20manager%2C%20modern%20headshot%2C%20warm%20smile%2C%20casual%20attire%2C%20social%20media%20expert%2C%20engaging%20presence&width=300&height=300&seq=community-1&orientation=squarish',
      bio: 'Experte en communication digitale, Sophie anime nos réseaux sociaux et coordonne les événements locaux dans toute la francophonie.',
      specialties: ['Réseaux Sociaux', 'Événements', 'Communication']
    }
  ];

  const values = [
    {
      icon: 'ri-heart-line',
      title: 'Passion',
      description: 'Nous partageons un amour profond pour l\'univers Star Trek et ses valeurs d\'exploration et de découverte.'
    },
    {
      icon: 'ri-group-line',
      title: 'Communauté',
      description: 'Nous créons un espace bienveillant où chaque fan peut s\'exprimer et partager sa passion librement.'
    },
    {
      icon: 'ri-star-line',
      title: 'Excellence',
      description: 'Nous nous efforçons d\'offrir des contenus et événements de la plus haute qualité à nos membres.'
    },
    {
      icon: 'ri-earth-line',
      title: 'Diversité',
      description: 'Nous célébrons la diversité sous toutes ses formes, fidèles à l\'esprit inclusif de Star Trek.'
    }
  ];

  const achievements = [
    { number: '25+', label: 'Événements Organisés' },
    { number: '8+', label: 'Conventions Visitées' },
    { number: '500+', label: 'Heures d\'Échanges' },
    { number: '3', label: 'Pays Représentés' }
  ];

  return (
    <>
      
      
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
            <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=Star%20Trek%20Enterprise%20NCC-1701%20in%20space%2C%20majestic%20starship%2C%20exploration%20theme%2C%20professional%20space%20photography%2C%20inspiring%20atmosphere%2C%20journey%20among%20stars&width=1920&height=800&seq=about-hero-bg&orientation=landscape')] bg-cover bg-center opacity-20"></div>
            <div className="relative max-w-7xl mx-auto px-6 text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Notre Histoire
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Depuis 2018, nous rassemblons la plus grande communauté francophone dédiée à l'univers Star Trek
              </p>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Notre Mission
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Le Star Trek French Club est un petit groupe d'amis passionnés qui se retrouvent 
                régulièrement pour partager leur amour de Star Trek. Nous créons un espace convivial 
                et bienveillant où chacun peut s'exprimer librement, découvrir de nouveaux aspects 
                de l'univers Star Trek et tisser des liens d'amitié durables dans une ambiance familiale.
              </p>
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-gray-700">
                <p className="text-2xl font-semibold text-blue-400 italic" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  "Un petit groupe, une grande passion"
                </p>
                <p className="text-gray-400 mt-2">
                  L'esprit convivial qui anime notre club depuis 2018
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Nos Valeurs
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Les principes qui guident notre communauté et nos actions au quotidien
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <div 
                    key={index}
                    className="group text-center bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <i className={`${value.icon} text-2xl text-white`}></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
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
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Notre Parcours
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Les étapes clés qui ont marqué l'évolution de notre communauté
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div 
                      key={index}
                      className={`flex items-center ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                          <div className="flex items-center mb-4">
                            <div className={`w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full ${
                              index % 2 === 0 ? 'ml-auto mr-4' : 'mr-auto ml-4'
                            }`}>
                              <i className={`${milestone.icon} text-xl text-white`}></i>
                            </div>
                            <div className={index % 2 === 0 ? 'text-right' : 'text-left'}>
                              <div className="text-2xl font-bold text-blue-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                {milestone.year}
                              </div>
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-purple-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            {milestone.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-gray-900 relative z-10"></div>
                      
                      <div className="w-1/2"></div>
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
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Notre Équipe
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Rencontrez les passionnés qui font vivre notre communauté au quotidien
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
                      <h3 className="text-xl font-semibold mb-2 text-blue-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
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
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Nos Réalisations
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Quelques chiffres qui témoignent de notre impact dans la communauté francophone
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
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
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Rejoignez Notre Aventure
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Devenez membre de notre communauté et participez à l'écriture de la suite de notre histoire
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap">
                  <i className="ri-user-add-line mr-2"></i>
                  Devenir Membre
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap">
                  <i className="ri-mail-line mr-2"></i>
                  Nous Contacter
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;

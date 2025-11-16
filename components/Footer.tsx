
const Footer = () => {
  const socialLinks = [
    { icon: 'ri-discord-line', name: 'Discord', url: '#' },
    { icon: 'ri-twitter-x-line', name: 'Twitter', url: '#' },
    { icon: 'ri-youtube-line', name: 'YouTube', url: '#' },
    { icon: 'ri-facebook-line', name: 'Facebook', url: '#' },
    { icon: 'ri-instagram-line', name: 'Instagram', url: '#' }
  ];

  const quickLinks = [
    { name: 'À Propos', url: '/about' },
    { name: 'Événements', url: '/events' },
    { name: 'Activités', url: '/activities' },
    { name: 'Communauté', url: '/community' },
    { name: 'Le Bureau', url: '/board' },
    { name: 'Blog', url: '/blog' },
    { name: 'Contact', url: '#' }
  ];

  const legalLinks = [
    { name: 'Mentions Légales', url: '#' },
    { name: 'Politique de Confidentialité', url: '#' },
    { name: 'CGU', url: '#' },
    { name: 'Cookies', url: '#' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="https://static.readdy.ai/image/126b640000aeae8749c53b905168a238/167e6f8c4c053e379d78c2dc58508c57.png" 
                  alt="Star Trek French Club Logo" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Star Trek French Club
              </h3>
            </a>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              La plus grande communauté francophone dédiée à l'univers Star Trek. 
              Rejoignez-nous pour explorer de nouveaux mondes et créer des liens durables 
              avec des passionnés du monde entier.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-blue-600 rounded-full transition-colors duration-300 cursor-pointer"
                  title={social.name}
                >
                  <i className={`${social.icon} text-lg text-gray-300 hover:text-white`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Liens Rapides
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.url.startsWith('/') ? (
                    <a 
                      href={link.url}
                      className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <a 
                      href={link.url}
                      className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <i className="ri-mail-line text-blue-400 mt-1"></i>
                <div>
                  <p className="text-gray-300">contact@startrekfrench.club</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="ri-discord-line text-blue-400 mt-1"></i>
                <div>
                  <p className="text-gray-300">Serveur Discord</p>
                  <p className="text-sm text-gray-400">15,000+ membres actifs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="ri-map-pin-line text-blue-400 mt-1"></i>
                <div>
                  <p className="text-gray-300">France & Francophonie</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-gray-700">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Restez Informé
              </h4>
              <p className="text-gray-300 mb-6">
                Recevez les dernières actualités Star Trek et les annonces d'événements
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Star Trek French Club. Tous droits réservés. Star Trek™ est une marque déposée de Paramount Pictures.
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://readdy.ai/?origin=logo"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors cursor-pointer"
              >
                Powered by Readdy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

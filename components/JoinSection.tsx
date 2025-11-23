import { useState } from "react";

interface JoinSectionData {
  title?: string;
  subtitle?: string;
}

interface JoinSectionProps {
  data?: JoinSectionData;
}

const JoinSection = ({ data }: JoinSectionProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
    }, 1500);
  };

  const membershipBenefits = [
    {
      icon: "ri-vip-crown-line",
      title: "Accès privilégié",
      description: "Infos en avant-première sur nos activités et projets.",
    },
    {
      icon: "ri-gift-line",
      title: "Cadeaux & surprises",
      description: "Goodies et petites attentions pour les membres.",
    },
    {
      icon: "ri-discount-percent-line",
      title: "Tarifs avantageux",
      description: "Réductions sur certains événements et activités.",
    },
    {
      icon: "ri-medal-line",
      title: "Badge membre",
      description: "Une reconnaissance spéciale au sein du club.",
    },
  ];

  const title =
      data?.title ||
      "Rejoignez la flotte";
  const subtitle =
      data?.subtitle ||
      "Devenez membre du Star Trek French Club et vivez votre passion avec une communauté francophone active et bienveillante.";

  return (
      <section
          id="rejoindre"
          className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "Orbitron, sans-serif" }}
            >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {title}
            </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Membership Benefits */}
            <div>
              <h3
                  className="text-2xl font-bold text-blue-400 mb-8"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Avantages membres
              </h3>

              <div className="space-y-6">
                {membershipBenefits.map((benefit, index) => (
                    <div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex-shrink-0">
                        <i className={`${benefit.icon} text-xl text-white`}></i>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-300">{benefit.description}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>

            {/* Join Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4">
                  <i className="ri-rocket-2-line text-3xl text-white"></i>
                </div>
                <h3
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  Inscription gratuite
                </h3>
                <p className="text-gray-300">
                  Laissez votre email pour recevoir nos prochaines actualités et
                  événements.
                </p>
              </div>

              {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Adresse email
                      </label>
                      <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                          placeholder="votre@email.com"
                          required
                      />
                    </div>

                    <div className="text-xs text-gray-400 leading-relaxed">
                      En vous inscrivant, vous acceptez de recevoir nos newsletters
                      et informations sur les événements. Vous pouvez vous
                      désabonner à tout moment.
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !email}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap"
                    >
                      {isSubmitting ? (
                          <>
                            <i className="ri-loader-4-line animate-spin mr-2"></i>
                            Inscription en cours...
                          </>
                      ) : (
                          <>
                            <i className="ri-rocket-2-line mr-2"></i>
                            Rejoindre maintenant
                          </>
                      )}
                    </button>
                  </form>
              ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 flex items-center justify-center bg-green-600 rounded-full mx-auto mb-4">
                      <i className="ri-check-line text-2xl text-white"></i>
                    </div>
                    <h3 className="text-xl font-bold text-green-400 mb-2">
                      Bienvenue dans la flotte !
                    </h3>
                    <p className="text-gray-300">
                      Vérifiez votre email pour confirmer votre inscription et
                      recevoir nos prochaines informations.
                    </p>
                  </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <i className="ri-shield-check-line mr-1 text-green-400"></i>
                    Sécurisé
                  </div>
                  <div className="flex items-center">
                    <i className="ri-mail-line mr-1 text-blue-400"></i>
                    Sans spam
                  </div>
                  <div className="flex items-center">
                    <i className="ri-gift-line mr-1 text-purple-400"></i>
                    Gratuit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default JoinSection;

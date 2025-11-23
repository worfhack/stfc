"use client";

import { useState } from "react";
import Image from "next/image";
import logoSTFC from "@/assets/img/logo-stfc.png";

import {
  RiYoutubeLine,
  RiFacebookLine,
  RiInstagramLine,
  RiMailLine,
  RiDiscordLine,
  RiMapPinLine
} from "react-icons/ri";

const iconMap: Record<string, JSX.Element> = {
  RiYoutubeLine: <RiYoutubeLine />,
  RiFacebookLine: <RiFacebookLine />,
  RiInstagramLine: <RiInstagramLine />,
};

const Footer = ({menuFooter, menuLegal, apiSocialLinks, seoFooterText, newsletter, copyright}) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const socialLinks = apiSocialLinks.map((item) => ({
    icon: iconMap[item.icon] || null,
    name: item.label,
    url: item.url,
  }));

  const quickLinks = menuFooter.map((item) => ({
    name: item.label,
    url: item.url || "#",
  }));

  const legalLinks = menuLegal.map((item) => ({
    name: item.label,
    url: item.url || "#",
  }));

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterEmail) {
      setNewsletterStatus("error");
      setNewsletterMessage("Merci d’indiquer une adresse email.");
      return;
    }

    setNewsletterStatus("loading");
    setNewsletterMessage("");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_WP_API || "";
      // 🔗 Assure-toi que NEXT_PUBLIC_WP_API_BASE_URL se termine bien par /wp-json
      const endpoint = `${baseUrl}/stfc/v1/newsletter`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setNewsletterStatus("error");
        setNewsletterMessage(
            data?.message ||
            data?.data?.message ||
            "Une erreur est survenue lors de l’inscription."
        );
        return;
      }

      setNewsletterStatus("success");
      setNewsletterMessage(
          data?.message || "Merci, votre email a bien été inscrit à la newsletter !"
      );
      setNewsletterEmail("");
    } catch (err) {
      console.error("Erreur newsletter:", err);
      setNewsletterStatus("error");
      setNewsletterMessage("Erreur réseau. Merci de réessayer dans quelques instants.");
    }
  };

  return (
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 gap-12">

            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="/" className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                      src={logoSTFC}
                      alt="Star Trek French Club Logo"
                      width={164}
                      height={164}
                      className="w-12 h-12 object-contain"
                      priority
                  />
                </div>
                <h3
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  Star Trek French Club
                </h3>
              </a>

              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                {seoFooterText}
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                    <a
                        key={index}
                        href={social.url}
                        className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-blue-600 rounded-full transition-colors duration-300 cursor-pointer"
                        title={social.name}
                    >
                  <span className="text-lg text-gray-300 hover:text-white">
                    {social.icon}
                  </span>
                    </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                  className="text-lg font-semibold text-white mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Liens Rapides
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                          href={link.url}
                          className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        {link.name}
                      </a>
                    </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4
                  className="text-lg font-semibold text-white mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Contact
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <RiMailLine className="text-blue-400 mt-1" />
                  <p className="text-gray-300">contact@startrekfrench.fr</p>
                </div>

                <div className="flex items-start space-x-3">
                  <RiMapPinLine className="text-blue-400 mt-1" />
                  <p className="text-gray-300">France</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-gray-700">
              <div className="text-center">
                <h4
                    className="text-xl font-semibold text-white mb-2"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {newsletter.title}
                </h4>
                <p className="text-gray-300 mb-6">
                  {newsletter.subtitle}
                </p>

                <form
                    className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                    onSubmit={handleNewsletterSubmit}
                >
                  <input
                      type="email"
                      placeholder="Votre email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                      disabled={newsletterStatus === "loading"}
                      required
                  />
                  <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
                      disabled={newsletterStatus === "loading"}
                  >
                    {newsletterStatus === "loading" ? "Envoi..." : "S'abonner"}
                  </button>
                </form>

                {/* Message de retour propre */}
                {newsletterStatus !== "idle" && (
                    <p
                        className={`mt-4 text-sm ${
                            newsletterStatus === "success"
                                ? "text-green-400"
                                : newsletterStatus === "error"
                                    ? "text-red-400"
                                    : "text-gray-300"
                        }`}
                    >
                      {newsletterMessage}
                    </p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-gray-400 text-sm">
                {copyright}
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
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoSTFC from "@/assets/img/logo-stfc.png";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Événements", path: "/events" },
    { name: "Activités", path: "/activities" },
    { name: "Communauté", path: "/community" },
    { name: "Le Bureau", path: "/board" },
    { name: "Blog", path: "/blog" },
    { name: "À Propos", path: "/about" },
  ];

  return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-blue-500/20">
        <nav className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center">

                <Image
                    src={logoSTFC}
                    alt="Star Trek French Club Logo"
                    width={164}               // ⬅️ Taille réelle du logo
                    height={164}
                    className="object-contain drop-shadow-[0_0_6px_rgba(0,150,255,0.6)]"
                    priority
                />
              </div>
              <h1 className="text-xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Star Trek French Club
              </h1>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                  <Link
                      key={item.path}
                      href={item.path}
                      className={`transition-colors cursor-pointer whitespace-nowrap ${
                          isActive(item.path)
                              ? 'text-blue-400'
                              : 'text-gray-300 hover:text-blue-400'
                      }`}
                  >
                    {item.name}
                  </Link>
              ))}
              <Link
                  href="/community"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                Rejoindre
              </Link>
            </div>

            <button
                className="md:hidden w-8 h-8 flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </button>
          </div>

          {isMenuOpen && (
              <div className="md:hidden mt-4 py-4 border-t border-gray-700">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                      <Link
                          key={item.path}
                         href={item.path}
                          className={`transition-colors cursor-pointer ${
                              isActive(item.path)
                                  ? 'text-blue-400'
                                  : 'text-gray-300 hover:text-blue-400'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                  ))}
                  <Link
                      href="/community"
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-colors cursor-pointer text-center"
                      onClick={() => setIsMenuOpen(false)}
                  >
                    Rejoindre
                  </Link>
                </div>
              </div>
          )}
        </nav>
      </header>
  );
};

export default Header;

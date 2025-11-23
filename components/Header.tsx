"use client";

import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Image from "next/image";
import logoSTFC from "@/assets/img/logo-stfc.png";
import {RiArrowDownSLine, RiCloseLine, RiMenuLine} from "react-icons/ri";

type NavItem = {
    name: string;
    path?: string;
    children?: { name: string; path: string }[];
};

const Header = ({menu}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
        null
    );
    const pathname = usePathname();

    const isActive = (path?: string) => {
        if (!path) return false;
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };
    console.log(menu)

    const navItems: NavItem[] = menu.map((item) => ({
        name: item.label,
        path: item.url || undefined,
        children: item.children?.length
            ? item.children.map((child) => ({
                name: child.label,
                path: child.url || undefined,
            }))
            : undefined,
    }));

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-blue-500/20">
            <nav className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo + titre */}
                    <Link href="/" className="flex items-center space-x-3">
                        <Image
                            src={logoSTFC}
                            alt="Star Trek French Club Logo"
                            width={164}
                            height={164}
                            className="object-contain drop-shadow-[0_0_6px_rgba(0,150,255,0.6)]"
                            priority
                        />
                        <div
                            className="text-xl font-bold"
                            style={{fontFamily: "Orbitron, sans-serif"}}
                        >
                            Star Trek French Club
                        </div>
                    </Link>

                    {/* Menu desktop */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => {
                            const hasChildren = item.children && item.children.length > 0;

                            if (!hasChildren) {
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.path || "#"}
                                        className={`transition-colors cursor-pointer whitespace-nowrap ${
                                            isActive(item.path)
                                                ? "text-blue-400"
                                                : "text-gray-300 hover:text-blue-400"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            }

                            // 🔹 Dropdown stabilisé (ne disparaît plus)
                            return (
                                <div key={item.name} className="relative group">
                                    <button
                                        className={`flex items-center gap-1 cursor-pointer whitespace-nowrap transition-colors ${
                                            isActive(item.path)
                                                ? "text-blue-400"
                                                : "text-gray-300 group-hover:text-blue-400"
                                        }`}
                                    >
                                        {item.name}
                                        <RiArrowDownSLine className="text-sm"/>
                                    </button>

                                    {/* Wrapper invisible pour éviter le flicker */}
                                    <div
                                        className="
                      absolute left-0 top-full pt-2
                      opacity-0 pointer-events-none scale-95
                      group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100
                      transition-all duration-150
                    "
                                    >
                                        <div
                                            className="w-56 bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl overflow-hidden">
                                            <div className="py-2">
                                                {item.children!.map((child) => (
                                                    <Link
                                                        key={child.path}
                                                        href={child.path}
                                                        className={`block px-4 py-2 text-sm transition-colors ${
                                                            isActive(child.path)
                                                                ? "bg-blue-600/30 text-blue-300"
                                                                : "text-gray-200 hover:bg-gray-700 hover:text-blue-300"
                                                        }`}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <Link
                            href="/nous-rejoindre"
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap text-white text-sm font-medium"
                        >
                            Rejoindre
                        </Link>
                    </div>

                    <button
                        className="md:hidden w-8 h-8 flex items-center justify-center"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <RiCloseLine className="text-xl"/>
                        ) : (
                            <RiMenuLine className="text-xl"/>
                        )}
                    </button>

                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-gray-700">
                        <div className="flex flex-col space-y-2">
                            {navItems.map((item) => {
                                const hasChildren = item.children && item.children.length > 0;

                                if (!hasChildren) {
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.path || "#"}
                                            className="px-1 py-2 text-gray-300 hover:text-blue-400"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                }

                                const isOpen = openMobileDropdown === item.name;

                                return (
                                    <div key={item.name}>
                                        <button
                                            className="flex w-full items-center justify-between px-1 py-2 cursor-pointer text-gray-300 hover:text-blue-400"
                                            onClick={() => setOpenMobileDropdown(isOpen ? null : item.name)}
                                        >
                                            {item.name}

                                            <RiArrowDownSLine
                                                className={`text-sm transition-transform ${isOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>

                                        {isOpen && (
                                            <div className="ml-3 mt-1 border-l border-gray-700 pl-3 space-y-1">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.path}
                                                        href={child.path}
                                                        className="block py-1 text-sm text-gray-300 hover:text-blue-400"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <Link
                                href="/nous-rejoindre"
                                className="mt-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-colors cursor-pointer text-center text-white text-sm font-medium"
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

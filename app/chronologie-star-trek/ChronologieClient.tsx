"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiChronoResponse, ApiChronoEra } from "./types";
import { getColorStyle } from "./colorStyles";
import { getEraIcon, getCtaIcon, getEventIcon } from "./IconMap";
import ComeWithUs from "@/components/ComeWithUsSection";

export default function ChronologieClient({ data }: { data: ApiChronoResponse }) {
    const [activeEra, setActiveEra] = useState<string>(
        data.timeline.eras[0]?.id ?? ""
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const EventIcon = getEventIcon();

    return (
        <div className="min-h-screen bg-gray-900 text-white">


            <main className="pt-20">
                {/* HERO */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-gray-900" />
                    {data.hero?.backgroundImage && (
                        <div className="absolute inset-0 opacity-20">
                            {/* tu peux changer pour <Image> si tu veux */}
                            <img
                                src={data.hero.backgroundImage}
                                alt=""
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    )}

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="mb-6 text-sm text-gray-400">
                            <ol className="flex items-center gap-2 flex-wrap">
                                <li>
                                    <Link href="/" className="hover:text-blue-400">
                                        Accueil
                                    </Link>
                                </li>
                                <li>/</li>
                                <li>
                                    <Link href="/univers" className="hover:text-blue-400">
                                        Univers
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-gray-300">
                                    {data.page?.title || data.hero?.title || "Chronologie"}
                                </li>
                            </ol>
                        </nav>
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-center"
                            style={{fontFamily: "Orbitron, sans-serif"}}
                        >
                            {data.hero.title}
                        </h1>

                        {data.hero.subtitle && (
                            <p className="text-xl text-gray-300 max-w-4xl mx-auto text-center leading-relaxed mb-8">
                                {/* sous-titre entier fourni par WP */}
                                <span dangerouslySetInnerHTML={{__html: data.hero.subtitle}}/>
                            </p>
                        )}
                    </div>
                </section>

                {/* NAVIGATION DES ÈRES */}
                <section className="sticky top-20 z-40 bg-gray-900/95 backdrop-blur-sm border-y border-gray-700 py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            {data.timeline.eras.map((era) => {
                                const styles = getColorStyle(era.color);
                                const EraIcon = getEraIcon(era.icon_key);

                                const isActive = activeEra === era.id;

                                return (
                                    <button
                                        key={era.id}
                                        onClick={() => setActiveEra(era.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                                            isActive
                                                ? styles.pillActive
                                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                        }`}
                                    >
                                        <EraIcon className="text-lg" />
                                        <span className="font-semibold">{era.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* TIMELINE */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2
                                className="text-3xl font-bold mb-4"
                                style={{ fontFamily: "Orbitron, sans-serif" }}
                            >
                                {data.timeline.title}
                            </h2>
                            {data.timeline.description && (
                                <p className="text-gray-400 max-w-3xl mx-auto">
                                    {data.timeline.description}
                                </p>
                            )}
                        </div>

                        {data.timeline.eras.map((era: ApiChronoEra) => {
                            const styles = getColorStyle(era.color);
                            const EraIcon = getEraIcon(era.icon_key);

                            const isActive = activeEra === era.id;

                            return (
                                <div
                                    key={era.id}
                                    id={era.id}
                                    className={`mb-16 ${isActive ? "block" : "hidden"}`}
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div
                                            className={`w-16 h-16 ${styles.iconBg} rounded-xl flex items-center justify-center`}
                                        >
                                            <EraIcon className={`text-3xl ${styles.iconText}`} />
                                        </div>
                                        <div>
                                            <h3
                                                className="text-2xl font-bold"
                                                style={{ fontFamily: "Orbitron, sans-serif" }}
                                            >
                                                {era.name}
                                            </h3>
                                            <p className="text-gray-400">{era.period}</p>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div
                                            className={`absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b ${styles.lineBg} to-transparent`}
                                        ></div>

                                        <div className="space-y-8">
                                            {era.events.map((event, index) => (
                                                <div key={index} className="relative pl-20">
                                                    <div
                                                        className={`absolute left-0 w-16 h-16 ${styles.yearCircleBg} ${styles.yearCircleBorder} border-4 rounded-full flex items-center justify-center`}
                                                    >
                            <span
                                className={`text-sm font-bold ${styles.yearText}`}
                            >
                              {event.year}
                            </span>
                                                    </div>

                                                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition">
                                                        <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                                                            <EventIcon className="text-blue-400" />
                                                            {event.title}
                                                        </h4>
                                                        <p className="text-gray-300 leading-relaxed">
                                                            {event.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

       <ComeWithUs />
            </main>
        </div>
    );
}

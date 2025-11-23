// app/films-series/FilmsSeriesClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type {
  FilmsSeriesHero,
  FilmsSeriesSeriesItem,
  FilmsSeriesFilmItem,
  FilmsSeriesViewingOrders,
} from "./types";
import Image from "next/image";

type Props = {
  hero: FilmsSeriesHero;
  series: FilmsSeriesSeriesItem[];
  films: FilmsSeriesFilmItem[];
  viewingOrders: FilmsSeriesViewingOrders;
};

// Mapping Tailwind pour éviter les classes dynamiques
const seriesColorBadge: Record<string, string> = {
  yellow: "bg-yellow-500/20 text-yellow-400",
  blue: "bg-blue-500/20 text-blue-400",
  red: "bg-red-500/20 text-red-400",
  purple: "bg-purple-500/20 text-purple-400",
  orange: "bg-orange-500/20 text-orange-400",
  teal: "bg-teal-500/20 text-teal-400",
  indigo: "bg-indigo-500/20 text-indigo-400",
  cyan: "bg-cyan-500/20 text-cyan-400",
  green: "bg-green-500/20 text-green-400",
  pink: "bg-pink-500/20 text-pink-400",
};

function getSeriesBadgeClasses(color?: string) {
  if (!color) return "bg-gray-700 text-gray-200";
  return seriesColorBadge[color] ?? "bg-gray-700 text-gray-200";
}

export default function FilmsSeriesClient({
                                            hero,
                                            series,
                                            films,
                                            viewingOrders,
                                          }: Props) {
  const [activeTab, setActiveTab] = useState<"series" | "films" | "ordre">(
      "series"
  );
  const [viewingOrder, setViewingOrder] = useState<
      "chronologique" | "production" | "debutants"
  >("chronologique");

  const currentViewingList = viewingOrders[viewingOrder] ?? [];

  return (
      <>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 to-gray-900" />
          {hero.backgroundImage && (
              <div className="absolute inset-0 opacity-20">
                <Image
                    src={hero.backgroundImage}
                    alt=""
                    width={1920}
                    height={600}
                    className="w-full h-full object-cover object-top"
                />
              </div>
          )}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-gray-400">
              <ol className="flex items-center gap-2">
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
                <li className="text-gray-300">Films &amp; Séries</li>
              </ol>
            </nav>

            <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-center"
                style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {hero.title || "Films & Séries Star Trek"}
            </h1>

            {hero.subtitle && (
                <p className="text-xl text-gray-300 max-w-4xl mx-auto text-center leading-relaxed mb-4">
                  {hero.subtitle}
                </p>
            )}

            {hero.intro && (
                <p
                    className="text-lg text-gray-300 max-w-4xl mx-auto text-center leading-relaxed mb-8"
                    dangerouslySetInnerHTML={{ __html: hero.intro }}
                />
            )}
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-20 z-40 bg-gray-900/95 backdrop-blur-sm border-y border-gray-700 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4">
              <button
                  onClick={() => setActiveTab("series")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
                      activeTab === "series"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
              >
                <i className="ri-tv-line text-xl" />
                Séries TV
              </button>
              <button
                  onClick={() => setActiveTab("films")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
                      activeTab === "films"
                          ? "bg-red-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
              >
                <i className="ri-movie-line text-xl" />
                Films
              </button>
              <button
                  onClick={() => setActiveTab("ordre")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
                      activeTab === "ordre"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
              >
                <i className="ri-list-ordered text-xl" />
                Ordre de Visionnage
              </button>
            </div>
          </div>
        </section>

        {/* Series Section */}
        {activeTab === "series" && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                  <h2
                      className="text-3xl font-bold mb-4"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    Toutes les Séries Star Trek
                  </h2>
                  <p className="text-gray-400 max-w-3xl mx-auto">
                    De la série originale de 1966 aux productions modernes, explorez
                    toutes les séries qui ont façonné l&apos;univers Star Trek.
                  </p>
                </div>

                <div className="space-y-8">
                  {series.map((show, index) => (
                      <div
                          key={`${show.title}-${index}`}
                          className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition"
                      >
                        <div className="grid lg:grid-cols-5 gap-6">
                          <div className="lg:col-span-2">
                            {show.image && (
                                <Image
                                    src={show.image}
                                    alt={show.title}
                                    width={800}
                                    height={500}
                                    className="w-full h-64 lg:h-full object-cover object-top"
                                />
                            )}
                          </div>

                          <div className="lg:col-span-3 p-6">
                            <div className="flex items-start justify-between mb-3 gap-4">
                              <h3
                                  className="text-2xl font-bold"
                                  style={{ fontFamily: "Orbitron, sans-serif" }}
                              >
                                {show.title}
                              </h3>
                              {show.years && (
                                  <span
                                      className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getSeriesBadgeClasses(
                                          show.color
                                      )}`}
                                  >
                            {show.years}
                          </span>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-4 mb-4 text-sm">
                              {typeof show.seasons === "number" && (
                                  <div className="flex items-center gap-2">
                                    <i className="ri-film-line text-blue-400" />
                                    <span>{show.seasons} saisons</span>
                                  </div>
                              )}
                              {typeof show.episodes === "number" && (
                                  <div className="flex items-center gap-2">
                                    <i className="ri-play-list-line text-purple-400" />
                                    <span>{show.episodes} épisodes</span>
                                  </div>
                              )}
                              {show.captain && (
                                  <div className="flex items-center gap-2">
                                    <i className="ri-user-star-line text-yellow-400" />
                                    <span>{show.captain}</span>
                                  </div>
                              )}
                              {show.ship && (
                                  <div className="flex items-center gap-2">
                                    <i className="ri-rocket-line text-green-400" />
                                    <span>{show.ship}</span>
                                  </div>
                              )}
                            </div>

                            {show.description && (
                                <p className="text-gray-300 mb-4 leading-relaxed">
                                  {show.description}
                                </p>
                            )}

                            {show.highlights && (
                                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <i className="ri-star-line text-yellow-400" />
                                    Points Forts
                                  </h4>
                                  <p className="text-gray-400 text-sm leading-relaxed">
                                    {show.highlights}
                                  </p>
                                </div>
                            )}
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </section>
        )}

        {/* Films Section */}
        {activeTab === "films" && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                  <h2
                      className="text-3xl font-bold mb-4"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    Tous les Films Star Trek
                  </h2>
                  <p className="text-gray-400 max-w-3xl mx-auto">
                    13 films répartis en trois ères : films TOS (1979-1991), films
                    TNG (1994-2002) et films Kelvin (2009-2016).
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {films.map((film, index) => (
                      <div
                          key={`${film.title}-${index}`}
                          className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 hover:transform hover:scale-105 transition"
                      >
                        {film.image && (
                            <Image
                                src={film.image}
                                alt={film.title}
                                width={600}
                                height={400}
                                className="w-full h-48 object-cover object-top"
                            />
                        )}

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                      <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              film.era === "TOS"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : film.era === "TNG"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : "bg-purple-500/20 text-purple-400"
                          }`}
                      >
                        {film.era || "STAR TREK"}
                      </span>
                            <span className="text-sm text-gray-400">
                        {film.year}
                      </span>
                          </div>

                          <h3 className="text-lg font-bold mb-2">{film.title}</h3>

                          {film.director && (
                              <p className="text-sm text-gray-400 mb-3">
                                Réalisé par {film.director}
                              </p>
                          )}

                          {film.description && (
                              <p className="text-sm text-gray-300 leading-relaxed">
                                {film.description}
                              </p>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </section>
        )}

        {/* Viewing Order Section */}
        {activeTab === "ordre" && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                  <h2
                      className="text-3xl font-bold mb-4"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    Ordres de Visionnage Recommandés
                  </h2>
                  <p className="text-gray-400 max-w-3xl mx-auto mb-8">
                    Trois approches différentes pour découvrir l&apos;univers Star
                    Trek selon vos préférences.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                        onClick={() => setViewingOrder("chronologique")}
                        className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
                            viewingOrder === "chronologique"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                    >
                      <i className="ri-time-line mr-2" />
                      Chronologique
                    </button>
                    <button
                        onClick={() => setViewingOrder("production")}
                        className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
                            viewingOrder === "production"
                                ? "bg-purple-600 text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                    >
                      <i className="ri-calendar-line mr-2" />
                      Production
                    </button>
                    <button
                        onClick={() => setViewingOrder("debutants")}
                        className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
                            viewingOrder === "debutants"
                                ? "bg-green-600 text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                    >
                      <i className="ri-star-line mr-2" />
                      Débutants
                    </button>
                  </div>
                </div>

                <div className="max-w-3xl mx-auto">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      {viewingOrder === "chronologique" && (
                          <>
                            <i className="ri-time-line text-blue-400" />
                            Ordre Chronologique
                          </>
                      )}
                      {viewingOrder === "production" && (
                          <>
                            <i className="ri-calendar-line text-purple-400" />
                            Ordre de Production
                          </>
                      )}
                      {viewingOrder === "debutants" && (
                          <>
                            <i className="ri-star-line text_GREEN-400" />
                            Recommandé pour Débutants
                          </>
                      )}
                    </h3>

                    <div className="mb-6 bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {viewingOrder === "chronologique" &&
                            "Suivez l'histoire dans l'ordre chronologique des événements dans l'univers Star Trek, de la fondation de Starfleet au 32e siècle."}
                        {viewingOrder === "production" &&
                            "Regardez dans l'ordre de sortie original pour comprendre l'évolution de la franchise et les références entre séries."}
                        {viewingOrder === "debutants" &&
                            "Sélection des meilleures entrées pour découvrir Star Trek sans s'enliser dans les épisodes moins réussis."}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {currentViewingList.map((item, index) => (
                          <div
                              key={`${item.title}-${index}`}
                              className="flex items-center gap-4 bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition"
                          >
                            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-blue-400">
                          {index + 1}
                        </span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{item.title}</h4>
                              {item.note && (
                                  <p className="text-sm text-gray-400">{item.note}</p>
                              )}
                            </div>
                          </div>
                      ))}

                      {currentViewingList.length === 0 && (
                          <p className="text-sm text-gray-400 italic">
                            Aucun élément configuré pour cet ordre de visionnage.
                          </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
        )}
      </>
  );
}

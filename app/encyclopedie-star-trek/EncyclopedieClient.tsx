// app/encyclopedie/EncyclopedieClient.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { ApiEncyclopediaCategory } from "./types";

export default function EncyclopedieClient({
                                               categories,
                                           }: {
    categories: ApiEncyclopediaCategory[];
}) {
    const [activeCategory, setActiveCategory] = useState<string>(
        categories[0]?.id ?? ""
    );

    const currentCategory = useMemo(
        () => categories.find((c) => c.id === activeCategory) ?? categories[0],
        [categories, activeCategory]
    );

    const currentItems = currentCategory?.items ?? [];

    return (
        <>
            {/* Barre sticky catégories */}
            <section className="sticky top-20 z-40 bg-gray-900/95 backdrop-blur-sm border-y border-gray-700 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                                    activeCategory === cat.id
                                        ? `bg-${cat.color}-600 text-white`
                                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                }`}
                            >
                                <span className="font-semibold">{cat.name}</span>
                                <span className="text-xs opacity-75">
                  ({cat.items.length})
                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Liste des entrées */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8">
                        {currentItems.map((item, index) => (
                            <article
                                // Fix "image fantôme" : on inclut la catégorie dans la key pour forcer le remount
                                key={`${activeCategory}-${item.name}-${index}`}
                                className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition"
                            >
                                <div className="grid lg:grid-cols-5 gap-6">
                                    <div className="relative lg:col-span-2 h-64 lg:h-full">
                                        {item.image && (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="(min-width: 1024px) 40vw, 100vw"
                                                className="object-cover object-top"
                                            />
                                        )}
                                    </div>

                                    <div className="lg:col-span-3 p-6">
                                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                                            {item.name}
                                        </h3>

                                        <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                <i className="ri-information-line text-blue-400" />
                                                Détails
                                            </h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {item.details}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

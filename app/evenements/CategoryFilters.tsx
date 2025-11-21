// app/events/CategoryFilters.tsx
"use client";

import { useState } from "react";
import { UiCategory } from "./types";

export default function CategoryFilters({
                                            categories,
                                        }: {
    categories: UiCategory[];
}) {
    const [selected, setSelected] = useState("all");

    return (
        <section className="py-8 bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelected(cat.id)}
                            className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                selected === cat.id
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

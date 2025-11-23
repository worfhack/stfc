// app/events/CategoryFilters.tsx
"use client";

import { UiCategory } from "./types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function CategoryFilters({
                                            categories,
                                        }: {
    categories: UiCategory[];
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // 🔹 Catégorie actuelle (sinon "all")
    const currentCategory = searchParams.get("category") || "all";

    const handleClick = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString());

        // Mettre à jour category
        if (categoryId === "all") {
            params.delete("category");
        } else {
            params.set("category", categoryId);
        }

        // Si on change de category → revenir page 1
        params.delete("page");

        // Update URL (sans reload)
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <section className="py-8 bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((cat) => {
                        const isActive = currentCategory === cat.id;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => handleClick(cat.id)}
                                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                            >
                                {cat.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

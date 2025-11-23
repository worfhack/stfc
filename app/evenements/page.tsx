// app/events/page.tsx (SERVER COMPONENT)

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComeWithUs from "@/components/ComeWithUsSection";
import CategoryFilters from "./CategoryFilters";
import EventsGrid from "./EventsGrid";
import {ApiEventsOverview, ApiEvent, ApiHero, UiCategory} from "./types";
import {Metadata} from "next";
import {buildSeoMetadata} from "@/lib/seo";
import {getImageUrl} from "@/lib/image";
import {cache} from "react";
import Link from "next/link";
// ...
export const dynamic = "force-dynamic";

type EventsPageProps = {
    searchParams?: {
        page?: string;
        category?: string;
    };
};

const fetchEventsData = cache(async (page: number = 1, categorySlug: string = ""): Promise<ApiEventsOverview> => {
        const baseUrl = process.env.NEXT_PUBLIC_WP_API;
        if (!baseUrl) {
            throw new Error("");
        }

        try {
            const baseWithSlash = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
            const url = new URL("starfleet/v1/events", baseWithSlash);
            url.searchParams.set("page", String(page));
            url.searchParams.set("per_page", "2"); // ou ta valeur préférée

            // 🔹 Filtre catégorie : on ignore "all"
            if (categorySlug && categorySlug !== "all") {
                url.searchParams.set("category", categorySlug);
            }

            const res = await fetch(url.toString(), {});
            if (!res.ok) throw new Error("");

            return await res.json();
        } catch (e) {
            console.error(e);
            throw new Error("");
        }
    }
);


export async function generateMetadata({
                                           searchParams,
                                       }: {
    searchParams: Record<string, string | string | undefined>
}): Promise<Metadata> {
    const pageParam = searchParams?.page;
    const categoryParam = searchParams?.category;

    const page = Math.max(
        1,
        Number(Array.isArray(pageParam) ? pageParam[0] : pageParam) || 1
    );

    const categorySlug =
        (Array.isArray(categoryParam) ? categoryParam[0] : categoryParam) || "";

    const data = await fetchEventsData(page, categorySlug);

    // 🔹 SEO renvoyé par l’API (champ "seo" à la racine)
    return buildSeoMetadata(data.seo, getImageUrl);
}



export default async function EventsPage({ searchParams }: EventsPageProps) {

    const sp = (await searchParams) ?? {};

    const currentPage = Math.max(1, Number(sp.page ?? 1));
    const categorySlug = sp.category ?? "";
    const data = await fetchEventsData(currentPage ,categorySlug);

    const hero: ApiHero | null = data?.page?.hero ?? null;
    const allEvents: ApiEvent[] = data?.events ?? [];

    // Si tu veux garder le filtrage "à partir d'aujourd'hui" en double :
    const today = new Date().toISOString().slice(0, 10);
    const upcoming = allEvents.filter((event) => {
        if (!event.event_date) return false;
        return event.event_date >= today;
    });

    const uiCategories: UiCategory[] = [
        { id: "all", name: "Tous les Événements" },
        ...(data?.categories ?? []).map((c) => ({
            id: c.slug,
            name: c.name,
        })),
    ];

    const totalPages = data.pagination?.total_pages ?? 1;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/*<Header />*/}

            <main className="pt-20">
                <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{
                            backgroundImage: `url('${hero?.background_image?.url ?? ""}')`,
                        }}
                    />
                    <div className="relative max-w-7xl mx-auto px-6 text-center">
                        <h1
                            className="text-5xl md:text-6xl font-bold mb-6"
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                {hero?.title}
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                            {hero?.subtitle}
                        </p>
                    </div>
                </section>

                <CategoryFilters categories={uiCategories} />

                <EventsGrid events={upcoming} />

                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-4 mb-12">
                        {currentPage > 1 && (
                            <Link
                                href={`/evenements?page=${currentPage - 1}`}
                                className="px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 text-sm"
                            >
                                Page précédente
                            </Link>
                        )}

                        <span className="text-gray-400 text-sm">
                            Page {currentPage} / {totalPages}
                        </span>

                        {currentPage < totalPages && (
                            <Link
                                href={`/evenements?page=${currentPage + 1}`}
                                className="px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 text-sm"
                            >
                                Page suivante
                            </Link>
                        )}
                    </div>
                )}

                <ComeWithUs />
            </main>

            {/*<Footer />*/}
        </div>
    );
}

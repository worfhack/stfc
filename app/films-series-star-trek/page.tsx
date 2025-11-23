// app/films-series/page.tsx
import { cache } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilmsSeriesClient from "./FilmsSeriesClient";
import { buildSeoMetadata } from "@/lib/seo"; // tu as déjà cette fonction
import type { FilmsSeriesApiResponse } from "./types";
import {getImageUrl} from "@/lib/image";
import ComeWithUs from "@/components/ComeWithUsSection";

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API;


 const fetchFilmsSeries = cache(async (): Promise<FilmsSeriesApiResponse> => {
    const res = await fetch(`${WP_API_URL}/starfleet/v1/films-series`, {
        // Côté App Router, on peut combiner cache + revalidate
        next: { revalidate: 0 },
    });

    if (!res.ok) {
        console.error("Erreur API Films & Séries:", res.status, res.statusText);
        throw new Error("Impossible de charger la page Films & Séries");
    }

    const data = (await res.json()) as FilmsSeriesApiResponse;
    return data;
});

/**
 * SEO – sur le modèle que tu as donné
 */
export async function generateMetadata(): Promise<Metadata> {
    const data = await fetchFilmsSeries();
    return buildSeoMetadata(data.seo, getImageUrl);
}

/**
 * Page serveur
 */
export default async function FilmsSeriesPage() {
    const data = await fetchFilmsSeries();

    return (
        <div className="min-h-screen bg-gray-900 text-white">

            <main className="pt-20">
                <FilmsSeriesClient
                    hero={data.hero}
                    series={data.series}
                    films={data.films}
                    viewingOrders={data.viewingOrders}
                />
            </main>
            <ComeWithUs />

        </div>
    );
}

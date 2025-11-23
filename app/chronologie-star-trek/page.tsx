import { Metadata } from "next";
import ChronologieClient from "./ChronologieClient";
import {ApiChronoResponse} from "@/app/chronologie-star-trek/types";
import {cache} from "react";
import {buildSeoMetadata} from "@/lib/seo";
import {getImageUrl} from "@/lib/image";
export const dynamic = "force-dynamic";

const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API;


 const fetchChronologie = cache(async (): Promise<ApiChronoResponse> => {

    if (!WP_API_BASE) {
        throw new Error("NEXT_PUBLIC_WP_API_BASE n'est pas défini");
    }

    const res = await fetch(`${WP_API_BASE}/starfleet/v1/chronologie`, {
        next: { revalidate: 0 },
    });

    if (!res.ok) {
        throw new Error(`Erreur API chronologie (${res.status})`);
    }
    const data = (await res.json()) as ApiChronoResponse;
    return data;
})
export async function generateMetadata(): Promise<Metadata> {
    const data = await fetchChronologie();
    // buildSeoMetadata sait gérer ce shape (seo_title, seo_description, seo_image)
    return buildSeoMetadata(data.seo, getImageUrl);
}

export default async function ChronologiePage() {
    const data = await fetchChronologie();


    return (
        <>

             <ChronologieClient data={data} />

        </>
);
}

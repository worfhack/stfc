// app/encyclopedie/page.tsx
import Link from "next/link";
import Image from "next/image";
import type {Metadata} from "next";
import EncyclopedieClient from "./EncyclopedieClient";
import type {ApiEncyclopediaResponse} from "./types";
import {cache} from "react";
import {buildSeoMetadata} from "@/lib/seo";
import {getImageUrl} from "@/lib/image";
import ComeWithUs from "@/components/ComeWithUsSection";


export const dynamic = "force-dynamic";


const WP_API_URL = process.env.NEXT_PUBLIC_WP_API;


const fetchEncyclopedie = cache(async (): Promise<ApiEncyclopediaResponse> => {
    const res = await fetch(`${WP_API_URL}/starfleet/v1/encyclopedie`, {
        next: {revalidate: 0},
    });

    if (!res.ok) {
        throw new Error("Erreur lors du chargement de l'encyclopédie");
    }

    return res.json();
})

export async function generateMetadata(): Promise<Metadata> {
    const data = await fetchEncyclopedie();
    return buildSeoMetadata(data.seo, getImageUrl);
}

export default async function EncyclopediePage() {
    const data = await fetchEncyclopedie();

    const heroBg = data.hero.backgroundImage ?? "";



    return (
        <div className="min-h-screen bg-gray-900 text-white">

            <main className="pt-20">


                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-gray-900"/>
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src={heroBg}
                            alt=""
                            fill
                            priority
                            className="object-cover object-top"
                        />
                    </div>

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
                                <li className="text-gray-300">Encyclopédie</li>
                            </ol>
                        </nav>

                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-center"
                            style={{fontFamily: "Orbitron, sans-serif"}}
                        >
                            {data.hero.title || ""}
                        </h1>

                        <p className="text-xl text-gray-300 max-w-4xl mx-auto text-center leading-relaxed mb-8">
                            {data.hero.subtitle || ""}
                        </p>
                    </div>
                </section>

                {/* Partie interactive client (catégories + contenu) */}
                <EncyclopedieClient categories={data.categories}/>
                <ComeWithUs />
            </main>

        </div>
    );
}

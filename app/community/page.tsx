// app/community/page.tsx

import ComeWithUs from "@/components/ComeWithUsSection";
import CommunityMapClient from "@/components/CommunityMapClient";
import {cache} from "react";

import {ApiCommunityResponse} from "@/app/types/community-page";
import {Metadata} from "next";

// export const dynamic = "force-dynamic";

// ---- Fetch côté serveur ----

const getCommunityData = cache(async (): Promise<ApiCommunityResponse | null> => {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API;

    if (!baseUrl) {
        console.error("NEXT_PUBLIC_WP_API non défini");
        return null;
    }

    try {
        const res = await fetch(`${baseUrl}/starfleet/v1/community`, {
            // cache: "no-store", // pas de cache HTTP, mais cache() évite le double fetch
        });

        if (!res.ok) {
            throw new Error("Erreur API page communauté");
        }

        const data = (await res.json()) as ApiCommunityResponse;
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
});

export async function generateMetadata(): Promise<Metadata> {
    const communityData = await getCommunityData();

    const titleFromApi =
        communityData?.hero?.title ||
        "Communauté Star Trek French Club";

    const descriptionFromApi =
        communityData?.intro?.paragraphs?.[0]?.text ||
        "Découvrez la communauté francophone Star Trek : fans, activités locales, rencontres et événements.";

    return {
        title: titleFromApi,
        description: descriptionFromApi,
        openGraph: {
            title: titleFromApi,
            description: descriptionFromApi,
            url: "https://ton-domaine.fr/community",
            type: "website",
        },
    };
}
export default async function CommunityPage() {


    const communityData = await getCommunityData();

    const heroTitle = communityData?.hero?.title ?? "";
    const heroSubtitle = communityData?.hero?.subtitle ?? "";
    const heroText = communityData?.hero?.text ?? "";

    const introTitle = communityData?.intro?.title ?? "";

    const introParagraphs =
        communityData?.intro?.paragraphs && communityData.intro.paragraphs.length > 0
            ? communityData.intro.paragraphs
            : [];

    const sections =
        communityData?.community_sections &&
        communityData.community_sections.length > 0
            ? communityData.community_sections
            : [];

    const mapTitle = communityData?.map_block?.title ?? "";
    const mapIntro = communityData?.map_block?.intro ?? "";
    const mapFooter = communityData?.map_block?.footer ?? "";

    return (
        <div className="min-h-screen bg-gray-900 text-white">


            <main className="pt-20">
                <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
                    <div
                        className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=Small%20Star%20Trek%20fan%20group%20sitting%20together%20in%20circle%2C%20intimate%20community%20gathering%2C%20friendship%20and%20unity%2C%20cozy%20atmosphere%2C%20teamwork%20spirit%2C%20inclusive%20small%20group&width=1920&height=800&seq=community-hero-bg&orientation=landscape')] bg-cover bg-center opacity-20"></div>
                    <div className="relative max-w-5xl mx-auto px-6 text-center">
                        <h1
                            className="text-5xl md:text-6xl font-bold mb-6"
                            style={{fontFamily: "Orbitron, sans-serif"}}
                        >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {heroTitle}
              </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                            {heroSubtitle}
                        </p>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            {heroText}
                        </p>
                    </div>
                </section>

                {/* Intro + sections */}
                <section className="py-16 bg-gray-900">
                    <div className="max-w-5xl mx-auto px-6 grid gap-10 md:grid-cols-2">
                        <div>
                            <h2
                                className="text-3xl font-bold mb-4"
                                style={{fontFamily: "Orbitron, sans-serif"}}
                            >
                                {introTitle}
                            </h2>

                            {introParagraphs.map((p, idx) => (
                                <p
                                    key={idx}
                                    className={`text-gray-300 mb-3 ${
                                        idx === introParagraphs.length - 1 ? "text-gray-400" : ""
                                    }`}
                                >
                                    {p.text}
                                </p>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {sections.map((section, index) => {
                                const colors = ["text-blue-400", "text-purple-400", "text-green-400"];
                                const colorClass = colors[index % colors.length];

                                return (
                                    <div
                                        key={index}
                                        className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5"
                                    >
                                        <h3 className={`text-xl font-semibold mb-2 ${colorClass}`}>
                                            {section.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm">{section.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Carte */}
                <section className="py-20 bg-gray-900">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-10">


                            <h2
                                className="text-4xl font-bold mb-6"
                                style={{fontFamily: "Orbitron, sans-serif"}}
                            >

                  <span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"> {mapTitle}</span>

                            </h2>

                            {mapFooter && (
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    {mapFooter}
                                </p>
                            )}
                        </div>

                        <div
                            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                            <div className="relative w-full" style={{paddingBottom: "56.25%"}}>
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <CommunityMapClient/>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>

                <ComeWithUs/>
            </main>

            {/*<Footer />*/}
        </div>
    );
}

// app/inscription/page.tsx

import type {Metadata} from "next";
import {
    RiVipCrownLine,
    RiStarLine,
    RiCalendarLine,
    RiMailSendLine,
    RiShieldCheckLine,
    RiExternalLinkLine,
    RiRocket2Line,
    RiTeamLine,
    RiInformationLine,
} from "react-icons/ri";
import {IconType} from "react-icons";
import {cache} from "react";
import {getImageUrl} from "@/lib/image";
import {buildSeoMetadata} from "@/lib/seo";

// Types API
type ApiImage = {
    url?: string;
    sizes?: Record<string, string>;
    [key: string]: any;
};

type ApiInscriptionBenefit = {
    title: string;
    description: string;
    icon: string;
};

type ApiInscriptionResponse = {
    id: number;
    slug: string;
    seo?: {
        seo_title?: string;
        seo_description?: string;
        seo_image?: ApiImage | null;
    };
    hero?: {
        title?: string;
        subtitle?: string;
        background?: ApiImage | null;
    };
    pricing?: {
        amount?: number;
        label?: string;
    };
    helloasso_url?: string;
    benefits?: ApiInscriptionBenefit[];
    seo_text?: string;
    seo_text_image?: ApiImage | null;
    seo_text_title?: string;
    seo_text_image_text?: string;
};

// Petite map entre la valeur ACF "icon" et le composant react-icons
const benefitIconMap: Record<string, IconType> = {
    "ri-vip-crown-line": RiVipCrownLine,
    "ri-calendar-event-line": RiCalendarLine,
    "ri-team-line": RiTeamLine,
};

// helper : renvoie le bon composant d’icône
function getBenefitIcon(iconKey: string | undefined): IconType {
    if (!iconKey) return RiStarLine;
    return benefitIconMap[iconKey] ?? RiStarLine;
}

const fetchInscriptionPage = cache(async (): Promise<ApiInscriptionResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API;
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_WP_API is not defined");
    }

    const baseWithSlash = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
    const url = `${baseWithSlash}starfleet/v1/inscription`;

    const res = await fetch(url, {
        next: {revalidate: 3600},
    });

    if (!res.ok) {
        console.error("Failed to fetch inscription data", res.status);
        throw new Error("Failed to fetch inscription data");
    }

    return res.json();
});

export async function generateMetadata(): Promise<Metadata> {
    const data = await fetchInscriptionPage();
    return buildSeoMetadata(data.seo, getImageUrl);
}

export default async function InscriptionPage() {
    const data = await fetchInscriptionPage();

    const heroTitle = data.hero?.title || "";
    const heroSubtitle = data.hero?.subtitle || "";


    const heroBackgroundUrl = data.hero?.background ? getImageUrl(data.hero.background) : ""

    const seoTextImage = data.hero?.background ? getImageUrl(data.seo_text_image) : ""
    const priceAmount =  data.pricing.amount || 0
    const priceLabel = data.pricing?.label || "";
    const helloAssoUrl = data.helloasso_url || "#";
    const membershipBenefits = data.benefits && data.benefits.length > 0 ? data.benefits : [];
    console.log(data)
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <main className="pt-20">
                <section className="relative py-20 px-6 lg:px-12">
                    <div className="absolute inset-0 bg-black/40"/>
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-fixed"
                        style={{backgroundImage: `url('${heroBackgroundUrl}')`,}}
                    />

                    <div className="relative max-w-6xl mx-auto text-center text-white">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {heroTitle}
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                            {heroSubtitle}
                        </p>
                        <div
                            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-8 py-4 text-2xl font-bold">
                            <RiVipCrownLine className="mr-3"/>
                            Adhésion : {priceAmount}€ / an
                        </div>
                    </div>
                </section>

                {/* BENEFICES */}
                <section className="py-20 px-6 lg:px-12 bg-black/20">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <RiStarLine className="text-yellow-400 text-3xl"/>
                                <h2 className="text-4xl font-bold text-white">
                                    Avantages Membres
                                </h2>
                            </div>
                            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                                Découvrez tous les privilèges réservés aux membres du club
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {membershipBenefits.map((benefit, index) => {
                                const Icon = getBenefitIcon(benefit.icon);
                                return (
                                    <div
                                        key={index}
                                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105"
                                    >
                                        <div
                                            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                                            <Icon className="text-2xl text-white"/>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-3 text-center">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-blue-200 text-center leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* INSCRIPTION / HELLOASSO */}
                <section className="py-20 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                            <div className="mb-8">

                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Prêt à rejoindre l&apos;aventure ?
                                </h2>

                            </div>



                            {helloAssoUrl && helloAssoUrl !== "#" ? (
                                <a
                                    href={helloAssoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-xl whitespace-nowrap cursor-pointer mb-6"
                                >
                                    <RiExternalLinkLine className="mr-3"/>
                                    S&apos;inscrire sur HelloAsso
                                </a>
                            ) : (
                                <button
                                    className="bg-gray-700 text-gray-300 font-bold py-4 px-12 rounded-lg text-xl mb-6 cursor-not-allowed"
                                    disabled
                                >
                                    Lien HelloAsso à venir
                                </button>
                            )}

                        </div>
                    </div>
                </section>

                {data.seo_text && (
                    <section className="py-20 px-6 lg:px-12">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="order-2 lg:order-1">
                                    <h2 className="text-3xl font-bold text-white mb-6">
                                        {data.seo_text_title}
                                    </h2>

                                    <div className="space-y-4 text-blue-100 leading-relaxed"
                                        dangerouslySetInnerHTML={{__html: data.seo_text}}
                                         >
                                    </div>


                                </div>
                                <div className="order-1 lg:order-2">
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                        <img
                                            src={seoTextImage}
                                            alt="Communauté Star Trek French Club - Membres passionnés lors d'un événement exclusif"
                                            className="w-full h-full object-cover object-top"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                                                <p className="text-white font-semibold text-lg">
                                                    <i className="ri-team-line mr-2 text-blue-400"></i>
                                                    {data.seo_text_image_text}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                )}
            </main>
        </div>
    );
}

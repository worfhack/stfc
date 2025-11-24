import {ContactForm} from "@/components/ContactForm";
import {cache} from "react";
import {ApiContactResponse} from "@/app/types/contact-page";
import {Metadata} from "next";
import {buildSeoMetadata} from "@/lib/seo";
import {getImageUrl} from "@/lib/image";
import {RiCheckLine} from "react-icons/ri";
export const dynamic = "force-dynamic";


const getContactData = cache(async (): Promise<ApiContactResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API;

    if (!baseUrl) {
        throw new Error("");
    }
    try {
        const res = await fetch(`${baseUrl}/starfleet/v1/contact-page`, {});
        if (!res.ok) {
            throw new Error("");
        }
        const data = (await res.json()) as ApiContactResponse;
        return data;
    } catch (e) {
        throw new Error("");
    }
});

export async function generateMetadata(): Promise<Metadata> {
    const data = await getContactData();
    return buildSeoMetadata(data.seo, getImageUrl);
}

export default async function ContactPage() {


    const contactData = await getContactData();
    const heroTitle = contactData?.hero?.title ?? "";
    const heroSubtitle = contactData?.hero?.subtitle ?? "";
    const herBG = contactData?.hero?.backgroundImage ?? "";
    const infoTitle = contactData?.content?.info_title ?? "";
    const infoText = contactData?.content?.info_text ?? "";
    const reasonsTitle = contactData?.content?.reasons_title ?? "";
    const reasons = contactData?.content?.reasons ?? [];
    const subjects = contactData?.subjects ?? [];
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900">


            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative py-20 px-6 lg:px-12">
                    <div className="absolute inset-0 bg-black/40"></div>

                    <div
                        className="absolute inset-0 bg-cover bg-center bg-fixed"
                        style={{
                            backgroundImage: `url('${herBG || ""}')`,
                        }}
                    ></div>
                    <div className="relative max-w-6xl mx-auto text-center text-white">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {heroTitle}
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            {heroSubtitle}
                        </p>
                    </div>
                </section>

                <section className="py-20 px-6 lg:px-12">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12  items-start">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    <i className="ri-mail-line mr-3 text-blue-400"></i>
                                    Envoyez-nous un message
                                </h2>
                                <p className="text-blue-100">
                                    Nous vous répondrons dans les plus brefs délais
                                </p>
                            </div>
                            <ContactForm subjects={subjects}/>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                                    <i className="ri-star-line mr-3 text-yellow-400"></i>
                                    {infoTitle}
                                </h2>

                                <div className="space-y-4 text-blue-100 leading-relaxed">
                                        <span dangerouslySetInnerHTML={{__html: infoText}}></span>
                                    <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mt-6">
                                        <h3 className="text-white font-semibold mb-2 flex items-center">
                                            <i className="ri-team-line mr-2"></i>
                                            {reasonsTitle}
                                        </h3>
                                        <ul className="space-y-2 text-sm">

                                            {reasons.map((cat) => {
                                                return (
                                                    <li className="flex items-start">
                                                        <RiCheckLine  className="text-green-400 mr-2 mt-1"  />
                                                        <span>{cat}</span>
                                                    </li>
                                                );
                                            })}


                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    <i className="ri-contacts-line mr-3 text-blue-400"></i>
                                    Nos Coordonnées
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i className="ri-mail-line text-xl text-white"></i>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-1">Email</h4>
                                            <p className="text-blue-200">stfc@outlook.fr</p>
                                        </div>
                                    </div>


                                    <div className="flex items-start space-x-4">
                                        <div
                                            className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i className="ri-map-pin-line text-xl text-white"></i>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-1">Localisation</h4>
                                            <p className="text-blue-200">France</p>
                                            <p className="text-sm text-blue-300 mt-1">Événements dans toute la
                                                France</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </main>

        </div>
    );
}
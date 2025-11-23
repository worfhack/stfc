// app/page/[slug]/page.tsx
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ApiGenericPageResponse } from "./types";
import { RiArrowRightSLine, RiHome5Line } from "react-icons/ri";

const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API;

async function fetchPage(slug: string): Promise<ApiGenericPageResponse> {
    const res = await fetch(
        `${WP_API_BASE}/starfleet/v1/page/${slug}`,
        { next: { revalidate: 60 } }
    );

    if (res.status === 404) notFound();
    if (!res.ok) throw new Error("Erreur de chargement");

    return res.json();
}

// ---------- SEO ----------
export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {
    const data = await fetchPage(params.slug);
    const seo = data.seo ?? {};
    const title = seo.seo_title || data.page.title;
    const description = seo.seo_description || undefined;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: seo.seo_image ? [{ url: seo.seo_image }] : [],
        },
    };
}

// ---------- PAGE ----------
export default async function GenericPage({ params }: { params: { slug: string } }) {
    const data = await fetchPage(params.slug);

    return (
        <main className="pt-20">


            <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-14 px-6 border-b border-gray-700/40">
                <div className="max-w-5xl mx-auto space-y-6">

                    {/* BREADCRUMB */}
                    <nav className="flex items-center text-gray-400 text-sm gap-2">
                        <Link href="/" className="flex items-center hover:text-white transition">
                            <RiHome5Line className="mr-1"/> Accueil
                        </Link>

                        <RiArrowRightSLine className="text-gray-500"/>

                        <span className="text-gray-300">{data.page.title}</span>
                    </nav>

                    <h1 className="text-4xl font-bold text-white">
                        {data.page.title}
                    </h1>
                </div>
            </section>

            {/* CONTENU */}
            <main className="py-16 px-6">
                <div className="max-w-4xl mx-auto">

                    <div
                        className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/60 rounded-2xl p-8 shadow-lg shadow-black/40">

                        <article
                            className="
                            prose prose-invert max-w-none
                            prose-headings:text-white
                            prose-a:text-blue-400 hover:prose-a:text-blue-300
                            prose-strong:text-white
                            prose-blockquote:border-blue-500
                            prose-code:bg-gray-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                            "
                            dangerouslySetInnerHTML={{__html: data.content.html}}
                        />
                    </div>

                </div>
            </main>

        </main>
    );
}

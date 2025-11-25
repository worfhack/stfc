// app/blog/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import BlogContentWithQuizzes from "@/components/BlogContentWithQuizzes";
import type {Metadata} from "next";
import {buildSeoMetadata} from "@/lib/seo";
import {getImageUrl} from "@/lib/image";
import {cache} from "react";
import {ApiCommunityResponse} from "@/app/types/community-page";

export type BlogPostPageProps = {
    params: {
        slug: string;
    };
    searchParams?: Record<string, string | string[] | undefined>;
};


type BlogPost = {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    authorBio: string;
    date: string;
    category: string;
    image: string | null;
    readTime: string;
    slug: string;
};

type BlogPostApiResponse = {
    post: BlogPost;
    prevPost: BlogPost | null;
    nextPost: BlogPost | null;
    relatedPosts: BlogPost[];
};
type BlogListApiResponse = {
    posts: { slug: string }[];
};

// export async function generateStaticParams() {
//     const wp = process.env.NEXT_PUBLIC_WP_API;
//     if (!wp) {
//         console.error("NEXT_PUBLIC_WP_API non défini");
//         return [];
//     }
//
//     const res = await fetch(`${wp}/starfleet/v1/blog`, {
//         cache: "force-cache",
//     });
//
//     if (!res.ok) {
//         console.error("Erreur API blog listing pour generateStaticParams", res.status);
//         return [];
//     }
//
//     const data = (await res.json()) as BlogListApiResponse;
//
//     return data.posts.map((post) => ({
//         slug: post.slug,
//     }));
// }

const fetchBlogPost = cache(async (slug): Promise<BlogPostApiResponse | null > => {

    const wp = process.env.NEXT_PUBLIC_WP_API;
    if (!wp) {
        console.error("NEXT_PUBLIC_WP_API non défini");
        return null;
    }

    const res = await fetch(
        `${wp}/starfleet/v1/blog-post?slug=${encodeURIComponent(slug)}`,
        {cache: "no-store"}
    );

    if (!res.ok) {
        console.error("Erreur API blog-post", res.status);
        return null;
    }

    const data = (await res.json()) as BlogPostApiResponse;
    return data;
});

export async function generateMetadata({params}: BlogPostPageProps)
{
const data = await fetchBlogPost(await params.slug);
data.seo.seo_title = data.seo.seo_title + " – Star Trek French Club"


    return buildSeoMetadata(data.seo, getImageUrl);
}


function formatDateFr(dateString: string): string {
    if (!dateString) return "";
    const d = new Date(dateString);
    // Exemple : 15 décembre 2024
    return d.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}


// --- Page ---

export default async function BlogPostPage({params}: BlogPostPageProps)
{
    const data = await fetchBlogPost(params.slug);

    if (!data) {
        notFound();
    }

    const {post, prevPost, nextPost, relatedPosts} = data;

    return (
        <>


            <main className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="grid lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-1 order-2 lg:order-1">
                            <div className="sticky top-[10rem] space-y-6">

                                {/* Author Info */}
                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                                    <div className="flex items-center space-x-4 mb-4">

                                        <div>
                                            <h4 className="text-white font-semibold">{post.author}</h4>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">{post.authorBio}</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 order-1 lg:order-2">
                            <section className="pb-16">
                                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <Breadcrumb category={post.category} title={post.title}/>

                                    <div className="mb-6 flex items-center justify-between text-sm text-gray-400">
                                        <div className="space-x-2">
                                            <Link href="/blog" className="hover:text-blue-400 transition">
                                                ← Retour au blog
                                            </Link>
                                        </div>
                                        <div className="flex items-center space-x-3">
                <span
                    className="inline-flex items-center rounded-full border border-gray-700 px-3 py-1 text-xs uppercase tracking-wide text-blue-300">
                  {post.category}
                </span>
                                        </div>
                                    </div>

                                    {/* Titre & meta */}
                                    <header className="mb-8">
                                        <h1
                                            className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
                                            style={{fontFamily: "Orbitron, sans-serif"}}
                                        >
                                            {post.title}
                                        </h1>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                <span>
                  Rédigé par{" "}
                    <span className="text-gray-200 font-medium">
                    {post.author}
                  </span>
                </span>
                                            <span className="hidden sm:inline">•</span>
                                            <span>{formatDateFr(post.date)}</span>
                                        </div>
                                    </header>

                                    {post.image && (
                                        <div
                                            className="mb-10 rounded-2xl overflow-hidden border border-gray-800 bg-gray-800/40">
                                            <div className="relative w-full h-64 sm:h-80 md:h-96">
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 80vw,
                           60vw"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <article
                                        className="prose prose-invert prose-headings:text-gray-100 prose-a:text-blue-400 max-w-none">
                                        <BlogContentWithQuizzes html={post.content}/>
                                    </article>

                                    {/* Navigation précédent / suivant */}
                                    {(prevPost || nextPost) && (
                                        <div className="mt-10 border-t border-gray-800 pt-6 grid gap-4 md:grid-cols-2">
                                            {prevPost && (
                                                <Link
                                                    href={`/blog/${prevPost.slug}`}
                                                    className="group block p-4 rounded-xl bg-gray-800/60 border border-gray-700 hover:border-blue-500 transition"
                                                >
                                                    <p className="text-xs text-gray-500 mb-1">
                                                        Article précédent
                                                    </p>
                                                    <p className="text-sm text-gray-200 group-hover:text-blue-300">
                                                        {prevPost.title}
                                                    </p>
                                                </Link>
                                            )}
                                            {nextPost && (
                                                <Link
                                                    href={`/blog/${nextPost.slug}`}
                                                    className="group block p-4 rounded-xl bg-gray-800/60 border border-gray-700 hover:border-blue-500 transition text-right"
                                                >
                                                    <p className="text-xs text-gray-500 mb-1">
                                                        Article suivant
                                                    </p>
                                                    <p className="text-sm text-gray-200 group-hover:text-blue-300">
                                                        {nextPost.title}
                                                    </p>
                                                </Link>
                                            )}
                                        </div>
                                    )}

                                    {relatedPosts.length > 0 && (
                                        <section className="mt-12">
                                            <h2 className="text-lg font-semibold mb-4 text-gray-100">
                                                Articles similaires
                                            </h2>
                                            <div className="grid gap-4 md:grid-cols-3">
                                                {relatedPosts.map((rp) => (
                                                    <Link
                                                        key={rp.id}
                                                        href={`/blog/${rp.slug}`}
                                                        className="group block rounded-xl bg-gray-800/60 border border-gray-700 hover:border-blue-500 transition p-4"
                                                    >
                                                        <p className="text-xs text-gray-500 mb-2">
                                                            {rp.category}
                                                        </p>
                                                        <p className="text-sm text-gray-200 group-hover:text-blue-300 line-clamp-3">
                                                            {rp.title}
                                                        </p>
                                                        <p className="mt-2 text-xs text-gray-500">
                                                            {formatDateFr(rp.date)} • {rp.readTime}
                                                        </p>
                                                    </Link>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    <div
                                        className="mt-12 border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <p className="text-gray-400 text-sm">
                                            Tu veux réagir à cet article, partager une théorie ou proposer
                                            un sujet ? !
                                        </p>
                                        <Link
                                            href="/nous-rejoindre"
                                            className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500 transition shadow-lg shadow-blue-600/30"
                                        >
                                            Rejoindre l’équipage
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            {/*<Footer/>*/}
        </>
    );
}

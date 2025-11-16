// app/blog/page.tsx

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogApiResponse } from "@/app/blog/types";
import type { Metadata } from "next";

const PER_PAGE_DEFAULT = 6;

// Optionnel, mais explicite : on force le statique
export const dynamic = "force-static";

async function fetchBlogData(
    baseUrl: string,
    page: number,
    categorySlug?: string | null
): Promise<BlogApiResponse | null> {
  try {
    const baseWithSlash = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";

    const url = new URL("starfleet/v1/blog", baseWithSlash);
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", String(PER_PAGE_DEFAULT));
    if (categorySlug) {
      url.searchParams.set("category", categorySlug);
    }

    const res = await fetch(url.toString(), {
      // IMPORTANT : pas de "no-store" si tu veux du SSG / export statique
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("Erreur API blog");
    const data = (await res.json()) as BlogApiResponse;
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

type BlogSearchParams = {
  page?: string;
  category?: string;
};

// ❌ Avant : searchParams?: Promise<BlogSearchParams>;
// ✅ Maintenant : simple objet
type BlogPageProps = {
  searchParams?: BlogSearchParams;
};

const buildPageHref = (page: number, categorySlug?: string) => {
  const query = new URLSearchParams();

  if (categorySlug) {
    query.set("category", categorySlug);
  }

  if (page > 1) {
    query.set("page", String(page));
  }

  const qs = query.toString();
  return qs ? `/blog?${qs}` : "/blog";
};

export async function generateMetadata(
    { searchParams }: BlogPageProps
): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API!;
  // ❌ Avant : const sp = (await searchParams) ?? {};
  const sp = searchParams ?? {};

  const page = Number(sp.page ?? 1) || 1;
  const categorySlug = sp.category ?? null;

  const data = await fetchBlogData(baseUrl, page, categorySlug);

  const seo = data?.page?.seo;
  const baseTitle = seo?.title || "Blog du Star Trek French Club";
  const baseDesc =
      seo?.description ||
      "Analyses, actualités, récits d’événements et théories sur l’univers Star Trek.";

  const pageSuffix = page > 1 ? ` – Page ${page}` : "";
  const title = `${baseTitle}${pageSuffix}`;
  const description =
      page > 1 ? `${baseDesc} (Page ${page})` : baseDesc;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const canonicalUrl =
      page > 1 ? `${siteUrl}/blog?page=${page}` : `${siteUrl}/blog`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: seo?.image ? [{ url: seo.image }] : [],
    },
  };
}

// ---- Page principale ----

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API;
  if (!baseUrl) {
    console.error("NEXT_PUBLIC_WP_API non défini");
    return (
        <div className="min-h-screen bg-gray-900 text-white">
          <Header />
          <main className="pt-20 max-w-3xl mx-auto px-6">
            <p>Configuration manquante : NEXT_PUBLIC_WP_API.</p>
          </main>
          <Footer />
        </div>
    );
  }

  // ❌ Avant : const sp = (await searchParams) ?? {};
  const sp = searchParams ?? {};
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const categorySlug = sp.category ?? "";
  const data = await fetchBlogData(baseUrl, page, categorySlug || null);
  const posts = data?.posts ?? [];
  const pagination = data?.pagination;
  const hero = data?.page?.hero;

  const apiCategories = data?.categories ?? [];

  const categories = [
    { name: "Tous", slug: "" },
    ...apiCategories.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
    })),
  ];

  const currentCategoryObj =
      categories.find((c) => c.slug === categorySlug) ?? categories[0];
  const selectedCategoryName = currentCategoryObj.name;

  return (
      <div className="min-h-screen bg-gray-900 text-white">
        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${hero?.background || ""}')`,
                }}
            >
              <div className="absolute inset-0 bg-gray-900/80"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 text-center">
              <h1
                  className="text-5xl lg:text-6xl font-bold mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {hero?.title || ""}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {hero?.subtitle || ""}
              </p>
            </div>
          </section>

          {/* Categories Filter */}
          <section className="py-8 bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((cat) => {
                  const isActive =
                      cat.slug === categorySlug ||
                      (!categorySlug && cat.slug === "");
                  const href =
                      cat.slug === ""
                          ? "/blog"
                          : `/blog?category=${encodeURIComponent(cat.slug)}`;
                  return (
                      <Link
                          key={cat.slug || "tous"}
                          href={href}
                          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                              isActive
                                  ? "bg-blue-600 text-white shadow-lg"
                                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                          }`}
                      >
                        {cat.name}
                      </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
              {posts.length === 0 ? (
                  <p className="text-center text-gray-400">
                    Aucun article pour cette catégorie pour l’instant.
                  </p>
              ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 group cursor-pointer"
                        >
                          <div className="relative overflow-hidden">
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                />
                            )}
                            <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {post.category}
                        </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </h3>

                            <p className="text-gray-400 mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{post.author}</span>
                              <span>{post.date}</span>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </Link>
                    ))}
                  </div>
              )}

              {/* Pagination */}
              {pagination && pagination.total_pages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-4">
                    {pagination.current_page > 1 && (
                        <Link
                            href={buildPageHref(
                                pagination.current_page - 1,
                                categorySlug || undefined
                            )}
                            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 cursor-pointer"
                        >
                          ← Page précédente
                        </Link>
                    )}

                    <span className="text-gray-400 text-sm">
                  Page {pagination.current_page} / {pagination.total_pages}
                      {selectedCategoryName !== "Tous" && (
                          <> – {selectedCategoryName}</>
                      )}
                </span>

                    {pagination.current_page < pagination.total_pages && (
                        <Link
                            href={buildPageHref(
                                pagination.current_page + 1,
                                categorySlug || undefined
                            )}
                            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 cursor-pointer"
                        >
                          Page suivante →
                        </Link>
                    )}
                  </div>
              )}
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2
                  className="text-3xl font-bold text-white mb-4"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Ne Manquez Aucun Article
              </h2>
              <p className="text-gray-300 mb-8">
                Recevez nos derniers articles et analyses directement dans votre
                boîte mail
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
                  S&apos;abonner
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
  );
};

export default BlogPage;

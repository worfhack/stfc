// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE_URL =
    process.env.NEXT_PUBLIC_URL ;

const WP_API_BASE =
    process.env.NEXT_PUBLIC_WP_API;

// Temps de cache ISR pour le sitemap (en secondes)
export const revalidate = 3600; // 1h

type WpPage = {
    slug: string;
    modified: string;
    template?: string;
    status: string;
};

type WpPost = {
    slug: string;
    modified: string;
    date: string;
    status: string;
};

// Helper pour récupérer TOUTES les pages/posts WP (avec pagination)
async function fetchAllWp<T>(
    endpoint: string
): Promise<{ items: T[]; total: number }> {
    const perPage = 100;

    const firstUrl = `${WP_API_BASE}${endpoint}?per_page=${perPage}&status=publish&_fields=slug,modified,date,template,status`;
    const firstRes = await fetch(firstUrl, {
        next: { revalidate: 3600 },
    });

    if (!firstRes.ok) {
        console.error("Erreur fetch WP", endpoint, firstRes.status);
        return { items: [], total: 0 };
    }

    const total = Number(firstRes.headers.get("X-WP-Total") || "0");
    const totalPages = Number(firstRes.headers.get("X-WP-TotalPages") || "1");

    const firstItems = (await firstRes.json()) as T[];
    const allItems: T[] = [...firstItems];

    for (let page = 2; page <= totalPages; page++) {
        const url = `${WP_API_BASE}${endpoint}?per_page=${perPage}&status=publish&page=${page}&_fields=slug,modified,date,template,status`;
        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) break;
        const json = (await res.json()) as T[];
        allItems.push(...json);
    }

    return { items: allItems, total };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1️⃣ Routes statiques (ton ancien sitemap.xml)
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/`,  },

        { url: `${BASE_URL}/activites`, },
        { url: `${BASE_URL}/blog`,  },
        {
            url: `${BASE_URL}/chronologie-star-trek`,
        },
        { url: `${BASE_URL}/communaute`,},
        {
            url: `${BASE_URL}/encyclopedie-star-trek`,
        },
        { url: `${BASE_URL}/evenements`,  },
        {
            url: `${BASE_URL}/films-series-star-trek`,
        },
        {
            url: `${BASE_URL}/notre-histoire`,
        },
        {
            url: `${BASE_URL}/nous-contacter`,
        },
        {
            url: `${BASE_URL}/nous-rejoindre`,
        },

        { url: `${BASE_URL}/types`,  },
        { url: `${BASE_URL}/univers`,  },
        {
            url: `${BASE_URL}/vie-association`,
        },
    ];

    // 2️⃣ Pages WP -> /page/[slug] (template par défaut uniquement)
    const { items: wpPages } = await fetchAllWp<WpPage>("/wp/v2/pages");

    const pageRoutes: MetadataRoute.Sitemap = wpPages
        .filter((p) => p.status === "publish")
        .filter((p) => !p.template || p.template === "default") // template par défaut
        .map((p) => ({
            url: `${BASE_URL}/page/${p.slug}`,
        }));

    // 3️⃣ Articles WP -> /blog/[slug]
    const { items: wpPosts, total: totalPosts } =
        await fetchAllWp<WpPost>("/wp/v2/posts");

    const postRoutes: MetadataRoute.Sitemap = wpPosts
        .filter((p) => p.status === "publish")
        .map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
        }));

    // 4️⃣ Pagination du blog -> /blog/page/[n]
    // ⚠️ METS LA MÊME VALEUR QUE TON FRONT (par ex. 12 ou 9)
    const POSTS_PER_PAGE = 12;
    const totalBlogPages =
        totalPosts > 0 ? Math.ceil(totalPosts / POSTS_PER_PAGE) : 1;

    const blogPaginationRoutes: MetadataRoute.Sitemap = [];
    for (let page = 1; page <= totalBlogPages; page++) {
        const path = page === 1 ? "/blog" : `/blog/page/${page}`;
        blogPaginationRoutes.push({
            url: `${BASE_URL}${path}`,
        });

    }

    return [
        ...staticRoutes,
        ...pageRoutes,
        ...postRoutes,
        ...blogPaginationRoutes,
    ];
}

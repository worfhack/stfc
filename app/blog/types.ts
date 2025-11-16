// app/types/blog.ts

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    image: string;
    readTime: string;
    slug: string;
}

export interface BlogHero {
    title?: string;
    subtitle?: string;
    background?: string;
}
export interface BlogCategory {
    id: number;
    name: string;
    slug: string;
}

export interface BlogSeo {
    title?: string;
    description?: string;
    image?: string;
}

export interface BlogPage {
    id: number | null;
    slug: string;
    hero?: BlogHero;
    seo?: BlogSeo;
}

export interface BlogApiResponse {
    page: BlogPage;
    posts: BlogPost[];
    categories?: BlogCategory[];

    pagination: {
        current_page: number;
        per_page: number;
        total_pages: number;
        total_posts: number;
    };
}

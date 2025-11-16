
export type BlogPost = {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    image: string;
    readTime: string;
    slug?: string; // optionnel si tu veux passer en /blog/[slug]
};
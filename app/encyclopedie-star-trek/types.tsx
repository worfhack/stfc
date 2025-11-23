// app/encyclopedie/types.ts
import { ApiSeo } from "@/app/types/seo";

export type ApiEncyclopediaItem = {
    name: string;
    description: string;
    details: string;
    image: string | null;
};

export type ApiEncyclopediaCategory = {
    id: string;
    name: string;
    icon: string;
    color: string;
    items: ApiEncyclopediaItem[];
};

export type ApiEncyclopediaResponse = {
    page: {
        id: number;
        title: string;
        slug: string;
    };
    seo?: ApiSeo;
    hero: {
        title: string;
        subtitle: string;
        backgroundImage: string | null;
        quote?: string;
        quoteAuthor?: string;
    };
    categories: ApiEncyclopediaCategory[];
};

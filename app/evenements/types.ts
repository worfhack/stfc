// app/events/types.ts

// ---- IMAGES ----
import {ApiSeo} from "@/app/types/seo";

export type ApiImage = {
    id?: number;
    url?: string;
    alt?: string;
    sizes?: Record<string, string>;
};

// ---- CATEGORIES (WordPress) ----
export type ApiCategory = {
    id: number;
    slug: string;
    name: string;
    description?: string;
};

export type ApiEventCategory = {
    id: number;
    slug: string;
    name: string;
};

// ---- HERO SECTION (ACF) ----
export type ApiHero = {
    title?: string;
    subtitle?: string;
    background_image?: ApiImage | null;
};

// ---- PAGE OBJET ----
export type ApiPage = {
    id: number;
    title: string;
    slug: string;
    hero?: ApiHero;
};

// ---- ÉVÉNEMENTS ----
export type ApiEvent = {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    event_date?: string; // YYYY-MM-DD
    event_date_display?: string; // YYYY-MM-DD
    event_time?: string;
    location?: string;
    image?: string | null;
    can_register?: boolean;
    categories?: ApiEventCategory[];
    permalink?: string;
};
export type ApiPagination = {
    current_page: number;
    per_page: number;
    total_events: number;
    total_pages: number;
};

// ---- PAYLOAD COMPLET FOURNI PAR L’API ----
export type ApiEventsOverview = {
    seo: ApiSeo | undefined;
    page?: ApiPage | null;
    events?: ApiEvent[];
    categories?: ApiCategory[];
    pagination?: ApiPagination;

};

// ---- UI (front) ----
export type UiCategory = {
    id: string; // exemple: "all" ou slug
    name: string;
};
export interface BlogCategory {
    id: number;
    name: string;
    slug: string;
    count: number;
}


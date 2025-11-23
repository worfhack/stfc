export type ApiSeo = {
    seo_title?: string;
    seo_description?: string;
    seo_image?: string | null;
};

export type ApiBreadcrumb = {
    label: string;
    url: string;
};

export type ApiChronoEvent = {
    year: string;
    title: string;
    description: string;
};

export type ApiChronoEra = {
    id: string;
    name: string;
    period: string;
    color: "blue" | "purple" | "yellow" | "green" | "red";
    icon_key: "rocket" | "government" | "star" | "compass" | "alert";
    events: ApiChronoEvent[];
};

export type ApiChronoTimeline = {
    title: string;
    description: string;
    eras: ApiChronoEra[];
};

export type ApiChronoCtaLink = {
    label: string;
    url: string;
    icon_key: "book" | "film" | string;
};

export type ApiChronoCta = {
    title: string;
    text: string;
    links: ApiChronoCtaLink[];
};

export type ApiChronoResponse = {
    page: {
        id: number;
        title: string;
        slug: string;
        date?: string;
    };
    seo?: ApiSeo;
    hero: {
        title: string;
        subtitle: string;
        backgroundImage?: string;
    };
    breadcrumbs?: ApiBreadcrumb[];
    timeline: ApiChronoTimeline;
    cta: ApiChronoCta;
};

// app/page/[slug]/types.ts
export type ApiSeo = {
    seo_title?: string | null;
    seo_description?: string | null;
    seo_image?: string | null;
};

export type ApiGenericPageResponse = {
    page: {
        id: number;
        title: string;
        slug: string;
        url?: string;
    };
    seo?: ApiSeo;
    content: {
        html: string;
    };
};

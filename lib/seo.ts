import type { Metadata } from "next";

type ApiSeo = {
    seo_title?: string;
    seo_description?: string;
    seo_image?: any;
};

export const buildSeoMetadata = (
    seo: any | undefined,
    getImageUrl: (img: any) => string
): Metadata => {
    if (!seo) return {};

    const title = seo.seo_title || "";
    const description = seo.seo_description || "";

    const imageUrl = seo.seo_image ? getImageUrl(seo.seo_image) : undefined;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: imageUrl ? [imageUrl] : [],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: imageUrl ? [imageUrl] : [],
        },
    };
};

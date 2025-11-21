import {ApiSeo} from "@/app/types/seo";

export type ApiCommunityIntroParagraph = {
    text?: string;
};

export type ApiCommunitySection = {
    title?: string;
    text?: string;
};

export type ApiCommunityHero = {
    title?: string;
    subtitle?: string;
    text?: string;
};

export type ApiCommunityIntro = {
    title?: string;
    paragraphs?: ApiCommunityIntroParagraph[];
};

export type ApiCommunityMapBlock = {
    title?: string;
    intro?: string;
    footer?: string;
};

export type ApiCommunityResponse = {
    seo: ApiSeo | undefined;
    id: number;
    title: string;
    slug: string;

    hero?: ApiCommunityHero;
    intro?: ApiCommunityIntro;

    community_sections?: ApiCommunitySection[];

    map_block?: ApiCommunityMapBlock;
};

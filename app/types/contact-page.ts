import {ApiSeo} from "@/app/types/seo";



export type ApiContactHero = {
    title: string;
    subtitle: string;
    backgroundImage: string;
};

export type ApiContactContent = {
    info_title: string;
    info_text: string;       // HTML
    reasons_title: string;
    reasons: string[];
};

export type ApiContactSubject = {
    id: number;
    slug: string;
    name: string;
};

export type ApiContactPageMeta = {
    id: number;
    title: string;
    slug: string;
};

export type ApiContactResponse = {
    page: ApiContactPageMeta;
    seo?: ApiSeo;
    hero: ApiContactHero;
    content: ApiContactContent;
    subjects: ApiContactSubject[];
};
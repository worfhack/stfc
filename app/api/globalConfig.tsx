// app/api/globalConfig.ts

import {cache} from "react";
import {ApiContactResponse} from "@/app/types/contact-page";

export type MenuItem = {
    label: string;
    url: string;
    icon?: string;
    children?: MenuItem[];
};

export type SocialLink = {
    label: string;
    url: string;
    icon: string; // ex: "ri-youtube-line"
};

export type GlobalConfig = {
    copyright: string;
    newsletter: {
        title: string;
        subtitle: string;
    };
    menus: {
        header: MenuItem[];
        footer: MenuItem[];
        copyright: MenuItem[];
    };
    socialLinks: SocialLink[];
    seoFooterText: string;
};


export const fetchGlobalConfig = cache(async (): Promise<GlobalConfig> => {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API;

    const res = await fetch(`${baseUrl}/starfleet/v1/config`, {
        next: { revalidate: 0 }, // ou 0 si tu veux du SSR pur
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch global config: ${res.status}`);
    }

    return res.json();
});

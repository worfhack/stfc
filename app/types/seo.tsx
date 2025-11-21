import {ApiImage} from "@/app/activites/type";

export type ApiSeo = {
    title?: string;
    description?: string;
    og_image?: ApiImage | null;
};
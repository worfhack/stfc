import {ApiImage} from "@/app/activites/type";

export const getImageUrl = (
    image: ApiImage | {} | null | undefined
): string => {
    if (!image || typeof image !== "object") return "";
    const img = image as ApiImage;

    if (img.sizes && typeof img.sizes["medium_large"] === "string") {
        return img.sizes["medium_large"] as string;
    }
    if (img.url) return img.url;

    return "";
};
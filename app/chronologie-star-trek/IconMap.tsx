"use client";

import {
    RiRocketLine,
    RiGovernmentLine,
    RiStarLine,
    RiCompassLine,
    RiAlertLine,
    RiBookLine,
    RiFilmLine,
    RiCalendarEventLine,
} from "react-icons/ri";

import type { IconType } from "react-icons";

export const ERA_ICON_MAP: Record<string, IconType> = {
    rocket: RiRocketLine,
    government: RiGovernmentLine,
    star: RiStarLine,
    compass: RiCompassLine,
    alert: RiAlertLine,
};

export const CTA_ICON_MAP: Record<string, IconType> = {
    book: RiBookLine,
    film: RiFilmLine,
};

export const GENERIC_ICON_MAP: Record<string, IconType> = {
    calendar: RiCalendarEventLine,
};

export function getEraIcon(key: string): IconType {
    return ERA_ICON_MAP[key] ?? RiStarLine;
}

export function getCtaIcon(key: string): IconType {
    return CTA_ICON_MAP[key] ?? RiBookLine;
}

export function getEventIcon(): IconType {
    return RiCalendarEventLine;
}

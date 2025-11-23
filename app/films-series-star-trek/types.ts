// app/films-series-star-trek/types.ts

export type FilmsSeriesHero = {
    title: string;
    subtitle?: string;
    intro?: string;
    backgroundImage?: string;
};

export type FilmsSeriesSeo = {
    seo_title?: string;
    seo_description?: string;
};

export type FilmsSeriesPageInfo = {
    id: number;
    title: string;
    slug: string;
};

export type FilmsSeriesSeriesItem = {
    title: string;
    years: string;
    seasons?: number;
    episodes?: number;
    captain?: string;
    ship?: string;
    description?: string;
    highlights?: string;
    image?: string;
    color?: string;
};

export type FilmsSeriesFilmItem = {
    title: string;
    year: number;
    director?: string;
    description?: string;
    era?: 'TOS' | 'TNG' | 'Kelvin' | string;
    image?: string;
};

export type FilmsSeriesViewingItem = {
    title: string;
    note?: string;
};

export type FilmsSeriesViewingOrders = {
    chronologique: FilmsSeriesViewingItem[];
    production: FilmsSeriesViewingItem[];
    debutants: FilmsSeriesViewingItem[];
};

export type FilmsSeriesApiResponse = {
    page: FilmsSeriesPageInfo;
    seo: FilmsSeriesSeo;
    hero: FilmsSeriesHero;
    series: FilmsSeriesSeriesItem[];
    films: FilmsSeriesFilmItem[];
    viewingOrders: FilmsSeriesViewingOrders;
};

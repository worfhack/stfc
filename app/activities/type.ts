export type ApiStat = {
    number?: string;
    label?: string;
    icon?: string;
};

export type ApiFeature = {
    item?: string;
};

export type ApiImage = {
    url?: string;
    sizes?: {
        [key: string]: string | number;
    };
};

export type ApiMainActivity = {
    title?: string;
    description?: string;
    image?: ApiImage | {} | null;
    icon?: string;
    participants?: string;
    features?: ApiFeature[] | false;
};

export type ApiAdditionalActivity = {
    title?: string;
    description?: string;
    icon?: string;
    participants?: string;
    frequency?: string;
};

export type ApiSeo = {
    title?: string;
    description?: string;
    og_image?: ApiImage | null;
};

export type ApiHero = {
    title?: string;
    subtitle?: string;
    background?: ApiImage | null;
};

export type ApiTextsSection = {
    title?: string;
    subtitle?: string;
};

export type ApiTextsCta = {
    title?: string;
    subtitle?: string;
    primary_label?: string;
    secondary_label?: string;
};

export type ApiTexts = {
    stats?: ApiTextsSection;
    main?: ApiTextsSection;
    additional?: ApiTextsSection;
    cta?: ApiTextsCta;
};

export type ApiActivitiesResponse = {
    id: number;
    title: string;
    slug: string;
    seo?: ApiSeo;
    hero?: ApiHero;
    texts?: ApiTexts;
    stats?: ApiStat[];
    main_activities?: ApiMainActivity[];
    additional_activities?: ApiAdditionalActivity[] | false;
};


export type Stat = {
    number: string;
    label: string;
    icon: string;
};

export type MainActivity = {
    title: string;
    description: string;
    image: string;
    icon: string;
    participants: string;
    features: string[];
};

export type AdditionalActivity = {
    title: string;
    description: string;
    icon: string;
    participants: string;
    frequency: string;
};

export type Seo = {
    title: string;
    description: string;
    ogImageUrl: string;
};

export type Hero = {
    title: string;
    subtitle: string;
    backgroundUrl: string;
};

export type SectionText = {
    title: string;
    subtitle: string;
};

export type CtaText = {
    title: string;
    subtitle: string;
    primaryLabel: string;
    secondaryLabel: string;
};

export type ActivitiesTexts = {
    stats: SectionText;
    main: SectionText;
    additional: SectionText;
    cta: CtaText;
};

export type ActivitiesViewModel = {
    seo: Seo;
    hero: Hero;
    texts: ActivitiesTexts;
    stats: Stat[];
    mainActivities: MainActivity[];
    additionalActivities: AdditionalActivity[];
};

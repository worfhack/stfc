export type CommunityMarker = {
    id: number;
    prenom: string;
    ville: string;
    location: {
        address: string;
        lat: number | null;
        lng: number | null;
    };
};

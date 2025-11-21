// components/CommunityMapClient.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CommunityMarker } from "@/app/types/community";

// Carte Leaflet uniquement côté client
const DynamicCommunityMap = dynamic(() => import("./CommunityMap"), {
    ssr: false,
});

export default function CommunityMapClient() {
    const [markers, setMarkers] = useState<CommunityMarker[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_WP_API;

        if (!baseUrl) {
            console.error("NEXT_PUBLIC_WP_API non défini dans le client");
            setLoading(false);
            return;
        }

        const fetchMarkers = async () => {
            try {
                const res = await fetch(`${baseUrl}/starfleet/v1/positionadherant`);
                if (!res.ok) throw new Error("Erreur API communauté (positions)");
                const data = await res.json();
                setMarkers(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchMarkers();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                Chargement de la carte…
            </div>
        );
    }

    if (!markers.length) {
        return (
            <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                Aucun membre géolocalisé pour le moment.
            </div>
        );
    }

    return <DynamicCommunityMap markers={markers} />;
}

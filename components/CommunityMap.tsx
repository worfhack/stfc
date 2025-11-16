"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {CommunityMarker} from "@/app/types/community";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import {StaticImageData} from "next/image";


const toUrl = (img: string | StaticImageData): string =>
    typeof img === "string" ? img : img.src;

export const markerIcon = L.icon({
    iconUrl: toUrl(markerIconPng),
    shadowUrl: toUrl(markerShadowPng),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

type Props = {
    markers: CommunityMarker[];
};

const defaultCenter: [number, number] = [46.5, 2.5];

const CommunityMap = ({ markers }: Props) => {
    const validMarkers = markers.filter(
        (m) => m.location.lat !== null && m.location.lng !== null
    );

    const center: [number, number] =
        validMarkers.length > 0
            ? [validMarkers[0].location.lat as number, validMarkers[0].location.lng as number]
            : defaultCenter;

    return (
        <MapContainer
            center={center}
            zoom={5}
            scrollWheelZoom={false}
            className="w-full h-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {validMarkers.map((m) => (
                <Marker
                    key={m.id}
                    position={[m.location.lat as number, m.location.lng as number]}
                    icon={markerIcon}
                >
                        {/*<Popup>*/}
                        {/*    <div className="text-sm">*/}
                        {/*        <div className="font-semibold">{m.prenom}</div>*/}
                        {/*        {m.ville && <div>{m.ville}</div>}*/}
                        {/*        {m.location.address && (*/}
                        {/*            <div className="text-xs text-gray-500 mt-1">*/}
                        {/*                {m.location.address}*/}
                        {/*            </div>*/}
                        {/*        )}*/}
                        {/*    </div>*/}
                        {/*</Popup>*/}
                </Marker>
            ))}
        </MapContainer>
    );
};

export default CommunityMap;

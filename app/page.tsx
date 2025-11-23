// app/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import CommunitySection from "@/components/CommunitySection";
import EventsSection from "@/components/EventsSection";
import JoinSection from "@/components/JoinSection";
import { cache } from "react";
import { getImageUrl } from "@/lib/image";
import HomeClient from "./HomeClient";
import {Metadata} from "next";
import {buildSeoMetadata} from "@/lib/seo"; // composant client qui gère le scroll
export const dynamic = "force-dynamic";

const fetchHomeData = cache(async (): Promise<any> => {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_WP_API manquant");
  }
  const baseWithSlash = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
  const url = new URL("starfleet/v1/home", baseWithSlash);

  const res = await fetch(url.toString(), {});
  if (!res.ok) {
    throw new Error(`Erreur API home: ${res.status}`);
  }

  return res.json();
});
export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchHomeData();
  return buildSeoMetadata(data.seo, getImageUrl);
}
export default async function HomePage() {
  const data = await fetchHomeData();
  return (
      <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <main>
          <HomeClient
              hero={data.hero}
              sections={data.sections}
              events={data.events ?? []}
              articles={data.articles ?? []}
              main_activities={data.activities?.main_activities ?? []}
              texts={data.texts}
              community_items={data.community_items}
          />
        </main>
      </div>
  );
}

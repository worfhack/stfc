// app/HomeClient.tsx
"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import CommunitySection from "@/components/CommunitySection";
import EventsSection from "@/components/EventsSection";
import ArticlesSection from "@/components/ArticlesSection";



const HomeClient = ({ hero, sections, events, texts, community_items, main_activities, articles }: any ) => {
    const [scrollY, setScrollY] = useState(0);
    console.log("m", community_items)
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <HeroSection scrollY={scrollY} data={hero} />
            <ActivitiesSection activities={main_activities} texts={texts} />
            <EventsSection events={events} texts={texts}/>
            <ArticlesSection articles={articles} texts={texts}/>
            <CommunitySection community_items={community_items} texts={texts}  />
        </>
    );
};

export default HomeClient;

"use client";

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import CommunitySection from "@/components/CommunitySection";
import EventsSection from "@/components/EventsSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";
const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      
      {/*<Header />*/}
      <main>
        <HeroSection scrollY={scrollY} />
        <ActivitiesSection />
        <EventsSection />
        <CommunitySection />
        <JoinSection />
      </main>
      {/*<Footer />*/}
    </div>
  );
};

export default HomePage;

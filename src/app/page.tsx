"use client";

import HeroSection from "@/components/home/HeroSection";
import InfoCard from "@/components/home/InfoCard";

export default function Home() {
  return (
    <>
      <div className="bg-blue-50">
        <HeroSection />
      </div>
      <InfoCard />
    </>
  );
}

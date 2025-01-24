"use client";

import HeroSection from "@/components/home/HeroSection";
import InfoCard from "@/components/home/InfoCard";

export default function Home() {
  return (
    <>
      <div className="bg-blue-200">
        <HeroSection />
      </div>
      <InfoCard />
    </>
  );
}

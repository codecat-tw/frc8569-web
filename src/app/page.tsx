"use client";
import HeroSection from "../components/home/HeroSection";
import ActivityCard from "../components/home/ActivityCard";
import ApplyCard from "../components/home/ApplyCard";
import HelpCard from "../components/home/HelpCard";

export default function Home() {
  return (
    <>
      <div className="bg-blue-200">
        <HeroSection />
      </div>
      <ActivityCard />
      <ApplyCard />
      <HelpCard />
    </>
  );
}

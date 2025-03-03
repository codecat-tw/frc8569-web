"use client";

import HeroSection from "@/components/home/HeroSection";
import InfoCard from "@/components/home/InfoCard";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      {/* <div className="bg-blue-200">
        <HeroSection />
      </div>
      <InfoCard /> */}
      <button
        onClick={() => signOut()}
        className="mt-4 w-full rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        登出
      </button>

    </>
  );
}

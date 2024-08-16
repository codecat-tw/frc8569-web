'use client';
import HeroSection from "../components/HeroSection";
import About from "../components/About";

export default function Home() {
  return (
    <div className="container mx-auto">
      <HeroSection />
      <About />
    </div>
  )
}

"use client";
import ScenarioList from "@/components/scenario/ScenarioList";
import ScenarioCarousel from "@/components/scenario/ScenarioCarousel";
import { scenarios } from "@/lib/utils/data"; 


export default function PublicHome() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Version mobile uniquement */}
      <div className="md:hidden">
        <ScenarioList scenarios={scenarios} />
      </div>
      
      {/* Version tablette et desktop */}
      <div className="hidden md:block">
        <ScenarioCarousel scenarios={scenarios} />
      </div>
    </main>
  );
}
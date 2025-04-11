"use client";
import ScenarioList from "@/components/scenario/ScenarioList";
import ScenarioCarousel from "@/components/scenario/ScenarioCarousel";
import { scenarios } from "@/lib/utils/data"; 


export default function PublicHome() {
  return (
    <main className="container px-4 py-8">
      {/* Version mobile uniquement */}
      <section className="md:hidden">
        <ScenarioList scenarios={scenarios} />
      </section>
      
      {/* Version tablette et desktop */}
      <section className="hidden md:block">
        <ScenarioCarousel scenarios={scenarios} />
      </section>
    </main>
  );
}
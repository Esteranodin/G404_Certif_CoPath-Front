"use client";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import ScenarioCard from "./ScenarioCard";

export default function ScenarioCarousel({ scenarios }) {
  return (
    <Carousel 
      opts={{ 
        loop: true,
        align: "center",
        skipSnaps: false,
        dragFree: false
      }} 
      className="carousel-container carousel-animation"
    >
      <CarouselContent className="h-full py-8">
        {scenarios.map((scenario) => (
          <CarouselItem key={scenario.id} className="flex items-center justify-center h-full">
            <ScenarioCard scenario={scenario} layout="tablet" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
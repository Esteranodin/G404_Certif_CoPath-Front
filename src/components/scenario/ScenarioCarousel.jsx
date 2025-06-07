import "@/styles/carousel.css";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import ScenarioCard from "./ScenarioCard";

export default function ScenarioCarousel({ scenarios, isFavorite, onToggleFavorite }) {
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
        {scenarios.map((scenario, index) => (
          <CarouselItem key={scenario.id} className="flex items-center justify-center h-full">
            <ScenarioCard 
              scenario={scenario} 
              layout="tablet"
              isFavorite={isFavorite(scenario.id)}
              onToggleFavorite={onToggleFavorite}
              priority={index === 0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
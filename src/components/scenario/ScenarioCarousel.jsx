import "@/styles/carousel.css";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import ScenarioCard from "./ScenarioCard";

export default function ScenarioCarousel({ 
  scenarios, 
  onToggleFavorite,
  onRatingChange
}) {
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
          <CarouselItem key={scenario.id} className="carousel-item-desktop">
            <ScenarioCard 
              scenario={scenario} 
              layout="carousel-desktop" 
              onToggleFavorite={onToggleFavorite}
              onRatingChange={onRatingChange} 
              priority={index === 0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="carousel-arrow" />
      <CarouselNext className="carousel-arrow" />
    </Carousel>
  );
}

export function ScenarioTabletCarousel({ scenarios, onToggleFavorite, onRatingChange }) {
  return (
    <div className="overflow-x-auto scrollbar-hide px-6"> 
      <div className="flex gap-6 pb-6"> 
        {scenarios.map((scenario) => (
          <ScenarioCard 
            key={scenario.id}
            scenario={scenario} 
            layout="carousel-tablet"
            onToggleFavorite={onToggleFavorite}
            onRatingChange={onRatingChange}
            priority={true}
          />
        ))}
      </div>
    </div>
  );
}
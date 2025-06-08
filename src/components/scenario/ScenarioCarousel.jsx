import "@/styles/carousel.css";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import ScenarioCard from "./ScenarioCard";

export default function ScenarioCarousel({ 
  scenarios, 
  isFavorite, 
  onToggleFavorite,
  getUserRating, 
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
              layout="tablet"
              isFavorite={isFavorite(scenario.id)}
              onToggleFavorite={onToggleFavorite}
              getUserRating={getUserRating}
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
import "@/styles/carousel.css";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import ScenarioCard from "./ScenarioCard";

export default function ScenarioCarousel({ 
  scenarios, 
  onToggleFavorite,
  onRatingChange
}) {
  return (
    <div className="w-full overflow-hidden relative px-2">
      <Carousel 
        opts={{ 
          loop: true,
          align: "center",
          slidesToScroll: 1
        }} 
        className="carousel-container"
      >
        <CarouselContent className="py-4">
          {scenarios.map((scenario, index) => (
            <CarouselItem key={scenario.id} className="flex justify-center"> 
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
        <CarouselPrevious className="absolute left-0" />
        <CarouselNext className="absolute right-0" />
      </Carousel>
    </div>
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
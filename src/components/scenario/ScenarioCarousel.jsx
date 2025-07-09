import "@/styles/carousel.css";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import ScenarioCard from "./ScenarioCard";

export default function ScenarioCarousel({ 
  scenarios, 
  onToggleFavorite,
  onRatingChange
}) {
  return (
    <div className="w-full overflow-hidden relative">
      <Carousel 
        opts={{ 
          loop: true,
          align: "center",
          slidesToScroll: 1
        }} 
        className="carousel-container"
      >
        <CarouselContent>
          {scenarios.map((scenario, index) => (
            <CarouselItem key={scenario.id} > 
              {/* <div className="p-2"> Padding pour l'espace entre les cartes */}
                <ScenarioCard 
                  scenario={scenario} 
                  layout="carousel-desktop" 
                  onToggleFavorite={onToggleFavorite}
                  onRatingChange={onRatingChange} 
                  priority={index === 0}
                />
              {/* </div> */}
            </CarouselItem>
          ))}
        </CarouselContent>
          <CarouselPrevious >
          </CarouselPrevious>
        
        {/* <div className="absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md"> */}
          <CarouselNext>
          </CarouselNext>
        {/* </div> */}
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
"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import arrow from "@/../public/icons/angle-circle-down.svg";
import { useEmblaCarousel } from "@/hooks/useEmblaCarousel";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  onSelect,
  ...props
}) {
  const {
    emblaRef,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    handleKeyDown,
  } = useEmblaCarousel({
    opts,
    orientation,
    setApi,
    onSelect,
  });
  
  return (
    <CarouselContext.Provider
      value={{
        carouselRef: emblaRef,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={emblaRef}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }) {
  const { orientation } = useCarousel();
  
  return (
    <div
      data-slot="carousel-content"
      className={cn(
        "carousel-content", // ✅ Utilise le CSS
        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        className
      )}
      {...props} 
    />
  );
}

function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();
  
  return (
    <div
      data-slot="carousel-item"
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "px-4" : "pt-4", 
        "h-full", 
        className
      )}
      {...props} 
    />
  );
}

function CarouselPrevious({ className, ...props }) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  
  return (
    <button
      data-slot="carousel-previous"
      className={cn(
        "carousel-arrow", // ✅ Base commune
        orientation === "horizontal" 
          ? "carousel-arrow-prev"      // ✅ Position horizontale
          : "carousel-arrow-vertical-prev", // ✅ Position verticale
        !canScrollPrev && "carousel-arrow-disabled", // ✅ État désactivé
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <Image
        src={arrow}
        alt="Previous"
        className={cn(
          "carousel-arrow-icon rotate-90", // ✅ Style commun
        )}
      />
      <span className="sr-only">Previous slide</span>
    </button>
  );
}

function CarouselNext({ className, ...props }) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  
  return (
    <button
      data-slot="carousel-next"
      className={cn(
        "carousel-arrow", // ✅ Base commune
        orientation === "horizontal" 
          ? "carousel-arrow-next"      // ✅ Position horizontale
          : "carousel-arrow-vertical-next", // ✅ Position verticale
        !canScrollNext && "carousel-arrow-disabled", // ✅ État désactivé
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <Image
        src={arrow}
        alt="Next"
        className="carousel-arrow-icon -rotate-90" // ✅ Style commun
      />
      <span className="sr-only">Next slide</span>
    </button>
  );
}

export { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext,
  useCarousel 
};

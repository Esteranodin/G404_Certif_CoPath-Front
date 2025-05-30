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
        "flex",
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
        "absolute size-12 rounded-full bg-white shadow-md flex items-center justify-center",
        orientation === "horizontal"
          ? "top-1/2 -translate-y-1/2 left-2 md:left-4" 
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        !canScrollPrev && "opacity-50 cursor-not-allowed",
        "z-10", 
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <Image
        src={arrow}
        alt="Previous"
        width={24}
        height={24}
        className="rotate-90"
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
        "absolute size-12 rounded-full bg-white shadow-md flex items-center justify-center",
        orientation === "horizontal"
          ? "top-1/2 -translate-y-1/2 right-2 md:right-4" 
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        !canScrollNext && "opacity-50 cursor-not-allowed",
        "z-10", 
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <Image
        src={arrow}
        alt="Next"
        width={24}
        height={24}
        className="-rotate-90"
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

import { useCallback, useEffect, useState } from "react";
import useEmblaCarouselLib from "embla-carousel-react";

export function useEmblaCarousel({
  opts,
  orientation = "horizontal",
  setApi,
  onSelect: onSelectProp,
}) {
  const [emblaRef, emblaApi] = useEmblaCarouselLib({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  
  const onSelect = useCallback((api) => {
    if (!api) return;
    
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    
    onSelectProp?.(api);
  }, [onSelectProp]);
  
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);
  
  const handleKeyDown = useCallback((event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  }, [scrollPrev, scrollNext]);
  
  // Synchroniser l'API externe
  useEffect(() => {
    if (!emblaApi || !setApi) return;
    setApi(emblaApi);
  }, [emblaApi, setApi]);
  
  // Configurer les événements
  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);
  
  return {
    emblaRef,
    emblaApi,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    handleKeyDown,
  };
}
"use client";

import { useState } from "react";
import { handleApiError } from "@/lib/utils/errorHandling";
import Image from "next/image";

export function CardRating({
  globalRating,
  userRating = null,
  onRatingChange,
  layout = "default",
  showUserRating = false,
  className,
  maxRating = 5,
  disabled = false,
  ...props
}) {
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = async (rating) => {
    if (disabled || isSubmitting || !onRatingChange) return;

    setIsSubmitting(true);
    try {
      await onRatingChange(rating);
    } catch (error) {
      handleApiError(error, 'Erreur lors de la notation du scénario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarHover = (rating) => {
    if (!disabled && !isSubmitting) {
      setHoverRating(rating);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const getStarSrc = (starIndex) => {
    const starRating = starIndex + 1;
    const isHovered = starRating <= hoverRating;
    const isActive = starRating <= (userRating || 0);
    
    if (isHovered && hoverRating > 0) {
      return "/icons/sparkles-green.svg";
    } else if (isActive && !hoverRating) {
      return "/icons/sparkles-gold.svg";
    }
    return "/icons/sparkles-black.svg";
  };

  return (
    <div className={`${className}`} {...props}>
      <div className={`
        font-bold mb-2 flex
        ${layout === "tablet" 
          ? "text-2xl justify-start"
          : "text-2xl justify-end"    
        }
      `}>
       
        <span className="text-[color:var(--dark-green)]">
          {Math.ceil(globalRating).toString().charAt(0)}&nbsp;
        </span>
        <span className="text-[color:var(--dark)]">
          {Math.ceil(globalRating).toString().slice(1)}/ 5
        </span>
      </div>
      
      {showUserRating && (
        <div className="border-t-2 border-[color:var(--dark-green)] pt-3">
          <div className="flex items-center justify-between">
            <span className={` font-bold text-[color:var(--dark)]`}>
              Ma note :
            </span>
            
            <div
              className="flex items-center gap-1 ml-2"
              onMouseLeave={handleMouseLeave}
            >
              {Array.from({ length: maxRating }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleStarClick(i + 1)}
                  onMouseEnter={() => handleStarHover(i + 1)}
                  disabled={disabled || isSubmitting}
                  className={`
                    transition-all duration-200 transform
                    ${disabled || isSubmitting 
                      ? 'cursor-not-allowed opacity-50' 
                      : 'cursor-pointer hover:scale-110'
                    }
                  `}
                  title={`Mettre ${i + 1} étoile${i + 1 > 1 ? 's' : ''}`}
                >
                  <Image
                    src={getStarSrc(i)}
                    alt={`étoile ${i + 1}`}
                    width={layout === "tablet" ? 32 : 28} 
                    height={layout === "tablet" ? 32 : 28}
                    className="transition-all duration-200"
                  />
                </button>
              ))}

              {isSubmitting && (
                <span className="ml-2 text-xs text-[color:var(--grey)] animate-pulse">
                    En cours...
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
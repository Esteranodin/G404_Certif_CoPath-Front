import * as React from "react";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";

export function CardRating({
  rating = 5,
  maxRating = 5,
  layout = "default",
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-rating"
      className={cn(
        "flex items-center space-x-1",
        layout === "tablet" && "md:mt-2",
        className
      )}
      {...props}
    >
      {Array.from({ length: maxRating }).map((_, i) => (
        <Image
          key={i}
          src={i < rating ? "/icons/sparkles-gold.svg" : "/icons/sparkles-black.svg"}
          alt="étoile pour notation"
          width={layout === "tablet" ? 25 : 20}
          height={layout === "tablet" ? 25 : 20}
        />
      ))}
    </div>
  );
}
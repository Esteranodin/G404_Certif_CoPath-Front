import { combineLayoutStyles } from "@/lib/layouts/layoutUtils";
import { cardRatingVariants } from "@/lib/layouts/layoutVariants";
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
      className={combineLayoutStyles(cardRatingVariants, { layout, className })}
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
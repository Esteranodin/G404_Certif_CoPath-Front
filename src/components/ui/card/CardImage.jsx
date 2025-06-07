import Image from "next/image";
import { combineLayoutStyles } from "@/lib/layouts/layoutUtils";
import { cardImageVariants } from "@/lib/layouts/layoutVariants";


export function CardImage({
  src,
  alt = "Card image",
  className,
  layout = "default",
  priority = false,
  ...props
}) {
  return (
    <div
      data-slot="card-image"
      className={combineLayoutStyles(cardImageVariants, { layout, className })}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority} 
        sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
        className="object-cover"
      />
    </div>
  );
}
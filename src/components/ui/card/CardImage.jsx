import Image from "next/image";
import { combineLayoutStyles } from "@/lib/utils/layoutUtils";
import { cardImageVariants } from "@/lib/utils/layoutVariants";


export function CardImage({
  src,
  alt = "Card image",
  className,
  layout = "default",
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
        className="object-cover"
      />
    </div>
  );
}
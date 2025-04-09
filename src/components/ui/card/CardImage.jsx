import * as React from "react";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";

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
      className={cn(
        "card-image",
        // Format tablette
        layout === "tablet" && "md:w-[45%] md:h-[300px] md:float-left md:mr-4 md:rounded-t-sm",

        // Format desktop
        layout === "horizontal" && "lg:w-1/3 lg:h-full lg:rounded-l-xl lg:rounded-tr-none",

        className
      )}
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
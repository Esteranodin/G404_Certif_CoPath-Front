import * as React from "react";
import { cn } from "@/lib/utils/utils";

export function CardTitle({
  className,
  layout = "default",
  ...props
}) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-playfair text-xl font-semibold",
        layout === "tablet" && "md:text-2xl",
        className
      )}
      {...props} 
    />
  );
}
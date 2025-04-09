import * as React from "react";
import { cn } from "@/lib/utils/utils";

export function Card({
  className,
  hover = true,
  layout = "default", // 'default', 'horizontal', 'tablet'
  ...props
}) {
  return (
    <div
      data-slot="card"
      className={cn(
        "card",
        // Format tablette 
        layout === "tablet" && "md:w-[70%] lg:w-[60%] md:mx-auto md:flex md:flex-col md:h-[80vh] md:max-h-[80vh]",

        // Format desktop
        layout === "horizontal" && "lg:flex lg:flex-row lg:h-64",

        // Autres styles
        hover && "hover:shadow-lg transition-shadow duration-300",
        className
      )}
      {...props} 
    />
  );
}
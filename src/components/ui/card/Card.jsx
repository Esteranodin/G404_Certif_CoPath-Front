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

export function CardDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} 
    />
  );
}

export function CardAction({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props} 
    />
  );
}


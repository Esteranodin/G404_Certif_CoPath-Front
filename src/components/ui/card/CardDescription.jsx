import * as React from "react";
import { cn } from "@/lib/utils/utils";

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
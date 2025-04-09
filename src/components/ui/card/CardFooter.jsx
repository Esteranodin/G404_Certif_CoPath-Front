import * as React from "react";
import { cn } from "@/lib/utils/utils";

export function CardFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props} 
    />
  );
}
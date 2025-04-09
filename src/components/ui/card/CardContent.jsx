import * as React from "react";
import { cn } from "@/lib/utils/utils";

export function CardContent({
  className,
  layout = "default",
  ...props
}) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-6",
        layout === "tablet" && "clear-both mt-4 pt-2 border-t border-gray-200 md:max-h-[calc(75vh-350px)] md:overflow-y-auto",
        className
      )}
      {...props}
    />
  );
}
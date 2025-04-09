import * as React from "react";
import { cn } from "@/lib/utils/utils";

export function CardTabletContent({
  className,
  children,
  ...props
}) {
  return (
    <div
      data-slot="card-tablet-content"
      className={cn(
        "md:w-[55%] md:flex md:flex-col md:justify-between md:h-[300px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
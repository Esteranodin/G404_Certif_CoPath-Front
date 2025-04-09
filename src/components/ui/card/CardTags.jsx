import * as React from "react";
import { cn } from "@/lib/utils/utils";

export function CardTags({
  tags = [],
  layout = "default",
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-tags"
      className={cn(
        "flex flex-wrap gap-2",
        layout === "tablet" && "md:mt-auto",
        className
      )}
      {...props}
    >
      {tags.map((tag, index) => (
        <span key={index} className="card-tag">
          {tag}
        </span>
      ))}
    </div>
  );
}
import * as React from "react"

import { cn } from "@/lib/utils/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "",
        className
      )}
      {...props} />
  );
}

export { Input }

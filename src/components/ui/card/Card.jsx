import { combineLayoutStyles } from "@/lib/layouts/layoutUtils";
import { cardVariants, cardTitleVariants, cardDescriptionVariants } from "@/lib/layouts/layoutVariants";

export function Card({
  className,
  hover = true,
  layout = "default", 
  ...props
}) {
  return (
    <div
      data-slot="card"
      className={combineLayoutStyles(cardVariants, { hover, layout, className })}
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
      className={combineLayoutStyles(cardTitleVariants, { layout, className })}
      {...props} 
    />
  );
}

export function CardDescription({
  className,
  layout = "default",
  ...props
}) {
  return (
      <div
          data-slot="card-content"
          className={combineLayoutStyles(cardDescriptionVariants, { layout, className })}
          {...props}
      />
  );
}



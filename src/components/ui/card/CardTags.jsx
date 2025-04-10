import { combineLayoutStyles } from "@/lib/utils/layoutUtils";
import { cardTagsVariants } from "@/lib/utils/layoutVariants";

export function CardTags({
  tags = [],
  layout = "default",
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-tags"
      className={combineLayoutStyles(cardTagsVariants, { layout, className })}
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
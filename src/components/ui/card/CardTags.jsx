import Link from "next/link";
import { combineLayoutStyles } from "@/lib/layouts/layoutUtils";
import { cardTagsVariants } from "@/lib/layouts/layoutVariants";

export function CardTags({
  tags = [],
  layout = "default",
  className,
  ...props
}) {
  if (!tags.length) return null;

  return (
    <div
      data-slot="card-tags"
      className={combineLayoutStyles(cardTagsVariants, { layout, className })}
      {...props}
    >
      {tags.map((tag, index) => (
        <Link
          key={index}
          href={`/campaign/${encodeURIComponent(tag)}`}
          className="card-tags"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
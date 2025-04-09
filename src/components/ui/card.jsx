import * as React from "react"
import { cn } from "@/lib/utils/utils"
import Image from "next/image"

function Card({
  className,
  hover = true,
  layout = "default", // 'default', 'horizontal', 'tablet'
  ...props
}) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Styles pour tous les formats
        "bg-white text-card-foreground rounded-xl border border-gray-300",
        "shadow-[rgba(53,96,90,0.55)_-4px_5px_5.5px_0px]", 
        
        // Format mobile (default)
        "mx-auto w-[80%]",
        
        // Format tablette - ajusté pour le carousel pleine page
        layout === "tablet" && "md:w-[70%] lg:w-[60%] md:mx-auto md:flex md:flex-col md:h-[80vh] md:max-h-[80vh]",
        
        // Format desktop
        layout === "horizontal" && "lg:flex lg:flex-row lg:h-64",
        
        // Autres styles
        hover && "hover:shadow-lg transition-shadow duration-300",
        className
      )}
      {...props} />
  );
}

function CardImage({
  src,
  alt = "Card image",
  className,
  layout = "default",  
  ...props
}) {
  return (
    <div
      data-slot="card-image"
      className={cn(
        // Format mobile
        "relative w-full h-48 overflow-hidden rounded-t-xl",
        
        // Format tablette - augmentons la hauteur
        layout === "tablet" && "md:w-[45%] md:h-[300px] md:float-left md:mr-4",
        
        // Format desktop
        layout === "horizontal" && "lg:w-1/3 lg:h-full lg:rounded-l-xl lg:rounded-tr-none",
        
        className
      )}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}

function CardTabletContent({ 
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


function CardContent({
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

function CardHeader({
  className,
  isFavorite = true,
  layout = "default",
  ...props
}) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        // Format commun
        "flex justify-between items-start gap-4 px-6",
        
        // Format tablette
        layout === "tablet" && "md:px-2 md:pt-2",
        
        className
      )}
      {...props}>
      {props.children}
      {isFavorite && (
        <div className={cn(
          "flex-shrink-0",
          layout === "tablet" && "md:absolute md:right-4 md:top-1/2"
        )}>
          <Image
            src="/icons/heart.svg"
            alt="Add to favorites"
            width={24}
            height={24}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
      )}
    </div>
  );
}

function CardTitle({
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
      {...props} />
  );
}

function CardTags({
  tags = [],
  className,
  layout = "default",
  ...props
}) {
  return (
    <div
      data-slot="card-tags"
      className={cn(
        "flex flex-wrap gap-2 mb-4",
        layout === "tablet" && "md:mb-2",
        className
      )}
      {...props}
    >
      {tags.map((tag, index) => (
        <span
          key={index}
          className={cn(
            "text-xs px-2 py-1 rounded-full",
            layout === "tablet" 
              ? "bg-dark-green text-white cursor-pointer hover:bg-opacity-90"
              : "bg-lavender text-dark-green"
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function CardDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />
  );
}

function CardAction({
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
      {...props} />
  );
}

function CardFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props} />
  );
}

function CardRating({
  rating = 5,
  className,
  layout = "default",
  ...props
}) {
  return (
    <div
      data-slot="card-rating"
      className={cn(
        "flex items-center gap-1",
        layout === "default" && "self-end",
        layout === "tablet" && "md:self-start md:w-full md:mt-auto",
        className
      )}
      {...props}
    >
      {[...Array(rating)].map((_, i) => (
        <Image
          key={i}
          src="/icons/sparkles.svg"
          alt="étoile pour notation"
          width={layout === "tablet" ? 20 : 16}
          height={layout === "tablet" ? 20 : 16}
        />
      ))}
    </div>
  );
}

export {
  Card,
  CardImage,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardTags,
  CardRating,
  CardTabletContent,
}

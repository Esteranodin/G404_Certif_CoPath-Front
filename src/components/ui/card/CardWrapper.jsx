import { cn } from "@/lib/utils/utils";
import Image from "next/image";

export function CardHeader({
    className,
    isFavorite = false,
    onToggleFavorite = () => { },
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
            <div
                className={cn(
                    "flex-shrink-0",
                    layout === "tablet" && "md:absolute md:right-4 md:top-1/2"
                )}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                }}
            >
                <Image
                    src={isFavorite ? "/icons/heart.svg" : "/icons/circle-heart.svg"}
                    alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    width={24}
                    height={24}
                    className={cn(
                        "cursor-pointer hover:scale-110 transition-transform"
                    )}
                />
            </div>
        </div>
    );
}

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
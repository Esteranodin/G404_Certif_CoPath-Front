import { cn } from "@/lib/utils/utils";
import Image from "next/image";

export function CardHeader({
    className,
    layout = "default",
    isFavorite = false,
    onToggleFavorite = () => { },
    showFavorite = true,
    isLoading = false,
    ...props
}) {
    const getFavoriteTooltip = () => {
        if (isLoading) return "Chargement...";
        return isFavorite
            ? "Retirer de mes favoris"
            : "Ajouter à mes favoris";
    };

    return (
        <div
            data-slot="card-header"
            className={cn(
                "flex justify-between items-start gap-4 px-6",
                layout === "tablet" && "md:px-2 md:pt-2",
                layout === "carousel-desktop" && "px-2 py-2",
                className
            )}
            {...props}>
            {props.children}
            {showFavorite && (
                <div
                    className={cn(
                        "flex-shrink-0",
                        layout === "tablet" && "md:absolute md:right-4 md:top-1/2",
                        isLoading && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!isLoading) {
                            onToggleFavorite();
                        }
                    }}
                    title={getFavoriteTooltip()}
                >
                    {isLoading ? (
                        <div
                            className="w-6 h-6 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"
                            title="Mise à jour des favoris..."
                        ></div>
                    ) : (
                        <Image
                            src={isFavorite ? "/icons/heart.svg" : "/icons/circle-heart.svg"}
                            alt={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                            width={24}
                            height={24}
                            className={cn(
                                "cursor-pointer hover:scale-110 transition-transform"
                            )}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export function CardTabletContent({
    className,
    layout = "default",
    children,
    ...props
}) {
    return (
        <div
            data-slot="card-tablet-content"
            className={cn(
                "md:w-[55%] md:flex md:flex-col md:justify-between md:h-[300px]",
                layout === "carousel-desktop" && "w-[55%] flex flex-col justify-between h-[280px]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

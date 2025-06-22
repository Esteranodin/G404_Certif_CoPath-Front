"use client";

import "@/styles/card.css";
import { memo, useState, useCallback } from "react";
import {
  Card,
  CardImage,
  CardHeader,
  CardTitle,
  CardDescription,
  CardTags,
  CardTabletContent,
  CardRating,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { handleApiError } from "@/lib/utils/errorHandling";
import { LOG_MESSAGES } from '@/lib/config/messages';

const ScenarioCard = memo(function ScenarioCard({
  scenario,
  onToggleFavorite, 
  onRatingChange,
  layout = "default", 
  priority = false   
}) {
  const { user, isClient } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { isFavorite, userRating } = scenario;
  const showUserRating = isClient && user;

  const handleRatingChange = async (newRating) => {
    if (!onRatingChange) return;
    await onRatingChange(scenario.id, newRating);
  };

  const handleToggleFavorite = useCallback(async () => {
    if (!isClient || !user) {
      return alert("Veuillez vous connecter pour ajouter aux favoris.");
    }

    if (!onToggleFavorite) return;

    setIsLoading(true);
    try {
      await onToggleFavorite(scenario.id);
    } catch (error) {
      console.error(LOG_MESSAGES.DEBUG.FAVORITE_ERROR, error);
      handleApiError(error, 'Erreur lors de la mise à jour des favoris');
    } finally {
      setIsLoading(false);
    }
  }, [isClient, user, onToggleFavorite, scenario.id]);

  const showFavoriteButton = isClient && !!user;

  if (layout === "tablet" || layout === "carousel-tablet") {
    return (
      <Card layout={layout} className="p-4">
        <div className="relative flex">
          <CardImage
            src={scenario.image}
            alt={`Couverture du scénario ${scenario.title}`}
            layout="carousel-tablet" // ← FORCER carousel-tablet
            priority={priority}
          />
          <CardTabletContent layout="carousel-tablet"> {/* ← FORCER */}
            <CardHeader
              layout="carousel-tablet" // ← FORCER
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              showFavorite={showFavoriteButton}
              isLoading={isLoading}
            >
              <CardTitle layout="carousel-tablet">{scenario.title}</CardTitle> {/* ← FORCER */}
            </CardHeader>
            <CardTags
              tags={scenario.tags || []}
              layout="carousel-tablet" // ← FORCER
            />

            <CardRating
              globalRating={scenario.rating}
              userRating={userRating}
              onRatingChange={handleRatingChange}
              showUserRating={showUserRating}
              layout="carousel-tablet" // ← FORCER
              className="mt-2"
            />
          </CardTabletContent>
        </div>
        <CardDescription layout="carousel-tablet"> {/* ← FORCER */}
          <p>{scenario.content}</p>
        </CardDescription>
      </Card>
    );
  }

  // 🆕 AJOUTER LE LAYOUT CAROUSEL-DESKTOP
  if (layout === "carousel-desktop") {
    return (
      <Card layout={layout} className="p-2"> {/* Plus compact que p-4 */}
        <CardImage
          src={scenario.image}
          alt={`Couverture du scénario ${scenario.title}`}
          layout="carousel-desktop"
          priority={priority}
        />
        <CardHeader
          layout="carousel-desktop" // ← Utilise px-2 py-2
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          showFavorite={showFavoriteButton}
          isLoading={isLoading}
        >
          <CardTitle layout="carousel-desktop">{scenario.title}</CardTitle> {/* text-lg */}
        </CardHeader>
        <CardTags
          tags={scenario.tags || []}
          layout="carousel-desktop" // ← Utilise px-2 my-1
        />
        <CardDescription layout="carousel-desktop"> {/* max-h-[120px] overflow */}
          <p>{scenario.content}</p>
        </CardDescription>

        <CardRating
          globalRating={scenario.rating}
          userRating={userRating}
          onRatingChange={handleRatingChange}
          showUserRating={showUserRating}
          layout="carousel-desktop" // ← text-lg + étoiles 24px
          className="mt-2" // ← SANS px-6 pb-4 ! Utilise ratingAreaVariants
        />
      </Card>
    );
  }

  // Layout mobile par défaut
  return (
    <Card className="mb-8">
      <CardImage
        src={scenario.image}
        alt={`Couverture du scénario ${scenario.title}`}
        priority={priority}
      />
      <CardHeader
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        showFavorite={showFavoriteButton}
        isLoading={isLoading}
      >
        <CardTitle>{scenario.title}</CardTitle>
      </CardHeader>
      <CardTags
        tags={scenario.tags || []}
        className="px-6 my-2"
      />
      <CardDescription>
        <p>{scenario.content}</p>
      </CardDescription>

      <CardRating
        globalRating={scenario.rating}
        userRating={userRating}
        onRatingChange={handleRatingChange}
        showUserRating={showUserRating}
        layout={layout}
        className="px-6 pb-4 mt-2"
      />
    </Card>
  );
});

export default ScenarioCard;
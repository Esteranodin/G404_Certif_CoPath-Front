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

const ScenarioCard = memo(function ScenarioCard({
  scenario,
  onToggleFavorite, 
  onRatingChange,
  layout = "default", 
  priority = false   
}) {
  const { user, isClient } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { isFavorite, userRating, image, imageAlt, rating } = scenario;
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
      console.error('Erreur favoris:', error);
      handleApiError(error, 'Erreur lors de la mise à jour des favoris');
    } finally {
      setIsLoading(false);
    }
  }, [isClient, user, onToggleFavorite, scenario.id]);

  const showFavoriteButton = isClient && !!user;

  if (layout === "tablet") {
    return (
      <Card layout="tablet" className="p-4">
        <div className="relative flex">
          <CardImage
            src={scenario.image}
            alt={`Couverture du scénario ${scenario.title}`}
            layout="tablet"
            priority={priority}
          />
          <CardTabletContent>
            <CardHeader
              layout="tablet"
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              showFavorite={showFavoriteButton}
              isLoading={isLoading}
            >
              <CardTitle layout="tablet">{scenario.title}</CardTitle>
            </CardHeader>
            <CardTags
              tags={scenario.tags || []}
              layout="tablet"
            />

            <CardRating
              globalRating={scenario.rating}
              userRating={userRating}
              onRatingChange={handleRatingChange}
              showUserRating={showUserRating}
              layout="tablet"
              className="mt-2"
            />
          </CardTabletContent>
        </div>
        <CardDescription layout="tablet">
          <p>{scenario.content}</p>
        </CardDescription>
      </Card>
    );
  }

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
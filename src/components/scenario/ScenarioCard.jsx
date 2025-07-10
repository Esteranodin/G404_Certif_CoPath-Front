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
import { Button } from "../ui/button";
import Link from "next/link";

const ScenarioCard = memo(function ScenarioCard({
  scenario,
  onToggleFavorite,
  onRatingChange,
  layout = "default",
  priority = false
}) {

  // console.log(scenario);
  const { user, isClient } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = scenario.isFavorite;
  const userRating = scenario.userRating;
  const showUserRating = isClient && user;
  const showFavoriteButton = isClient && !!user;

  const handleRatingChange = useCallback(async (newRating) => {
    if (!onRatingChange) return;
    await onRatingChange(scenario.id, newRating);
  }, [onRatingChange, scenario.id]);

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

  if (layout === "tablet" || layout === "carousel-tablet") {
    return (
      <Card layout={layout} className="p-4">
        <div className="relative flex">
          <CardImage
            src={scenario.image}
            alt={`Couverture du scénario ${scenario.title}`}
            layout="carousel-tablet"
            priority={priority}
          />
          <CardTabletContent layout="carousel-tablet">
            <CardHeader
              layout="carousel-tablet"
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              showFavorite={showFavoriteButton}
              isLoading={isLoading}
            >
              <CardTitle layout="carousel-tablet">{scenario.title}</CardTitle>
            </CardHeader>
            <CardTags
              tags={scenario.campaigns ? scenario.campaigns.map(c => c.name) : []}
            />

            <CardRating
              globalRating={scenario.rating}
              userRating={userRating}
              onRatingChange={handleRatingChange}
              showUserRating={showUserRating}
              layout="carousel-tablet"
              className="mt-2"
            />
          </CardTabletContent>
        </div>
        <CardDescription layout="carousel-tablet">
          <p>{scenario.content}</p>
        </CardDescription>
         <Link href={`/scenario/${scenario.id}`}>
        <Button variant="secondary" size="sm" className="card-link w-full mt-2">
          Voir plus
        </Button>
      </Link>
      </Card>
    );
  }

  if (layout === "carousel-desktop") {
    return (
      <Card layout={layout} className="p-2">
        <CardImage
          src={scenario.image}
          alt={`Couverture du scénario ${scenario.title}`}
          layout="carousel-desktop"
          priority={priority}
        />
        <CardHeader
          layout="carousel-desktop"
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          showFavorite={showFavoriteButton}
          isLoading={isLoading}
        >
          <CardTitle layout="carousel-desktop">{scenario.title}</CardTitle>
        </CardHeader>
        <CardTags
          tags={scenario.campaigns ? scenario.campaigns.map(c => c.name) : []}
        />
        <CardDescription layout="carousel-desktop">
          <p>{scenario.content}</p>
        </CardDescription>
         <Link href={`/scenario/${scenario.id}`}>
        <Button variant="secondary" size="sm" className="card-link w-full mt-2">
          Voir plus
        </Button>
      </Link>
        <CardRating
          globalRating={scenario.rating}
          userRating={userRating}
          onRatingChange={handleRatingChange}
          showUserRating={showUserRating}
          layout="carousel-desktop"
          className="mt-2"
        />
      </Card>
    );
  }

  // Layout mobile = par défaut
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
        tags={scenario.campaigns ? scenario.campaigns.map(c => c.name) : []}
      />
      <CardDescription>
        <p>{scenario.content}</p>
      </CardDescription>
       <Link href={`/scenario/${scenario.id}`}>
        <Button variant="secondary" size="sm" className="card-link w-full mt-2">
          Voir plus
        </Button>
      </Link>
  
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

export default memo(ScenarioCard, (prevProps, nextProps) => {
  return (
    prevProps.scenario.id === nextProps.scenario.id &&
    prevProps.scenario.isFavorite === nextProps.scenario.isFavorite &&
    prevProps.scenario.userRating === nextProps.scenario.userRating &&
    prevProps.layout === nextProps.layout &&
    prevProps.priority === nextProps.priority
  );
});
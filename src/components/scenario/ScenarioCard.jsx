"use client";
import "@/styles/card.css";
import { Card, CardImage, CardHeader, CardTitle, CardDescription, CardTags, CardRating, CardFooter, CardTabletContent } from "@/components/ui/card";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { handleApiError } from "@/lib/utils/errorHandling";

export default function ScenarioCard({ scenario, layout = "default" }) {
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);

  const scenarioIsFavorite = isFavorite(scenario.id);

  const handleToggleFavorite = async () => {
    if (!user) {
      return alert("Veuillez vous connecter pour ajouter aux favoris.");
    }

    setIsLoading(true);
 
    try {
      if (scenarioIsFavorite) {
        await removeFavorite(scenario.id); 
      } else {
        await addFavorite(scenario.id);
      }
    } catch (error) {
      console.error('Erreur favoris:', error);
      handleApiError(error, 'Erreur lors de la mise à jour des favoris');
    } finally {
      setIsLoading(false);
    }
  };

  if (layout === "tablet") {
    return (
      <Card layout="tablet" className="p-4">
        <div className="relative flex ">
          <CardImage
            src={scenario.image}
            alt={`Couverture du scénario ${scenario.title}`}
            layout="tablet"
          />
          <CardTabletContent>
            <CardHeader
              layout="tablet"
              isFavorite={scenarioIsFavorite}
              onToggleFavorite={handleToggleFavorite}
              showFavorite={!!user}
            >
              <CardTitle layout="tablet">{scenario.title}</CardTitle>
            </CardHeader>
            <CardTags
              tags={scenario.tags || []}
              layout="tablet"
            />
            <CardRating
              rating={scenario.rating}
              layout="tablet"
            />
          </CardTabletContent>
        </div>
        <CardDescription layout="tablet">
          <p>{scenario.content}</p>
        </CardDescription>
      </Card>
    );
  }

  // Version mobile par défaut
  return (
    <Card className="mb-8">
      <CardImage
        src={scenario.image}
        alt={`Couverture du scénario ${scenario.title}`}
      />
      <CardHeader
        isFavorite={scenarioIsFavorite}
        onToggleFavorite={handleToggleFavorite}
        showFavorite={!!user}
      >
        <CardTitle>{scenario.title}</CardTitle>
      </CardHeader>
      <CardTags
        tags={scenario.tags || []}
        className="px-6 my-2"
      />
      <CardDescription className="px-6 py-2">
        <p>{scenario.content}</p>
      </CardDescription>
      <CardFooter className="justify-end">
        <CardRating className="my-4" rating={scenario.rating} />
      </CardFooter>
    </Card>
  );
}
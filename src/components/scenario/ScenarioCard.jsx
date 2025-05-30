"use client";
import "@/styles/card.css";
import { Card, CardImage, CardHeader, CardTitle, CardDescription, CardTags, CardRating, CardFooter, CardTabletContent } from "@/components/ui/card";
import { useState } from "react";

export default function ScenarioCard({ scenario, layout = "default" }) {
  const [isFavorite, setIsFavorite] = useState(scenario.isFavorite || false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // appeler API ici pour mettre à jour le statut favoris
  }

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
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}>
              <CardTitle layout="tablet">{scenario.title}</CardTitle>
            </CardHeader>
            <CardTags
              tags={scenario.tags}
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
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}>
        <CardTitle>{scenario.title}</CardTitle>
      </CardHeader>
      <CardTags
        tags={scenario.tags}
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
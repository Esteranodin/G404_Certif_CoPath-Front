"use client";

import { useState } from "react";
import { CardsSkeleton } from "@/components/ui/skeleton";
import ScenarioCard from "./ScenarioCard";

export default function ScenarioList({
  scenarios,
  isFavorite,
  onToggleFavorite,
  getUserRating,
  onRatingChange
}) {
  const [isLoading, setIsLoading] = useState(!scenarios);

  if (isLoading) {
    return <CardsSkeleton count={6} layout="default" />;
  }

  return (
    <>
      {scenarios.map((scenario, index) => (
        <ScenarioCard
          key={scenario.id}
          scenario={scenario}
          isFavorite={isFavorite(scenario.id)}
          onToggleFavorite={onToggleFavorite}
          getUserRating={getUserRating}
          onRatingChange={onRatingChange}
          priority={index === 0}
        />
      ))}
    </>
  );
}
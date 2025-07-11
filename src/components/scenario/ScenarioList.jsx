"use client";

import { useState } from "react";
import { CardsSkeleton } from "@/components/ui/skeleton";
import ScenarioCard from "./ScenarioCard";

export default function ScenarioList({
  scenarios,
  onToggleFavorite,
  onRatingChange
}) {
  const [isLoading] = useState(!scenarios);

  if (isLoading) {
    return <CardsSkeleton count={6} layout="default" />;
  }

  return (
    <>
      {scenarios.map((scenario, index) => (
        <ScenarioCard
          key={scenario.id}
          scenario={scenario}
          onToggleFavorite={onToggleFavorite}
          onRatingChange={onRatingChange}
          layout="default"
          priority={index === 0}
        />
      ))}
    </>
  );
}
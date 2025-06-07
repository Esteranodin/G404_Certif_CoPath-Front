"use client";

import { useState, useEffect } from "react";
import { CardsSkeleton } from "@/components/ui/skeleton";
import ScenarioCard from "./ScenarioCard";

export default function ScenarioList({ scenarios, isFavorite, onToggleFavorite }) {
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
          priority={index === 0}
        />
      ))}
    </>
  );
}
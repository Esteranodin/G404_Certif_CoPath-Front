"use client";

import { useState, useEffect } from "react";
import { CardsSkeleton } from "@/components/ui/skeleton";
import ScenarioCard from "./ScenarioCard";

export default function ScenarioList({ scenarios }) {
  // const [scenarios, setScenarios] = useState(initialScenarios);
  const [isLoading, setIsLoading] = useState(!scenarios);

  // useEffect(() => {
  //   // Si nous avons déjà les scénarios, ne pas charger
  //   if (initialScenarios) return;

  //   const fetchScenarios = async () => {
  //     setIsLoading(true);
  //     try {
  //       // Remplacer par votre appel API réel
  //       const response = await fetch(`/api/scenarios?category=${categoryId}`);
  //       const data = await response.json();
  //       setScenarios(data);
  //     } catch (error) {
  //       console.error("Erreur lors du chargement des scénarios:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchScenarios();
  // }, [categoryId, initialScenarios]);

  if (isLoading) {
    return <CardsSkeleton count={6} layout="default" />;
  }

  return (
    <>
      {scenarios.map((scenario) => (
        <ScenarioCard key={scenario.id} scenario={scenario} />
      ))}
    </>
  );
}
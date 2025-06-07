"use client";

import { useMemo } from "react";
import ScenarioList from "@/components/scenario/ScenarioList";
import ScenarioCarousel from "@/components/scenario/ScenarioCarousel";
import DataStateHandler from "@/components/ui/DataStateHandler";
import { useApiData } from "@/hooks/useApiData";
import { useFavorites } from "@/hooks/useFavorites";
import { scenarioService } from "@/lib/services/scenarioService";
import { adaptScenarioForDisplay } from "@/lib/adapters/scenarioAdapter";

export default function PublicHome() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  const { data: rawScenarios, loading, error, refetch } = useApiData(
    () => scenarioService.getAll()
  );

  const scenarios = useMemo(() => {
    if (!rawScenarios?.length) return [];
    
    return rawScenarios.map(scenario => 
      adaptScenarioForDisplay(scenario, favorites)
    );
  }, [rawScenarios, favorites]);

  return (
    <DataStateHandler
      loading={loading}
      error={error}
      data={scenarios}
      onRetry={refetch}
      loadingMessage="Chargement des scénarios..."
      emptyMessage="Aucun scénario disponible pour le moment."
    >
      <section className="md:hidden">
        <ScenarioList 
          scenarios={scenarios} 
          isFavorite={isFavorite} 
          onToggleFavorite={toggleFavorite} 
        />
      </section>

      <section className="hidden md:block">
        <ScenarioCarousel 
          scenarios={scenarios} 
          isFavorite={isFavorite} 
          onToggleFavorite={toggleFavorite} 
        />
      </section>
    </DataStateHandler>
  );
}
"use client";

import { useMemo } from "react";
import ScenarioList from "@/components/scenario/ScenarioList";
import ScenarioCarousel from "@/components/scenario/ScenarioCarousel";
import DataStateHandler from "@/components/ui/DataStateHandler";
import { useFavorites } from "@/hooks/useFavorites";
import { useUserRatings } from "@/hooks/useUserRatings";
import { useScenarioSearch } from "@/hooks/useScenarioSearch"; 

export default function PublicHome() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { getUserRating, setUserRating } = useUserRatings();

  const {
    scenarios,
    isLoading: loading,
    error,
    handleSearch,
  } = useScenarioSearch();

 
  return (
    <DataStateHandler
      loading={loading}
      error={error}
      data={scenarios}
      loadingMessage="Chargement des scénarios..."
      emptyMessage="Aucun scénario disponible pour le moment."
    >
      <section className="md:hidden">
        <ScenarioList
          scenarios={scenarios}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          getUserRating={getUserRating}
          onRatingChange={setUserRating}
        />
      </section>

      <section className="hidden md:block">
        <ScenarioCarousel
          scenarios={scenarios}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          getUserRating={getUserRating}
          onRatingChange={setUserRating}
        />
      </section>
    </DataStateHandler>
  );
}
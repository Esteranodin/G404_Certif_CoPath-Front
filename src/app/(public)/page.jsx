"use client";

import ScenarioList from "@/components/scenario/ScenarioList";
import ScenarioCarousel, { ScenarioTabletCarousel } from "@/components/scenario/ScenarioCarousel";
import DataStateHandler from "@/components/ui/DataStateHandler";
import { useFavorites } from "@/context/FavoritesContext";
import { useUserRatings } from "@/context/UserRatingsContext";
import { useScenarioSearch } from "@/hooks/useScenarioSearch";
import { adaptScenariosForDisplay } from "@/lib/adapters/scenarioAdapter";

export default function PublicHome() {
  const { favorites, toggleFavorite } = useFavorites();
  const { userRatings, setUserRating } = useUserRatings();

  const {
    scenarios,
    isLoading: loading,
    error,
    handleSearch,
  } = useScenarioSearch();

  const adaptedScenarios = adaptScenariosForDisplay(scenarios, favorites, userRatings);

  return (
    <DataStateHandler
      loading={loading}
      error={error}
      data={scenarios}
      loadingMessage="Chargement des scénarios..."
      emptyMessage="Aucun scénario disponible pour le moment."
    >
      {/*  MOBILE  < 768px */}
      <section className="md:hidden">
        <ScenarioList
          scenarios={adaptedScenarios}
          onToggleFavorite={toggleFavorite}
          onRatingChange={setUserRating}
        />
      </section>

      {/* TABLETTE  768px à 1279px */}
      <section className="hidden md:block xl:hidden">
        <ScenarioTabletCarousel
          scenarios={adaptedScenarios}
          onToggleFavorite={toggleFavorite}
          onRatingChange={setUserRating}
        />
      </section>

      {/* DESKTOP - 1280px+ */}
      <section className="hidden xl:block"> 
        <ScenarioCarousel
          scenarios={adaptedScenarios}
          onToggleFavorite={toggleFavorite}
          onRatingChange={setUserRating}
        />
      </section>
    </DataStateHandler>
  );
}
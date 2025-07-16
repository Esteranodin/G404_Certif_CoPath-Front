"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { useUserRatings } from "@/context/UserRatingsContext";
import { useEffect, useState } from "react";
import ScenarioList from "@/components/scenario/ScenarioList";
import ScenarioCarousel, { ScenarioTabletCarousel } from "@/components/scenario/ScenarioCarousel";
import DataStateHandler from "@/components/ui/DataStateHandler";
import { adaptScenariosForDisplay } from "@/lib/adapters/scenarioAdapter";
import scenarioService from "@/lib/services/scenarioService";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { userRatings, setUserRating } = useUserRatings();
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteScenarios = async () => {
      if (!favorites.length) {
        setScenarios([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const favoriteScenarioIds = favorites.map(fav => fav.scenarioId);
        const scenariosData = await Promise.all(
          favoriteScenarioIds.map(id => scenarioService.getById(id))
        );
        setScenarios(scenariosData);
      } catch (err) {
        setError("Erreur lors du chargement des scénarios favoris");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteScenarios();
  }, [favorites]);

  const adaptedScenarios = adaptScenariosForDisplay(scenarios, favorites, userRatings);

  return (
    <DataStateHandler
      loading={loading}
      error={error}
      data={scenarios}
      loadingMessage="Chargement de vos favoris..."
      emptyMessage="Vous n'avez pas encore de favoris."
    > 
       
      {/* MOBILE */}
      <section className="md:hidden">
        <ScenarioList
          scenarios={adaptedScenarios}
          onToggleFavorite={toggleFavorite}
          onRatingChange={setUserRating}
        />
      </section>
      
      {/* TABLETTE */}
      <section className="hidden md:block xl:hidden">
        <ScenarioTabletCarousel
          scenarios={adaptedScenarios}
          onToggleFavorite={toggleFavorite}
          onRatingChange={setUserRating}
        />
      </section>
      
      {/* DESKTOP */}
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
"use client";

import { useParams } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { useUserRatings } from "@/context/UserRatingsContext";
import { useEffect, useState } from "react";
import scenarioService from "@/lib/services/scenarioService";
import { adaptScenariosForDisplay } from "@/lib/adapters/scenarioAdapter";
import ScenarioList from "@/components/scenario/ScenarioList";
import ScenarioCarousel, { ScenarioTabletCarousel } from "@/components/scenario/ScenarioCarousel";
import DataStateHandler from "@/components/ui/DataStateHandler";

export default function CampaignPage() {
  const { name } = useParams();
  const { favorites, toggleFavorite } = useFavorites();
  const { userRatings, setUserRating } = useUserRatings();
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    scenarioService.getByCampaign(encodeURIComponent(name))
      .then(setScenarios)
      .catch(() => setError("Erreur lors du chargement des scénarios"))
      .finally(() => setLoading(false));
  }, [name]);

  const adaptedScenarios = adaptScenariosForDisplay(scenarios, favorites, userRatings);

  return (
    <DataStateHandler
      loading={loading}
      error={error}
      data={scenarios}
      loadingMessage="Chargement des scénarios de la campagne..."
      emptyMessage="Aucun scénario pour cette campagne."
    >
      <h1 className="text-2xl font-bold mb-4">Campagne : {decodeURIComponent(name)}</h1>
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
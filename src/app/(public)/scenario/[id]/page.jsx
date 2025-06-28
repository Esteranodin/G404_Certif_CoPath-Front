"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import scenarioService from "@/lib/services/scenarioService";
import ScenarioCard from "@/components/scenario/ScenarioCard";
import DataStateHandler from "@/components/ui/DataStateHandler";
import { useFavorites } from "@/context/FavoritesContext";
import { useUserRatings } from "@/context/UserRatingsContext";
import { adaptScenariosForDisplay } from "@/lib/adapters/scenarioAdapter";

export default function ScenarioDetailPage() {
  const { id } = useParams();
  const { favorites, toggleFavorite } = useFavorites();
  const { userRatings, setUserRating } = useUserRatings();
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    scenarioService
      .getById(id)
      .then(setScenario)
      .catch(() => setError("Erreur lors du chargement du scénario"))
      .finally(() => setLoading(false));
  }, [id]);

  // On adapte le scénario pour enrichir avec favoris et note utilisateur
  const [adaptedScenario] = adaptScenariosForDisplay(
    scenario ? [scenario] : [],
    favorites,
    userRatings
  );

  return (
    <DataStateHandler
      loading={loading}
      error={error}
      data={scenario}
      loadingMessage="Chargement du scénario..."
      emptyMessage="Scénario introuvable."
    >
      <h1 className="text-2xl font-bold mb-4">
        {adaptedScenario?.title || "Détail du scénario"}
      </h1>
      {adaptedScenario && (
        <ScenarioCard
          scenario={adaptedScenario}
          layout="default"
          onToggleFavorite={toggleFavorite}
          onRatingChange={setUserRating}
        />
      )}
    </DataStateHandler>
  );
}

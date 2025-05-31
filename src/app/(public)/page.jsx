"use client";

import ScenarioList from "@/components/scenario/ScenarioList";
import ScenarioCarousel from "@/components/scenario/ScenarioCarousel";
import DataStateHandler from "@/components/ui/DataStateHandler";
import { useApiData } from "@/hooks/useApiData";
import { scenarioService } from "@/lib/services/scenarioService";
import { adaptScenarioForDisplay } from "@/lib/adapters/scenarioAdapter";
export default function PublicHome() {
  const { data: rawScenarios, loading, error, refetch } = useApiData(
    () => scenarioService.getAll()
  );

  const scenarios = rawScenarios.map(adaptScenarioForDisplay);

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
        <ScenarioList scenarios={scenarios} />
      </section>
      
      <section className="hidden md:block">
        <ScenarioCarousel scenarios={scenarios} />
      </section>
    </DataStateHandler>
  );
}
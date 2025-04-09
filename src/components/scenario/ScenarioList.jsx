"use client";
import ScenarioCard from "./ScenarioCard";

export default function ScenarioList({ scenarios }) {
  return (
    <div>
      {scenarios.map((scenario) => (
        <ScenarioCard key={scenario.id} scenario={scenario} />
      ))}
    </div>
  );
}
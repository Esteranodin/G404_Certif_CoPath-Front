import ScenarioCard from "./ScenarioCard";

export default function ScenarioList({ scenarios }) {
  return (
    <>
      {scenarios.map((scenario) => (
        <ScenarioCard key={scenario.id} scenario={scenario} />
      ))}
    </>
  );
}
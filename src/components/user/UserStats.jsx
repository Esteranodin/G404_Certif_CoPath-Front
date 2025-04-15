import { Card, CardDescription } from "@/components/ui/card";

export function UserStats({ user }) {
  const stats = [
    { label: "Parties jouées", value: user.gamesPlayed || 0 },
    { label: "Personnages", value: user.characters || 0 },
    { label: "Univers explorés", value: user.universes || 0 }
  ];

  return (
    <Card className="w-full">
      <CardDescription className="p-4">
        <h3 className="text-lg font-semibold mb-2">Statistiques</h3>
        <div className="space-y-2">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-between">
              <span>{stat.label}</span>
              <span className="font-semibold">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardDescription>
    </Card>
  );
}
"use client";
import { 
  Card, 
  CardImage, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardTags, 
  CardRating, 
  CardFooter,
  CardTabletContent
} from "@/components/ui/card";

export default function ScenarioCard({ scenario, layout = "default" }) {
  // Layout peut être "default" ou "tablet"
  
  if (layout === "tablet") {
    return (
      <Card layout="tablet" className="p-4">
        <div className="relative flex md:mb-4">
          <CardImage
            src={scenario.image}
            alt={`Couverture du scénario ${scenario.title}`}
            layout="tablet"
          />
          <CardTabletContent>
            <CardHeader layout="tablet">
              <CardTitle layout="tablet">{scenario.title}</CardTitle>
            </CardHeader>
            <CardTags
              tags={scenario.tags}
              layout="tablet"
              className="mt-2"
            />
            <CardRating 
              rating={scenario.rating} 
              layout="tablet" 
              className="mt-auto" 
            />
          </CardTabletContent>
        </div>
        <CardContent layout="tablet">
          <p>{scenario.content}</p>
        </CardContent>
      </Card>
    );
  }
  
  // Version mobile par défaut
  return (
    <Card className="mb-8">
      <CardImage
        src={scenario.image}
        alt={`Couverture du scénario ${scenario.title}`}
      />
      <CardHeader>
        <CardTitle>{scenario.title}</CardTitle>
      </CardHeader>
      <CardTags
        tags={scenario.tags}
        className="px-6"
      />
      <CardContent>
        <p>{scenario.content}</p>
      </CardContent>
      <CardFooter className="justify-end">
        <CardRating rating={scenario.rating} />
      </CardFooter>
    </Card>
  );
}
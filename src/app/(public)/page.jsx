"use client";
import { Card, CardImage, CardHeader, CardTitle, CardContent, CardTags, CardRating, CardFooter, CardTabletContent} from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext} from "@/components/ui/carousel";

const scenarios = [
  {
    id: 1,
    title: "Les Sorcières et les Fleurs de la Discorde",
    image: "/img/couv1.png",
    tags: ["Magie", "Sorcières", "Comédie"],
    content: "Une aventure centrée sur les Sorcières d'Unseen University, mais avec une touche de chaos propre à Discworld. Les personnages doivent enquêter sur une mystérieuse fleur capable de manipuler les émotions et le comportement des gens dans un village où les habitants sont de plus en plus… irrationnels.",
    rating: 5
  },
  {
    id: 2,
    title: "L'Ordre des Frères Frivoles",
    image: "/img/couv2.png",
    tags: ["Confrérie", "Mystère", "Satire"],
    content: "Un groupe de moines se trouve au cœur d'une aventure étrange, où ils doivent résoudre une série de disparitions mystérieuses dans un temple secret. Ils découvrent un complot qui met en lumière les absurdités de la religion et de l'autorité dans un monde où rien n'est ce qu'il semble. Les joueurs devront naviguer entre rites absurdes et enquêtes décalées.",
    rating: 3
  },
  {
    id: 3,
    title: "Les Sorcières et les Fleurs de la Discorde",
    image: "/img/couv3.png",
    tags: ["Paranormal", "Intrigue", "Exploration"],
    content: " Lorsqu'un cimetière à Ankh-Morpork commence à révéler des secrets sur les morts à travers des rumeurs et des voix murmurées, les aventuriers sont envoyés pour résoudre le mystère. Mais entre les fantômes sarcastiques, les nécromanciens indisciplinés et les journalistes qui se battent pour la meilleure histoire, il faudra faire preuve de ruse pour démêler la vérité.",
    rating: 5
  },

];

export default function PublicHome() {
  return (
    <main className="container mx-auto px-4 py-8">
      
      {/* Version mobile uniquement */}
      <div className="md:hidden">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} className="mb-8">
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
        ))}
      </div>
      
      {/* Version tablette et desktop */}
      <div className="hidden md:block">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {scenarios.map((scenario) => (
                <CarouselItem key={scenario.id}>
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
    </main>
  );
}
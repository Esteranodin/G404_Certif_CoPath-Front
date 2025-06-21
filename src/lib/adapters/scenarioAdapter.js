/**
 * Adapter pour transformer les données API en format attendu par front
 */
export const adaptScenarioForDisplay = (scenario, userFavorites = []) => {
 
  const baseUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

  const isFavorite = userFavorites.some(fav => 
    fav.scenario?.id === scenario.id || 
    fav.scenario === `/api/scenarios/${scenario.id}`
  );

  const firstImage = scenario.images && scenario.images.length > 0 ? scenario.images[0] : null;

  const adaptedScenario = {
    id: scenario.id,
    title: scenario.title,
    content: scenario.content,
    image: firstImage
      ? `${baseUrl}${firstImage.path}`
      : '/img/default-scenario.png',
    imageAlt: firstImage?.alt || scenario.title || 'Image du scénario',
    rating: Math.round(scenario.averageRating || 0),
    tags: scenario.tags || [],
    ratingsCount: scenario.ratingsCount || 0,
    favoritesCount: scenario.favoritesCount || 0,
    isFavorite: isFavorite,
    createdAt: scenario.createdAt,
    updatedAt: scenario.updatedAt,
    campaigns: scenario.campaigns || []
  };

  return adaptedScenario;
};
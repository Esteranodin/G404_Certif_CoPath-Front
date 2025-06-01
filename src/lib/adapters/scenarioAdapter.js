/**
 * Adapter pour transformer les données API en format attendu par front
 */
export const adaptScenarioForDisplay = (scenario, userFavorites = []) => {
  const baseUrl = process.env.NEXT_PUBLIC_ASSETS_URL || 'http://localhost:8000';

  const isFavorite = userFavorites.some(fav => 
    fav.scenario?.id === scenario.id || 
    fav.scenario === `/api/scenarios/${scenario.id}`
  );

  return {
    id: scenario.id,
    title: scenario.title,
    content: scenario.content,
    image: scenario.img && scenario.img.length > 0
      ? `${baseUrl}${scenario.img[0].imgPath}`
      : '/images/default-scenario.jpg',
    rating: Math.round(scenario.averageRating || 0),
    tags: scenario.tags || [],
    ratingsCount: scenario.ratingsCount || 0,
    favoritesCount: scenario.favoritesCount || 0,
    isFavorite: isFavorite,
    createdAt: scenario.createdAt,
    updatedAt: scenario.updatedAt,
    campaigns: scenario.campaign || []
  };
};
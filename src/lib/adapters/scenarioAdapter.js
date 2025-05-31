/**
 * Adapter pour transformer les données API en format attendu par front
 */
export const adaptScenarioForDisplay = (scenario) => {
  const baseUrl = process.env.NEXT_PUBLIC_ASSETS_URL || 'http://localhost:8000';
  return {
    id: scenario.id,
    title: scenario.title,
    content: scenario.content,

    image: scenario.img && scenario.img.length > 0
      ? `${baseUrl}${scenario.img[0].imgPath}`
      : null,

    tags: scenario.tags || [],
    rating: scenario.rating || 0,
    isFavorite: scenario.isFavorite || false,
    createdAt: scenario.createdAt,
    updatedAt: scenario.updatedAt,
    campaign: scenario.campaign
  };
};
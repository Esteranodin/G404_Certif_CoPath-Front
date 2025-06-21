import { favoriteService } from '@/lib/services/favoriteService';
import { userRatingService } from '@/lib/services/userRatingService';

/**
 * Adapte UNIQUEMENT pour l'affichage/GET => données déjà normalisées par services
 */
export const adaptScenarioForDisplay = (scenario, userFavorites = [], userRatings = []) => {
  const baseUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

  const isFavorite = favoriteService.isFavoriteByScenarioId(userFavorites, scenario.id);
  const userRating = userRatingService.findByScenarioId(userRatings, scenario.id);

  const firstImage = scenario.images?.[0];

  return {
    ...scenario,
    
    image: firstImage 
      ? `${baseUrl}${firstImage.path}`
      : '/img/default-scenario.png',
    imageAlt: firstImage?.alt || scenario.title || 'Image de couverture du scénario',
    
    rating: Math.round(scenario.averageRating || 0),
    userRating: userRating?.score || null,
    
    isFavorite,
    
    tags: scenario.tags || [],
    campaigns: scenario.campaigns || [],
    ratingsCount: scenario.ratingsCount || 0,
    favoritesCount: scenario.favoritesCount || 0
  };
};

/**
 * Adapter pour une liste de scénarios
 */
export const adaptScenariosForDisplay = (scenarios = [], userFavorites = [], userRatings = []) => {
  return scenarios.map(scenario => 
    adaptScenarioForDisplay(scenario, userFavorites, userRatings)
  );
};
/**
 * Export centralisé de tous les services API
 * @module services
 */

import authService from './authService';           
import campaignService from './campaignService';   
import favoriteService from './favoriteService';   
import imageService from './imageService';         
import scenarioService from './scenarioService';  
import userRatingService from './userRatingService'; 
import userService from './userService'; 

export { 
  authService,
  campaignService,
  favoriteService,
  imageService,        
  scenarioService,
  userRatingService,   
  userService          
};

// Export groupé pour faciliter l'importation
export const apiServices = {
  auth: authService,
  campaigns: campaignService,
  favorites: favoriteService,
  images: imageService,     
  scenarios: scenarioService,
  userRatings: userRatingService, 
  users: userService        
};

export default apiServices;

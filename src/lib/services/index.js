/**
 * Export centralisé de tous les services API
 * @module services
 */

import campaignService from './campaignService';
import scenarioService from './scenarioService';
import imgScenarioService from './imgScenarioService';
import UserService from './userService';
import favoriteService from './favoriteService';

// Exports individuels
export { 
  campaignService, 
  scenarioService, 
  imgScenarioService, 
  UserService, 
  favoriteService 
};

// Export groupé pour faciliter l'importation
export const apiServices = {
  campaigns: campaignService,
  scenarios: scenarioService,
  imgScenarios: imgScenarioService,
  users: UserService,
  favorites: favoriteService,
};

/**
 * Export centralisé de tous les services API
 * @module services
 */

export { default as campaignService } from './campaignService';
export { default as scenarioService } from './scenarioService';
export { default as imgScenarioService } from './imgScenarioService';
export { default as UserService } from './userService';

// Export groupé pour faciliter l'importation
export const apiServices = {
  campaigns: campaignService,
  scenarios: scenarioService,
  imgScenarios: imgScenarioService,
  users: UserService,
};

// Export individuel
export {
  campaignService,
  scenarioService, 
  imgScenarioService,
  UserService
};
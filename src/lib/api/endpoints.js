export const API_ENDPOINTS = {
  // Authentification
  AUTH: {
    LOGIN: '/login_check',
    REGISTER: '/register', 
    ME: '/me',
  },

  CAMPAIGNS: '/campaigns',
  SCENARIOS: '/scenarios', 
  MUSIC: '/music',
  IMG_SCENARIOS: '/img_scenarios',

  // Endpoints composés 
  CAMPAIGN_SCENARIOS: (campaignId) => `/campaigns/${campaignId}/scenarios`,
};
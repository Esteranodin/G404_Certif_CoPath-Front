export const API_ENDPOINTS = {

  AUTH: {
    LOGIN: '/login_check',
    REGISTER: '/register',
    ME: '/me',
    CHANGE_PASSWORD: '/me/password',
  },

  SCENARIOS: {
    SEARCH: '/scenarios/search',
    LIST: '/scenarios',
    DETAIL: (id) => `/scenarios/${id}`,
    CREATE: '/scenarios',
    UPDATE: (id) => `/scenarios/${id}`,
    DELETE: (id) => `/scenarios/${id}`,
  },

  CAMPAIGNS: '/campaigns',
  MUSIC: '/music',
  IMG_SCENARIOS: '/img_scenarios',
  FAVORITES: '/favorites',

  // Endpoints composés 
  CAMPAIGN_SCENARIOS: (campaignId) => `/campaigns/${campaignId}/scenarios`,
};
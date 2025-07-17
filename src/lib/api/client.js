/**
 * Client API Axios 
 * @module apiClient
 * @description Configuration du client HTTP avec intercepteurs pour l'authentification
 * @requires axios
 * @requires tokenStorage
 */

import axios from 'axios';
import { getToken, clearToken } from '@/lib/storage/tokenStorage';
import { LOG_MESSAGES } from '@/lib/config/messages';

const createApiClient = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Config. base axios
  const client = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    },
    timeout: 10000,
  });

  const DEBUG_API = process.env.NODE_ENV === 'development' && false; // Mettre true pour activer mode debbug

  // Intercepteur pour les requêtes
  client.interceptors.request.use(
    (config) => {
      if (DEBUG_API) {
        console.log(`🔄 ${config.method?.toUpperCase()} ${config.url}`);
      }

      // Vérifier qu'on est bien côté client
      if (typeof window === 'undefined') return config;

      // Ajouter le token d'authentification
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);  
    }
  );

  client.interceptors.response.use(
    (response) => {
      if (DEBUG_API) {
        console.log(`✅ ${response.status} ${response.config.url}`);
      }
      return response;
    },
    (error) => {
      // En cas d'erreur 401, nettoyer le token & rediriger vers la page de connexion

      if (typeof window !== 'undefined' && error.response?.status === 401) {
        clearToken();
        // Géré par authService.logout() dans la plupart des cas, mais si l'erreur vient d'ailleurs, il faut gérer la déconnexion
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/login')) {
          window.location.href = '/login';
        }
      }
      if (DEBUG_API) {  
        console.error(LOG_MESSAGES.DEBUG.API_ERROR, error);
      }
      return Promise.reject(error);  
    }
  );

  return client;
};

const apiClient = createApiClient();

export default apiClient;
/**
 * Client API Axios configuré
 * @module apiClient
 * @description Configuration du client HTTP avec intercepteurs pour l'authentification
 * @requires axios
 * @requires tokenStorage
 */

import axios from 'axios';
import { getToken, clearToken } from '@/lib/storage/tokenStorage';

const createApiClient = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Configuration de base pour axios
  const client = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    },
    timeout: 10000,
  });

  // Intercepteur pour les requêtes
  client.interceptors.request.use(
    (config) => {
      // Log pour debug (à enlever en production)
      console.log(`🔄 ${config.method?.toUpperCase()} ${config.url}`);

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
      console.error('❌ Erreur dans la requête:', error);
      return Promise.reject(error);
    }
  );

  // Intercepteur pour les réponses
  client.interceptors.response.use(
    (response) => {
      // Log pour debug (à enlever en production)
      console.log(`✅ ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      // En cas d'erreur 401, nettoyer le token & rediriger vers la page de connexion

      if (typeof window !== 'undefined' && error.response?.status === 401) {
        clearToken();
        // Géré par authService.logout() dans la plupart des cas, mais si l'erreur vient d'ailleurs, on doit aussi gérer la déconnexion
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/login')) {
          console.log('🔄 Redirection vers /login');
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
};

const apiClient = createApiClient();

export default apiClient;
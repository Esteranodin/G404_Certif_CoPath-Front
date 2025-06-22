/**
 * Service de gestion de l'authentification
 * @module authService
 * @description Fournit les fonctionnalités de connexion, inscription et gestion de session
 * @requires apiClient
 * @requires API_ENDPOINTS
 * @requires tokenStorage
 */

import apiClient from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { setToken, clearToken, getToken } from "@/lib/storage/tokenStorage";
import { LOG_MESSAGES, ERROR_MESSAGES } from '@/lib/config/messages';

class AuthService {
  /**
   * @param {string} email 
   * @param {string} password
   * @returns {Promise<Object>} 
   */
  async login(email, password) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { username: email, password });
    const { token } = response.data;

    if (!token) {
      throw new Error(ERROR_MESSAGES.AUTH.MISSING_TOKEN);
    }

    setToken(token);
    const userData = await this.getCurrentUser();

    if (!userData) {
      if (process.env.NODE_ENV === 'development') {
        console.error(LOG_MESSAGES.AUTH.MISSING_USER_AFTER_LOGIN);
      }
      throw new Error(ERROR_MESSAGES.AUTH.MISSING_USER_DATA);
    }

    return userData;
  }

  /**
   * Inscription utilisateur
   * @param {Object} userData 
   * @returns {Promise<Object>} - Réponse API
   */
  async register(userData) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  }

  /**
   * Déconnexion utilisateur 
   */
  logout() {
    clearToken();
    return true;
  }

  /**
   * Récupérer l'utilisateur courant
   * @returns {Promise<Object|null>}
   */
  async getCurrentUser() {
    const token = getToken();
    if (!token) return null;

    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
      const userData = response.data.user || response.data;

      if (!userData) {
        throw new Error(ERROR_MESSAGES.AUTH.INVALID_USER_DATA_FORMAT);
      }

      return userData;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(LOG_MESSAGES.AUTH.GET_USER_ERROR, error);
      }
      clearToken();
      return null;
    }
  }
}

export default new AuthService();
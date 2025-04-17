import apiClient from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { setToken, clearToken, getToken } from "@/lib/utils/tokenStorage";
import { LOG_MESSAGES } from '@/lib/config/messages';

class AuthService {
  /**
   * Connexion utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe de l'utilisateur
   * @returns {Promise<Object>} - Données utilisateur
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
   * @param {Object} userData - Données d'inscription
   * @returns {Promise<Object>} - Réponse de l'API
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
   * @returns {Promise<Object|null>} - Données utilisateur ou null
   */
  async getCurrentUser() {
    const token = getToken();
    // Ne pas faire l'appel si pas de token
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
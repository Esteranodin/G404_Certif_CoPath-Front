import apiClient from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { setToken, clearToken, getToken } from "@/lib/utils/tokenStorage";

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
      throw new Error("Token manquant dans la réponse");
    }
    
    setToken(token);
    const userData = await this.getCurrentUser();
    
    if (!userData) {
      console.error("authService - Données utilisateur manquantes après getCurrentUser");
      throw new Error("Impossible de récupérer les données utilisateur");
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
  async logout() {
    try {
      // Appel API pour invalider le token côté serveur (si applicable)
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      // Toujours supprimer le token localement
      clearToken();
    }
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
        throw new Error("Format de réponse inattendu dans getCurrentUser");
      }
      
      return userData;
    } catch (error) {
      console.error("authService - Erreur récupération user", error);
      clearToken();
      return null;
    }
  }
}

export default new AuthService();
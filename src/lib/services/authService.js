import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const AuthService = {
  /**
   * Inscription d'un nouvel utilisateur
   * @param {Object} userData - données de l'utilisateur
   */
  register: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur d'inscription" };
    }
  },

  /**
   * Connexion d'un utilisateur
   * @param {string} email - adresse email
   * @param {string} password - mot de passe
   */
  login: async (email, password) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
        username: email,
        password,
      });

      // Stocke le token JWT dans le localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur de connexion" };
    }
  },

  /**
   * Déconnexion de l'utilisateur
   */
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated: () => {
    if (typeof window === 'undefined') {
      return false;
    }
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      return true;
    } catch (error) {
      console.error("Erreur de validation du token:", error);
      localStorage.removeItem('token');
      return false;
    }
  },

  /**
   * Récupère les informations de l'utilisateur actuel
   */
  getCurrentUser: async () => {
    try {
      // Vérifier si le token existe vraiment avant d'envoyer la requête
      if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
        throw new Error('Token non trouvé');
      }

      const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
      return response.data;

    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur:", error);
      // Si erreur 401, nettoyer le localStorage
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
      }
      throw error;
    }
  },
};

export default AuthService;
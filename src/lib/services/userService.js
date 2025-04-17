/**
 * Service de gestion des utilisateurs
 * @module userService
 * @description Fournit les méthodes pour gérer le profil et les mots de passe utilisateur
 * @requires apiClient
 */

import apiClient from '@/lib/api/client';

export const UserService = {
  /**
   * Mettre à jour le profil de l'utilisateur
   * @param {Object} userData - Données à mettre à jour
   */
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur de mise à jour du profil" };
    }
  },

  /**
   * Changer le mot de passe de l'utilisateur
   * @param {Object} passwordData - Ancien et nouveau mot de passe
   */
  changePassword: async (passwordData) => {
    try {
      const response = await apiClient.put('/users/password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur de changement de mot de passe" };
    }
  }
};

export default UserService;
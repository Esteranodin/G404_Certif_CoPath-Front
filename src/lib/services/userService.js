/**
 * Service de gestion des utilisateurs
 * @module userService
 * @description Fournit les méthodes pour gérer le profil et les mots de passe utilisateur
 * @requires apiClient
 */

import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints'; 
import { handleApiError, handleProfileError, handlePasswordError } from '@/lib/utils/errorHandling';

export const UserService = {
  /**
   * Récupérer tous les utilisateurs
   */
  getAll: async () => {
    try {
      const response = await apiClient.get('/users');
      return response.data.member || response.data['hydra:member'] || response.data;
    } catch (error) {
      handleApiError(error, 'Erreur lors de la récupération des utilisateurs');
      throw error;
    }
  },

  /**
   * Récupérer un utilisateur par ID
   */
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error, `Erreur lors de la récupération de l'utilisateur ${id}`);
      throw error;
    }
  },

  /**
   * Mettre à jour le profil utilisateur
   */
  updateProfile: async (userData) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.AUTH.ME, userData, {
        headers: {
          'Content-Type': 'application/merge-patch+json'
        }
      });
      return response.data;
    } catch (error) {
      handleProfileError(error);
      throw error;
    }
  },

  /**
   * Changer le mot de passe
   */
  changePassword: async (passwordData) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData, {
        headers: {
          'Content-Type': 'application/merge-patch+json'
        }
      });
      return response.data;
    } catch (error) {
      handlePasswordError(error);
      throw error;
    }
  }
};

export default UserService;
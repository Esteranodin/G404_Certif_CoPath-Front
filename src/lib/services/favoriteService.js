/**
 * Service de gestion des favoris
 * @module favoriteService
 */

import apiClient from '@/lib/api/client';
import { handleApiError } from '@/lib/utils/errorHandling';

export const favoriteService = {
  /**
   * Récupérer tous les favoris de l'utilisateur connecté
   */
  getAll: async () => {
    try {
      const response = await apiClient.get('/favorites');
      return response.data['hydra:member'] || response.data.member || response.data;
    } catch (error) {
      handleApiError(error, 'Erreur lors du chargement des favoris');
      throw error;
    }
  },

  /**
   * Récupérer un favori par ID
   */
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/favorites/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error, `Erreur lors du chargement du favori ${id}`);
      throw error;
    }
  },

  /**
   * Ajouter un scénario aux favoris
   */
  addFavorite: async (scenarioId) => {
    try {
      const response = await apiClient.post('/favorites', {
        scenario: `/api/scenarios/${scenarioId}`
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Erreur lors de l\'ajout aux favoris');
      throw error;
    }
  },


  /**
   * Supprimer un favori basé sur le scénario ID
   */
  removeFavoriteByScenario: async (scenarioId) => {
    try {
      const favorites = await favoriteService.getAll();

      const userFavorite = favorites.find(
        fav => fav.scenario?.id === scenarioId || 
               fav.scenario === `/api/scenarios/${scenarioId}`
      );

      if (!userFavorite) {
        throw new Error('Favori non trouvé');
      }

      await apiClient.delete(`/favorites/${userFavorite.id}`);
      return true;
      
    } catch (error) {
      handleApiError(error, 'Erreur lors de la suppression du favori');
      throw error;
    }
  },

};

export default favoriteService;
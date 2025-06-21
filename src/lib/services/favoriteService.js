/**
 * Service de gestion des favoris
 * @module favoriteService
 */

import apiClient from '@/lib/api/client';
import { handleApiError } from '@/lib/utils/errorHandling';
import { apiTransforms } from '@/lib/utils/apiTransforms';

export const favoriteService = {
  /**
   * Récupérer tous les favoris de l'utilisateur connecté
   */
  getAll: async () => {
    try {
      const response = await apiClient.get('/favorites');
      const data = response.data['hydra:member'] || response.data.member || response.data;
      
      return data.map(apiTransforms.normalizeFavorite);
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
      return apiTransforms.normalizeFavorite(response.data);
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
        scenario: apiTransforms.toIRI('scenarios', scenarioId) 
      });
      
      return apiTransforms.normalizeFavorite(response.data);
    } catch (error) {
      console.error('❌ Erreur complète:', error.response?.data);
      console.error('❌ Status:', error.response?.status);
      console.error('❌ Headers response:', error.response?.headers);
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

      const userFavorite = favorites.find(fav => fav.scenarioId === String(scenarioId));

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

  /**
   * Vérifier si un scénario est en favori
   */
  isFavoriteByScenarioId: (favorites, scenarioId) => {
    return favorites.some(fav => fav.scenarioId === String(scenarioId));
  },

  /**
   * Trouver un favori par ID de scénario
   */
  findByScenarioId: (favorites, scenarioId) => {
    return favorites.find(fav => fav.scenarioId === String(scenarioId));
  },
};

export default favoriteService;
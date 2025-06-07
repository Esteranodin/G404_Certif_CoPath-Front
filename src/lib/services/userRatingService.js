/**
 * Service de gestion des notes utilisateur
 * @module userRatingService
 */

import apiClient from '@/lib/api/client';
import { handleApiError } from '@/lib/utils/errorHandling';

export const userRatingService = {
  /**
   * Récupérer toutes les notes de l'utilisateur connecté
   */
 getAll: async () => {
    try {
      const response = await apiClient.get('/ratings');
      const data = response.data;
      
      // ✅ Retournez le bon tableau
      return data.member || data['hydra:member'] || [];
    } catch (error) {
      handleApiError(error, 'Erreur lors du chargement de vos notes');
      throw error;
    }
  },

  /**
   * Récupérer la note d'un scénario par l'utilisateur
   */
  getByScenario: async (scenarioId) => {
    try {
      const response = await apiClient.get(`/ratings?scenario=${scenarioId}`);
      const ratings = response.data['hydra:member'] || response.data.member || response.data;
      return ratings.length > 0 ? ratings[0] : null;
    } catch (error) {
      handleApiError(error, `Erreur lors du chargement de votre note pour le scénario ${scenarioId}`);
      throw error;
    }
  },

  /**
   * Ajouter/Modifier une note
   */
  setRating: async (scenarioId, score) => { 
    try {
      const response = await apiClient.post('/ratings', {
        scenario: `/api/scenarios/${scenarioId}`,
        score: score
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Erreur lors de l\'enregistrement de votre note');
      throw error;
    }
  },

  /**
   * Supprimer une note
   */
  removeRating: async (scenarioId) => {
    try {
      const existingRating = await userRatingService.getByScenario(scenarioId);
      
      if (existingRating) {
        await apiClient.delete(`/ratings/${existingRating.id}`);
        return true;
      }
      
      return false;
    } catch (error) {
      handleApiError(error, 'Erreur lors de la suppression de votre note');
      throw error;
    }
  }
};

export default userRatingService;
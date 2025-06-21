/**
 * Service de gestion des notes utilisateur
 * @module userRatingService
 */

import apiClient from '@/lib/api/client';
import { handleApiError } from '@/lib/utils/errorHandling';
import { apiTransforms } from '@/lib/utils/apiTransforms';

export const userRatingService = {
  /**
   * Récupérer toutes les notes de l'utilisateur connecté
   */
  getAll: async () => {
    try {
      const response = await apiClient.get('/ratings');
      const data = response.data;
      const ratings = data.member || data['hydra:member'] || [];
      
      return ratings.map(apiTransforms.normalizeRating);
    } catch (error) {
      handleApiError(error, 'Erreur lors du chargement de vos notes');
      throw error;
    }
  },

  /**
   * Vérifier si l'utilisateur a déjà noté ce scénario
   */
  getUserRating: async (scenarioId) => {
    try {
      const response = await apiClient.get(`/ratings`);
      const ratings = response.data?.member || response.data?.['hydra:member'] || [];
      
      // Filtrer côté client pour trouver le bon scénario
      const targetRating = ratings.find(rating => {
        const ratingScenarioId = apiTransforms.extractId(rating.scenario);
        return String(ratingScenarioId) === String(scenarioId);
      });
      
      return targetRating ? apiTransforms.normalizeRating(targetRating) : null;
    } catch (error) {
      console.error('❌ Erreur recherche rating:', error.response?.data);
      return null;
    }
  },

  /**
   * Ajouter/Modifier une note
   */
  setRating: async (scenarioId, score) => { 
    try {
      // Vérifier s'il existe déjà un rating
      const existingRating = await userRatingService.getUserRating(scenarioId);
      
      const payload = {
        scenario: apiTransforms.toIRI('scenarios', scenarioId),
        score: score
      };
      
      let response;
      
      if (existingRating && existingRating.id) {
        response = await apiClient.patch(`/ratings/${existingRating.id}`, payload, {
          headers: {
            'Content-Type': 'application/merge-patch+json'
          }
        });
      } else {
        response = await apiClient.post('/ratings', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      
      return apiTransforms.normalizeRating(response.data);
      
    } catch (error) {
      console.error('❌ Erreur rating:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      handleApiError(error, 'Erreur lors de l\'enregistrement de votre note');
      throw error;
    }
  },

  /**
   * Récupérer une note par scénario
   */
  getByScenario: async (scenarioId) => {
    try {
      const response = await apiClient.get(`/ratings?scenario=${scenarioId}`);
      const data = response.data;
      const ratings = data.member || data['hydra:member'] || [];
      
      if (ratings.length > 0) {
        return apiTransforms.normalizeRating(ratings[0]);
      }
      
      return null;
    } catch (error) {
      handleApiError(error, `Erreur lors du chargement de la note pour le scénario ${scenarioId}`);
      throw error;
    }
  },

  /**
   * Supprimer une note
   */
  removeRating: async (scenarioId) => {
    try {
      const userRatings = await userRatingService.getAll();
      const existingRating = userRatings.find(rating => rating.scenarioId === String(scenarioId));
      
      if (!existingRating) {
        throw new Error('Note non trouvée');
      }

      await apiClient.delete(`/ratings/${existingRating.id}`);
      return true;
    } catch (error) {
      handleApiError(error, 'Erreur lors de la suppression de la note');
      throw error;
    }
  },

  /**
   * Trouver une note par ID de scénario
   */
  findByScenarioId: (ratings, scenarioId) => {
    return ratings.find(rating => rating.scenarioId === String(scenarioId));
  },
};

export default userRatingService;
/**
 * Service de gestion des images
 * @module imageService
 */

import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { handleApiError } from '@/lib/utils/errorHandling';
import { apiTransforms } from '@/lib/utils/apiTransforms';

export const imageService = {
  /**
   * Récupérer toutes les images de scénarios
   */
  getAllScenarioImages: async () => { 
    try {
      const response = await apiClient.get(API_ENDPOINTS.IMG_SCENARIOS);
      const data = response.data.member || response.data['hydra:member'] || response.data;
      
      return data;
    } catch (error) {
      handleApiError(error, 'Erreur lors du chargement des images de scénarios');
      throw error;
    }
  },

  /**
   * Récupérer les images d'un scénario spécifique
   */
  getByScenario: async (scenarioId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.IMG_SCENARIOS}?scenario=${scenarioId}`);
      const data = response.data.member || response.data['hydra:member'] || response.data;
      return data;
    } catch (error) {
      handleApiError(error, `Erreur lors du chargement des images du scénario ${scenarioId}`);
      throw error;
    }
  },

  /**
   * Récupérer une image par ID
   */
  getById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.IMG_SCENARIOS}/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error, `Erreur lors du chargement de l'image ${id}`);
      throw error;
    }
  },

  /**
   * Ajouter une nouvelle image
   */
  create: async (data) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.IMG_SCENARIOS, data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Erreur lors de l\'ajout de l\'image');
      throw error;
    }
  },

  /**
   * Mettre à jour une image
   */
  update: async (id, data) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.IMG_SCENARIOS}/${id}`, data);
      return response.data;
    } catch (error) {
      handleApiError(error, `Erreur lors de la mise à jour de l'image ${id}`);
      throw error;
    }
  },

  /**
   * Supprimer une image
   */
  delete: async (id) => {
    try {
      await apiClient.delete(`${API_ENDPOINTS.IMG_SCENARIOS}/${id}`);
      return true;
    } catch (error) {
      handleApiError(error, `Erreur lors de la suppression de l'image ${id}`);
      throw error;
    }
  }
};

export default imageService;
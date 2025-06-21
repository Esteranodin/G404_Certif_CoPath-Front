/**
 * Service de gestion des campagnes
 * @module campaignService
 */

import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { handleApiError } from '@/lib/utils/errorHandling';

export const campaignService = {
  /**
   * Récupérer toutes les campagnes
   */
  getAll: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CAMPAIGNS);
      return response.data.member || response.data;
    } catch (error) {
      handleApiError(error, 'Erreur lors du chargement des campagnes');
      throw error;
    }
  },

  /**
   * Récupérer une campagne par ID
   */
  getById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.CAMPAIGNS}/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error, `Erreur lors du chargement de la campagne ${id}`);
      throw error;
    }
  },

  /**
   * Créer une nouvelle campagne
   */
  create: async (data) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CAMPAIGNS, data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Erreur lors de la création de la campagne');
      throw error;
    }
  },

  /**
   * Mettre à jour une campagne
   */
  update: async (id, data) => {
    const response = await apiClient.put(`${API_ENDPOINTS.CAMPAIGNS}/${id}`, data);
    return response.data;
  },

  /**
   * Supprimer une campagne
   */
  delete: async (id) => {
    await apiClient.delete(`${API_ENDPOINTS.CAMPAIGNS}/${id}`);
    return true;
  },

  /**
   * Ajouter un scénario à une campagne
   */
  addScenario: async (campaignId, scenarioId) => {
    try {
      const response = await apiClient.post(`/campaigns/${campaignId}/scenarios`, {
        scenario: apiTransforms.toIRI('scenarios', scenarioId)
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Erreur lors de l\'ajout du scénario à la campagne');
      throw error;
    }
  },
};

export default campaignService;
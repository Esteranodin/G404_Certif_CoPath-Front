/**
 * Service de gestion des scénarios
 * @module scenarioService
 */

import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { handleApiError } from '@/lib/utils/errorHandling';

export const scenarioService = {
  /**
   * Récupérer tous les scénarios
   */
  getAll: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SCENARIOS);
      return response.data.member || response.data;
    } catch (error) {
      handleApiError(error, 'Erreur lors du chargement des scénarios');
      throw error;
    }
  },

  /**
   * Récupérer un scénario par ID
   */
  getById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SCENARIOS}/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error, `Erreur lors du chargement du scénario ${id}`);
      throw error;
    }
  },

  /**
   * Récupérer les scénarios d'une campagne
   */
  getByCampaign: async (campaignId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.SCENARIOS}?campaign=${campaignId}`);
      return response.data.member || response.data;
    } catch (error) {
      handleApiError(error, `Erreur lors du chargement des scénarios de la campagne ${campaignId}`);
      throw error;
    }
  },

  /**
   * Créer un nouveau scénario
   */
  create: async (data) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.SCENARIOS, data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Erreur lors de la création du scénario');
      throw error;
    }
  },

  /**
   * Mettre à jour un scénario
   */
  update: async (id, data) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.SCENARIOS}/${id}`, data);
      return response.data;
    } catch (error) {
      handleApiError(error, `Erreur lors de la mise à jour du scénario ${id}`);
      throw error;
    }
  },

  /**
   * Supprimer un scénario
   */
  delete: async (id) => {
    try {
      await apiClient.delete(`${API_ENDPOINTS.SCENARIOS}/${id}`);
      return true;
    } catch (error) {
      handleApiError(error, `Erreur lors de la suppression du scénario ${id}`);
      throw error;
    }
  }
};

export default scenarioService;
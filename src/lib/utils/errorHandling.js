import { toast } from 'sonner';

/**
 * Gère les erreurs d'API et affiche un toast approprié
 * @param {Error} error - L'erreur à gérer
 * @param {string} fallbackMessage - Message par défaut si l'erreur n'a pas de message
 * @returns {string} Le message d'erreur
 */
export const handleApiError = (error, fallbackMessage = "Une erreur est survenue") => {
  console.error(error);
  
  // Extraction du message d'erreur selon la structure
  const errorMessage = 
    error?.response?.data?.message || 
    error?.message || 
    fallbackMessage;
  
  // Afficher dans un toast
  toast.error(errorMessage);
  
  return errorMessage;
};

/**
 * Affiche un message de succès
 * @param {string} message - Le message à afficher
 */
export const showSuccess = (message) => {
  toast.success(message);
};
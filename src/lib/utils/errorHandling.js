/**
 * Gestionnaire d'erreurs centralisé
 * @module errorHandling
 * @description Fonctions pour gérer et afficher les erreurs de l'application
 * @requires ERROR_MESSAGES
 */

import { toast } from 'sonner';
import { ERROR_MESSAGES, LOG_MESSAGES } from '@/lib/config/messages';

/**
 * Message de succès
 * @param {string} message - Le message à afficher
 */
export const showSuccess = (message) => {
  toast.success(message);
};

/**
 * Gestion erreurs API
 * @param {Error} error - L'erreur à gérer
 * @param {string} fallbackMessage - Message par défaut si l'erreur n'a pas de message
 * @returns {string} Le message d'erreur
 */
export const handleApiError = (error, fallbackMessage = ERROR_MESSAGES.API.DEFAULT_ERROR) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }

  // Extraction du message d'erreur selon la structure
  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    fallbackMessage;

  // Afficher dans un toast
  toast.error(errorMessage, {
    duration: 8000,
    closeButton: true
  });

  return errorMessage;
};

/**
 * Gestion spécifique des erreurs d'authentification
 * @param {Error} error - L'erreur à gérer
 * @returns {string} Le message d'erreur adapté
 */
export const handleAuthError = (error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(LOG_MESSAGES.AUTH.LOGIN_ERROR, error);
  }

  let message = ERROR_MESSAGES.AUTH.LOGIN_FAILED;

  const statusCode = error?.response?.status;
  const errorMsg = error?.response?.data?.message || error?.message || "";

  if (statusCode === 401 || errorMsg.includes('credentials') || errorMsg.includes('password')) {
    message = ERROR_MESSAGES.AUTH.UNAUTHORIZED;
  } else if (statusCode === 404 || errorMsg.includes('not found')) {
    message = ERROR_MESSAGES.AUTH.USER_NOT_FOUND;
  } else if (statusCode === 429) {
    message = ERROR_MESSAGES.AUTH.TOO_MANY_ATTEMPTS;
  } else if (errorMsg.includes('network') || errorMsg.includes('connexion')) {
    message = ERROR_MESSAGES.AUTH.NETWORK_ERROR;
  }

  // Afficher dans un toast
  toast.error(message, {
    duration: 8000,
    closeButton: true
  });

  return message;
};

/**
 * Gestion erreurs d'inscription
 */
export const handleRegisterError = (error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error("Erreur d'inscription", error);
  }

  let message = ERROR_MESSAGES.AUTH.REGISTER_FAILED;

  const statusCode = error?.response?.status;
  const errorMsg = error?.response?.data?.message || error?.message || "";
  const errorDetail = error?.response?.data?.detail || "";

  if (statusCode === 500 && (
    errorDetail.includes('UNIQ_8D93D64986CC499D') ||
    errorDetail.includes('pseudo') && errorDetail.includes('unique')
  )) {
    message = ERROR_MESSAGES.AUTH.REGISTER_PSEUDO_EXISTS;
  }

  else if (statusCode === 409 ||
    errorMsg.includes('exists') ||
    errorMsg.includes('déjà utilisé') ||
    (statusCode === 500 && (
      errorDetail.includes('UNIQ_IDENTIFIER_EMAIL') ||
      errorDetail.includes('unique constraint') ||
      errorMsg.includes('unique constraint')
    ))
  ) {
    message = ERROR_MESSAGES.AUTH.REGISTER_EMAIL_EXISTS;
  } else if (errorMsg.includes('password') && errorMsg.includes('weak')) {
    message = ERROR_MESSAGES.AUTH.REGISTER_WEAK_PASSWORD;
  } else if (errorMsg.includes('network') || errorMsg.includes('connexion')) {
    message = ERROR_MESSAGES.AUTH.NETWORK_ERROR;
  }

  toast.error(message, {
    duration: 8000,
    closeButton: true
  });

  return message;
};

/**
 * Gestion erreurs MAJ profil
 */
export const handleProfileError = (error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error("Erreur de mise à jour du profil", error);
  }

  let message = ERROR_MESSAGES.PROFILE.UPDATE_FAILED;

  const statusCode = error?.response?.status;
  const errorMsg = error?.response?.data?.message || error?.message || "";

  if (statusCode === 409 || errorMsg.includes('exists') || errorMsg.includes('déjà utilisé')) {
    message = ERROR_MESSAGES.PROFILE.EMAIL_EXISTS;
  } else if (statusCode === 403) {
    message = ERROR_MESSAGES.PROFILE.FORBIDDEN;
  } else if (errorMsg.includes('network') || errorMsg.includes('connexion')) {
    message = ERROR_MESSAGES.API.NETWORK_ERROR;
  }

  toast.error(message, {
    duration: 8000,
    closeButton: true
  });

  return message;
};

/**
 * Gestion erreurs de mot de passe
 */
export const handlePasswordError = (error) => {
  
  if (error.response?.status === 422) {
    console.error('❌ Erreur validation 422 (mot de passe):', error.response.data);
    console.error('❌ Violations:', error.response.data.violations);
  }

  if (process.env.NODE_ENV === 'development') {
    console.error("Erreur de mot de passe", error);
  }

  let message = ERROR_MESSAGES.AUTH.PASSWORD_UPDATE_FAILED;

  const statusCode = error?.response?.status;
  const errorMsg = error?.response?.data?.message || error?.message || "";

  // ✅ AJOUT : Gestion spécifique des violations 422
  if (statusCode === 422 && error.response?.data?.violations) {
    const violations = error.response.data.violations;
    console.log('❌ Violations mot de passe:', violations);
    
    if (violations.length > 0) {
      const firstViolation = violations[0];
      console.log('❌ Première violation:', firstViolation);
      // Utiliser le message de la violation directement
      message = firstViolation.message || ERROR_MESSAGES.AUTH.PASSWORD_UPDATE_FAILED;
    }
  }
  // ...existing conditions...
  else if (statusCode === 401) {
    message = ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS;
  }

  toast.error(message, {
    duration: 8000,
    closeButton: true
  });

  return message;
};
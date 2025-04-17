import { toast } from 'sonner';

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
export const handleApiError = (error, fallbackMessage = "Une erreur est survenue") => {
  console.error(error);

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
 * Gestion erreurs Auth
 * @param {Error} error 
 * @returns {string} 
 */
export const handleAuthError = (error) => {
  console.error("Erreur d'authentification", error);

  let message = "Problème d'authentification. Veuillez réessayer.";

  // Extraction du message d'erreur selon la structure
  const statusCode = error?.response?.status;
  const errorMsg = error?.response?.data?.message || error?.message || "";

  if (statusCode === 401 || errorMsg.includes('credentials') || errorMsg.includes('password')) {
    message = "Identifiants incorrects. Vérifiez votre email et votre mot de passe.";
  } else if (statusCode === 404 || errorMsg.includes('not found')) {
    message = "Aucun compte associé à cet email.";
  } else if (statusCode === 429) {
    message = "Trop de tentatives de connexion. Veuillez réessayer plus tard.";
  } else if (errorMsg.includes('network') || errorMsg.includes('connexion')) {
    message = "Problème de connexion au serveur. Vérifiez votre connexion internet.";
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
  console.error("Erreur d'inscription", error);

  let message = "Problème lors de l'inscription. Veuillez réessayer.";

  const statusCode = error?.response?.status;
  const errorMsg = error?.response?.data?.message || error?.message || "";

  if (statusCode === 409 || errorMsg.includes('exists') || errorMsg.includes('déjà utilisé')) {
    message = "Cet email est déjà utilisé. Veuillez vous connecter ou utiliser un autre email.";
  } else if (errorMsg.includes('password') && errorMsg.includes('weak')) {
    message = "Le mot de passe n'est pas assez sécurisé. Utilisez au moins 8 caractères avec lettres et chiffres.";
  } else if (errorMsg.includes('network') || errorMsg.includes('connexion')) {
    message = "Problème de connexion au serveur. Vérifiez votre connexion internet.";
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
  console.error("Erreur de mise à jour du profil", error);

  let message = "Problème lors de la mise à jour du profil. Veuillez réessayer.";

  const statusCode = error?.response?.status;
  const errorMsg = error?.response?.data?.message || error?.message || "";

  if (statusCode === 409 || errorMsg.includes('exists') || errorMsg.includes('déjà utilisé')) {
    message = "Cet email est déjà utilisé par un autre compte.";
  } else if (statusCode === 403) {
    message = "Vous n'avez pas les droits pour modifier ce profil.";
  } else if (errorMsg.includes('network') || errorMsg.includes('connexion')) {
    message = "Problème de connexion au serveur. Vérifiez votre connexion internet.";
  }

  toast.error(message, {
    duration: 8000,
    closeButton: true
  });

  return message;
};

/**
 * Gestion erreurs MAJ mdp
 */
export const handlePasswordError = (error) => {
  console.error("Erreur de mot de passe", error);

  let message = "Problème lors du changement de mot de passe. Veuillez réessayer.";

  const statusCode = error?.response?.status;
  const errorMsg = error?.response?.data?.message || error?.message || "";

  if (statusCode === 401 || errorMsg.includes('incorrect') || errorMsg.includes('invalid')) {
    message = "Le mot de passe actuel est incorrect.";
  } else if (errorMsg.includes('weak')) {
    message = "Le nouveau mot de passe n'est pas assez sécurisé. Utilisez au moins 8 caractères avec lettres et chiffres.";
  } else if (errorMsg.includes('network') || errorMsg.includes('connexion')) {
    message = "Problème de connexion au serveur. Vérifiez votre connexion internet.";
  }

  toast.error(message, {
    duration: 8000,
    closeButton: true
  });

  return message;
};
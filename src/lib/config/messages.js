/**
 * Configuration centralisée des messages d'erreur + permettra implémenation future de la traduction
 * @module errorMessages
 */
export const ERROR_MESSAGES = {
    AUTH: {
      MISSING_USER_DATA: "Impossible de récupérer les données utilisateur",
      UNAUTHORIZED: "Identifiants incorrects. Vérifiez votre email et votre mot de passe.",
      USER_NOT_FOUND: "Aucun compte associé à cet email.",
      TOO_MANY_ATTEMPTS: "Trop de tentatives de connexion. Veuillez réessayer plus tard.",
      NETWORK_ERROR: "Problème de connexion au serveur. Vérifiez votre connexion internet.",
      
      LOGIN_FAILED: "La connexion a échoué. Veuillez réessayer.",
      
      REGISTER_EMAIL_EXISTS: "Cet email est déjà utilisé. Veuillez vous connecter ou utiliser un autre email.",
      REGISTER_PSEUDO_EXISTS: "Ce pseudo est déjà utilisé. Veuillez en choisir un autre.", 
      REGISTER_WEAK_PASSWORD: "Le mot de passe n'est pas assez sécurisé. Utilisez au moins 8 caractères avec lettres et chiffres.",
      REGISTER_FAILED: "L'inscription a échoué. Veuillez réessayer.",
      
      RESET_EMAIL_SENT: "Instructions envoyées à votre adresse email.",
      RESET_FAILED: "Impossible d'envoyer les instructions. Vérifiez votre email et réessayez.",

      MISSING_TOKEN: "Token manquant dans la réponse",
      INVALID_USER_DATA_FORMAT: "Format de réponse inattendu dans getCurrentUser"
    },
    
    PROFILE: {
      UPDATE_SUCCESS: "Profil mis à jour avec succès !",
      UPDATE_FAILED: "La mise à jour du profil a échoué.",
      EMAIL_EXISTS: "Cet email est déjà utilisé par un autre compte.",
      FORBIDDEN: "Vous n'avez pas les droits pour modifier ce profil."
    },
    
    PASSWORD: {
      CHANGE_SUCCESS: "Mot de passe modifié avec succès !",
      CHANGE_FAILED: "Problème lors du changement de mot de passe. Veuillez réessayer.",
      CURRENT_INCORRECT: "Le mot de passe actuel est incorrect.",
      WEAK_PASSWORD: "Le nouveau mot de passe n'est pas assez sécurisé. Utilisez au moins 8 caractères avec lettres et chiffres."
    },
    
    API: {
      DEFAULT_ERROR: "Une erreur est survenue",
      NETWORK_ERROR: "Problème de connexion au serveur",
      SERVER_ERROR: "Erreur serveur. Veuillez réessayer ultérieurement.",
      NOT_FOUND: "La ressource demandée n'existe pas."
    },
    
    FORM: {
      REQUIRED_FIELD: "Ce champ est obligatoire",
      INVALID_EMAIL: "Veuillez entrer une adresse email valide",
      PASSWORDS_NOT_MATCH: "Les mots de passe ne correspondent pas"
    }
  };
  
  // Messages pour les logs erreur console (développement uniquement)
  export const LOG_MESSAGES = {
    AUTH: {
      INIT_ERROR: "Erreur d'initialisation de l'auth:",
      LOGIN_ERROR: "AuthContext - Erreur login:",
      MISSING_USER: "AuthContext - Données utilisateur manquantes après login",
      LOGOUT_ERROR: "Erreur lors de la déconnexion:",
      GET_USER_ERROR: "authService - Erreur récupération user",
      MISSING_USER_AFTER_LOGIN: "authService - Données utilisateur manquantes après getCurrentUser"
    },
   
    DEBUG: {
      FAVORITE_ERROR: "❌ Erreur favoris:",
      RATING_ERROR: "❌ Erreur notation:",
      RATING_DELETE_ERROR: "❌ Erreur suppression note:",
      API_STATUS: "❌ Status:",
      API_DATA: "❌ Data:",
      API_HEADERS: "❌ Headers:",
      API_ERROR: "❌ Erreur dans la requête:",
    }
  };


export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: "Connexion réussie !",
    REGISTER_COMPLETE: "Inscription réussie ! Vous pouvez maintenant vous connecter.",
    LOGOUT_SUCCESS: "Déconnexion réussie",
  },
  
  PROFILE: {
    UPDATE_SUCCESS: "Profil mis à jour avec succès !",
    AVATAR_UPDATE_SUCCESS: "Photo de profil mise à jour",
  },
  
  PASSWORD: {
    CHANGE_SUCCESS: "Mot de passe modifié avec succès !",
    RESET_SUCCESS: "Instructions de réinitialisation envoyées à votre email",
  }
};
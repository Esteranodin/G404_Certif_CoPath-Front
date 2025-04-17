/**
 * Utilitaire de gestion du token d'authentification
 * @module tokenStorage
 * @description Fonctions pour manipuler le token JWT dans le localStorage
 */

// Récupérer le token depuis le localStorage
export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

// Enregistrer le token dans le localStorage
export const setToken = (token) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
};

// Supprimer le token du localStorage
export const clearToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
};

// Vérifier si un token existe
export const hasToken = () => {
  return !!getToken();
};
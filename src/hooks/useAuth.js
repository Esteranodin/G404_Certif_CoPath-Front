/**
 * Hook d'authentification
 * @module useAuth
 * @description Hooks pour la gestion de l'authentification utilisateur
 * @requires AuthContext
 * @requires AuthService
 */

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useMutation } from '@tanstack/react-query';
import AuthService from '@/lib/services/authService';

/**
 * @param {Object} options - Options de navigation (optionnelles)
 * @returns {Object} - État d'authentification et méthodes
 */
export function useAuth(options = {}) {
  const context = useContext(AuthContext);

  if (!context) {
    console.error("useAuth - Contexte d'authentification non disponible");
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }

  const isAuthenticated = !!context.user;

  return {
    ...context,
    isAuthenticated,
  };
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      return await AuthService.login(email, password);
    }
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (userData) => {
      return await AuthService.register(userData);
    }
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => {
      context.logout();
      return true;
    }
  });
}

export function useCurrentUser() {
  return useMutation({
    mutationFn: async () => {
      return await AuthService.getCurrentUser();
    }
  });
}
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
 * @param {Object} options - Options de navigation
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
  const { login } = useAuth(); 
  
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const result = await AuthService.login(email, password);
      login(result); 
      return result;
    }
  });
}

export function useRegister() {
  const { login } = useAuth(); 
  
  return useMutation({
    mutationFn: async (userData) => {
      const result = await AuthService.register(userData);
      login(result); 
      return result;
    }
  });
}

export function useLogout() {
  const { logout } = useAuth(); 
  
  return useMutation({
    mutationFn: () => {
      logout(); 
      return true;
    }
  });
}

export function useCurrentUser() {
  const { user } = useAuth(); 
  return user;
}

export function useRefreshUser() {
  const { setUser } = useAuth();
  
  return useMutation({
    mutationFn: async () => {
      const user = await AuthService.getCurrentUser();
      setUser(user); 
      return user;
    }
  });
}
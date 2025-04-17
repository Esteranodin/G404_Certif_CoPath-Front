"use client";
/**
 * Contexte d'authentification
 * @module AuthContext
 * @description Fournit l'état d'authentification à toute l'application
 * @requires React
 * @requires authService
 */

import { createContext, useState, useEffect } from "react";
import authService from "@/lib/services/authService";
import { ERROR_MESSAGES, LOG_MESSAGES } from '@/lib/config/messages';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialisation - vérification du token et récupération des données utilisateur
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(LOG_MESSAGES.AUTH.INIT_ERROR, error);
        }
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const isAuthReady = !loading;

  const login = async (email, password) => {
    try {
      setLoading(true);
      const userData = await authService.login(email, password);

      if (!userData) {
        if (process.env.NODE_ENV === 'development') {
          console.error(LOG_MESSAGES.AUTH.MISSING_USER);
        }
        throw new Error(ERROR_MESSAGES.AUTH.MISSING_USER_DATA);
      }
      setUser(userData);
      setLoading(false);

      return userData;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(LOG_MESSAGES.AUTH.LOGIN_ERROR, error);
      }
      setLoading(false);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const result = await authService.register(userData);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };


  // Valeur exposée par le contexte
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    isAuthReady,
    login,
    logout,
    register,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
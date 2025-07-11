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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

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
  }, [isClient]);

  const isAuthReady = isClient && !loading;

  const login = async (email, password) => {
    try {
      setLoading(true);
      const userData = await authService.login(email, password);
      setUser(userData);
      return userData; 
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(LOG_MESSAGES.AUTH.LOGIN_ERROR, error);
      }
      throw error; 
    } finally {
      setLoading(false); 
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      return await authService.register(userData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };


  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    isAuthReady,
    isClient,
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
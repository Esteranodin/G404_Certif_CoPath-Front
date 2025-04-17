"use client";

import { createContext, useState, useEffect } from "react";
import authService from "@/lib/services/authService";

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
        console.error("Erreur d'initialisation de l'auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const userData = await authService.login(email, password);
      
      if (!userData) {
        if (process.env.NODE_ENV === 'development') {
          console.error("AuthContext - Données utilisateur manquantes après login");
        }
        throw new Error("Données utilisateur manquantes");
      }
      setUser(userData);
      setLoading(false);
      
      return userData;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("AuthContext - Erreur login:", error);
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

  const logout = async () => {
    await authService.logout();
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
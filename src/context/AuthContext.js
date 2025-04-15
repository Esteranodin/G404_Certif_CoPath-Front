"use client";

import { createContext, useReducer, useEffect } from 'react';
import AuthService from '@/lib/services/authService';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext(null);

const initialState = {
  user: null,
  loading: true,
  error: null,
  authChecked: false
};

// Reducer qui gère les transitions d'état
function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, user: action.payload, loading: false, error: null };
    case 'AUTH_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'AUTH_LOGOUT':
      return { ...state, user: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_AUTH_CHECKED':
      return { ...state, authChecked: true, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Extraction des valeurs de l'état pour faciliter l'usage
  const { user, loading, error, authChecked } = state;

  // Vérification initiale de l'authentification
  useEffect(() => {
    let isMounted = true; // Variable pour suivre le montage du composant

    const checkAuth = async () => {
        //verification qu'on est bien côté client
        if (typeof window === 'undefined') {
          dispatch({ type: 'SET_AUTH_CHECKED' });
          return;
        }

        try {
          if (AuthService.isAuthenticated()) {
            try {
              const userData = await AuthService.getCurrentUser();
              if (isMounted) {
                dispatch({ type: 'AUTH_SUCCESS', payload: userData });
              }
            } catch (error) {
              console.error("Erreur lors de la récupération des données utilisateur:", error);
              // Si l'API renvoie une erreur 401, on nettoie
              if (error.status === 401) {
                AuthService.logout();
              }
              if (isMounted) {
                dispatch({ type: 'AUTH_ERROR', payload: "Session expirée. Veuillez vous reconnecter." });
              }
            }
          }
         } catch (error) {
            console.error("Erreur lors de la vérification d'authentification:", error);
            if (isMounted) {
              dispatch({ type: 'AUTH_ERROR', payload: "Erreur lors de la vérification d'authentification" });
            }
          } finally {
            if (isMounted) {
              dispatch({ type: 'SET_AUTH_CHECKED' });
            }
          }
        };

      checkAuth();

      return () => {
        isMounted = false;
      }; // Nettoyage de l'effet pour éviter les fuites de mémoire
    }, []);
  

  const login = async (email, password) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await AuthService.login(email, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      // Récupération des données de l'utilisateur après connexion
      const userData = await AuthService.getCurrentUser();
      dispatch({ type: 'AUTH_SUCCESS', payload: userData });
      return userData;
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message || "Échec de la connexion" });
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    dispatch({ type: 'AUTH_LOGOUT' });
    router.push("/");
  };

  const register = async (userData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await AuthService.register(userData);
      return response;
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message || "Échec de l'inscription" });
      throw error;
    }
  };

  const setUser = (userData) => {
    dispatch({ type: 'AUTH_SUCCESS', payload: userData });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    user,
    setUser,
    loading,
    error,
    login,
    logout,
    register,
    clearError,
    isAuthenticated: !!user,
    authChecked,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
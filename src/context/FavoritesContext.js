"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useIsClient } from '@/hooks/useIsClient';
import { favoriteService } from '@/lib/services/favoriteService';
import { LOG_MESSAGES } from '@/lib/config/messages';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const isClient = useIsClient();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isClient || !user) {
        setFavorites([]);
        return;
      }

      setLoading(true);
      try {
        const userFavorites = await favoriteService.getAll();
        setFavorites(userFavorites);
      } catch (error) {
        console.error(LOG_MESSAGES.DEBUG.FAVORITE_ERROR, error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, isClient]); 

  const toggleFavorite = useCallback(async (scenarioId) => {
    if (!isClient || !user) return;
    
    try {
      const alreadyFavorite = favoriteService.isFavoriteByScenarioId(favorites, scenarioId);
      
      if (alreadyFavorite) {
        await favoriteService.removeFavoriteByScenario(scenarioId);
        setFavorites(prev => prev.filter(fav => fav.scenarioId !== String(scenarioId)));
        return false;
      } else {
        const newFavorite = await favoriteService.addFavorite(scenarioId);
        setFavorites(prev => [...prev, newFavorite]);
        return true;
      }
    } catch (error) {
      console.error(LOG_MESSAGES.DEBUG.FAVORITE_ERROR, error);
      throw error;
    }
  }, [isClient, user, favorites]);

  const isFavorite = useCallback((scenarioId) => {
    return favoriteService.isFavoriteByScenarioId(favorites, scenarioId);
  }, [favorites]);

  const value = {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    isClient
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
throw new Error('Hook useFavorites utilisé hors contexte');  }
  return context;
}
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useIsClient } from '@/hooks/useIsClient';
import { favoriteService } from '@/lib/services/favoriteService';

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
        console.error('❌ Erreur lors du chargement des favoris:', error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, isClient]); 

  const toggleFavorite = async (scenarioId) => {
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
      console.error('Erreur lors de la modification du favori:', error);
      throw error;
    }
  };

  const isFavorite = (scenarioId) => {
    return favoriteService.isFavoriteByScenarioId(favorites, scenarioId);
  };

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
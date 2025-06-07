import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useIsClient } from './useIsClient'; 
import { favoriteService } from '@/lib/services/favoriteService';

export function useFavorites() {
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
      const alreadyFavorite = favorites.some(fav => 
        fav.scenario?.id === scenarioId || 
        fav.scenario === `/api/scenarios/${scenarioId}`
      );
      
      if (alreadyFavorite) {
        await favoriteService.removeFavoriteByScenario(scenarioId);
        setFavorites(prev => prev.filter(
          fav => fav.scenario?.id !== scenarioId &&
                 fav.scenario !== `/api/scenarios/${scenarioId}`
        ));
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
    return favorites.some(
      fav => fav.scenario?.id === scenarioId || 
             fav.scenario === `/api/scenarios/${scenarioId}`
    );
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    isClient,
  };
}
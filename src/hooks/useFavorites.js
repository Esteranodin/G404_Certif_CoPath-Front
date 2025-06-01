import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { favoriteService } from '@/lib/services/favoriteService';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        return;
      }

      // console.log('🔄 Chargement des favoris pour:', user.pseudo);
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
  }, [user]);

  const addFavorite = async (scenarioId) => {
    try {
      const alreadyFavorite = favorites.some(fav => 
        fav.scenario?.id === scenarioId || 
        fav.scenario === `/api/scenarios/${scenarioId}`
      );
      
      if (alreadyFavorite) {
        return;
      }
      
      const newFavorite = await favoriteService.addFavorite(scenarioId);
      setFavorites(prev => [...prev, newFavorite]);
      return newFavorite;
    } catch (error) {
      console.error('Erreur ajout favori:', error);
      throw error;
    }
  };

  const removeFavorite = async (scenarioId) => {
    try {
      await favoriteService.removeFavoriteByScenario(scenarioId);
      setFavorites(prev => prev.filter(
        fav => fav.scenario?.id !== scenarioId &&
               fav.scenario !== `/api/scenarios/${scenarioId}`
      ));
      return true;
    } catch (error) {
      console.error('Erreur suppression favori:', error);
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
    addFavorite,
    removeFavorite,
    isFavorite
  };
}
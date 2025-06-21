"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useIsClient } from "@/hooks/useIsClient";
import { userRatingService } from "@/lib/services/userRatingService";

const UserRatingsContext = createContext();

export function UserRatingsProvider({ children }) {
  const { user } = useAuth();
  const isClient = useIsClient();
  const [userRatings, setUserRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserRatings = async () => {
      if (!isClient || !user) {
        setUserRatings([]);
        return;
      }

      setLoading(true);
      try {
        const ratings = await userRatingService.getAll();
        setUserRatings(ratings);
      } catch (error) {
        console.error('❌ Erreur lors du chargement des notes:', error);
        setUserRatings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRatings();
  }, [user, isClient]); 

  const setUserRating = async (scenarioId, score) => {
    if (!isClient || !user) return;
    
    try {
      const updatedRating = await userRatingService.setRating(scenarioId, score);
      
      setUserRatings(prev => {
        const existingIndex = prev.findIndex(r => r.scenarioId === String(scenarioId));
        
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = { ...updated[existingIndex], score };
          return updated;
        } else {
          return [...prev, updatedRating];
        }
      });

      window.dispatchEvent(new CustomEvent('scenarioRatingUpdated', { 
        detail: { scenarioId, newScore: score } 
      }));

      return updatedRating;
    } catch (error) {
      console.error('Erreur lors de la notation:', error);
      throw error;
    }
  };

  const removeUserRating = async (scenarioId) => {
    if (!isClient || !user) return;

    try {
      await userRatingService.removeRating(scenarioId);
      setUserRatings(prev => prev.filter(r => r.scenarioId !== String(scenarioId)));
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de la note:', error);
      throw error;
    }
  };

  const getUserRating = (scenarioId) => {
    const rating = userRatingService.findByScenarioId(userRatings, scenarioId);
    return rating ? rating.score : null;
  };

  const value = {
    userRatings,
    loading,
    setUserRating,
    removeUserRating,
    getUserRating,
    refreshUserRatings: () => {
      setUserRatings([]);
    },
    isClient
  };

  return (
    <UserRatingsContext.Provider value={value}>
      {children}
    </UserRatingsContext.Provider>
  );
}

export function useUserRatings() {
  const context = useContext(UserRatingsContext);
  if (!context) {
    throw new Error('useUserRatings doit être utilisé dans un UserRatingsProvider');
  }
  return context;
}
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { userRatingService } from "@/lib/services/userRatingService";

const UserRatingsContext = createContext({});

export function UserRatingsProvider({ children }) {
  const [userRatings, setUserRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isClient, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!isClient || authLoading) {
      return;
    }

    if (user) {
      loadUserRatings();
    } else {
      setUserRatings([]);
    }
  }, [user?.['@id'], isClient, authLoading]);

  const loadUserRatings = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const ratings = await userRatingService.getAll();
      
      setUserRatings(ratings || []);
    } catch (error) {
      console.error('❌ Erreur chargement notes:', error);
      setUserRatings([]);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    userRatings,
    loading,
    refreshUserRatings: loadUserRatings
  };

  return (
    <UserRatingsContext.Provider value={value}>
      {children}
    </UserRatingsContext.Provider>
  );
}

export const useUserRatingsContext = () => {
  const context = useContext(UserRatingsContext);
  if (!context) {
    throw new Error('useUserRatingsContext must be used within UserRatingsProvider');
  }
  return context;
};
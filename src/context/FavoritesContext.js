"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useIsClient } from '@/hooks/useIsClient';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const isClient = useIsClient();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (isClient && user) {
      setFavorites([]);
    }
  }, [user?.id, isClient]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
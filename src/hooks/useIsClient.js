import { useEffect, useState } from 'react';

/**
 * Hook pour détecter si on est côté client
 * Évite les erreurs d'hydratation avec localStorage/window
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
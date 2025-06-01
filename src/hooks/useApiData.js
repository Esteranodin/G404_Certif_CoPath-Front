import { useState, useEffect } from 'react';

export const useApiData = (apiCall, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiCall();
      setData(result);
      
    } catch (err) {
      setError('Impossible de charger les données');
      console.error('❌ Erreur chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, dependencies);

  return { data, loading, error, refetch: loadData };
};
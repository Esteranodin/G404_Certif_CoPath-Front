import axios from 'axios';

const createApiClient = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  // Configuration de base pour axios
  const client = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    },
  });

  // Intercepteur pour les requêtes
  client.interceptors.request.use(
    (config) => {
      // Gestion du token d'authentification
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Intercepteur pour les réponses
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        // En production, vous pourriez rediriger vers la page de connexion
      }
      return Promise.reject(error);
    }
  );

  return client;
};

const apiClient = createApiClient();

export default apiClient;
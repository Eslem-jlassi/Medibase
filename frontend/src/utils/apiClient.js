import config from './config/api.js';

// Utilitaire pour les appels API
const apiClient = {
  baseURL: config.API_BASE_URL,
  
  // Méthode POST
  post: async (endpoint, data, options = {}) => {
    const url = `${apiClient.baseURL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      credentials: 'include',
      body: JSON.stringify(data),
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
  
  // Méthode GET
  get: async (endpoint, options = {}) => {
    const url = `${apiClient.baseURL}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      credentials: 'include',
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};

export default apiClient;
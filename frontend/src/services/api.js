import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a configured instance that requires a token
export const createApiClient = (getToken) => {
  const instance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return {
    explainCode: (data) => instance.post('/explain', data),
    chat: (data) => instance.post('/chat', data),
    history: () => instance.get('/history'),
    documentation: (data) => instance.post('/docs', data),
  };
};

export default apiClient;

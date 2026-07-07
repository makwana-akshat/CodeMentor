import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically attach the Clerk JWT token
apiClient.interceptors.request.use(async (config) => {
  // window.Clerk is injected by the ClerkProvider
  if (window.Clerk && window.Clerk.session) {
    try {
      const token = await window.Clerk.session.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching Clerk token:", error);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for unified error handling
apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    console.error("Unauthorized access or expired token.");
    // Optionally trigger a logout or redirect here if needed
  }
  return Promise.reject(error);
});

export const createApiClient = () => {
  // Kept for backwards compatibility if needed, but we recommend using the default exported apiClient directly now.
  return {
    explainCode: (data) => apiClient.post('/explain', data),
    chat: (data) => apiClient.post('/chat', data),
    history: () => apiClient.get('/history'),
    documentation: (data) => apiClient.post('/docs', data),
  };
};

export default apiClient;


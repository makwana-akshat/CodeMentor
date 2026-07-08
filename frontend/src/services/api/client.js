import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

let tokenProvider = null;
let logoutHandler = null;

export const setTokenProvider = (provider) => {
  tokenProvider = provider;
};

export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

// Request interceptor to automatically attach the Clerk JWT token
apiClient.interceptors.request.use(async (config) => {
  if (tokenProvider) {
    try {
      const token = await tokenProvider();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching token from provider:", error);
    }
  } else if (window.Clerk && window.Clerk.session) {
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
    if (logoutHandler) {
      logoutHandler();
    }
  }
  return Promise.reject(error);
});

export const createApiClient = () => {
  const getHeaders = (token) => token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  
  return {
    explainCode: (data, token) => apiClient.post('/explain', data, getHeaders(token)),
    chat: (data, token) => apiClient.post('/chat', data, getHeaders(token)),
    history: (token) => apiClient.get('/history', getHeaders(token)),
    documentation: (data, token) => apiClient.post('/docs', data, getHeaders(token)),
  };
};

export default apiClient;


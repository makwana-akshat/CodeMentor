import apiClient from './client';
import { useQuery } from '@tanstack/react-query';

// 4.1 checkHealth function
export const checkHealth = async () => {
  // The health endpoint on the backend is at the root, not /api/v1
  const response = await apiClient.get('/health', { baseURL: import.meta.env.VITE_API_URL });
  return response.data;
};

// 4.2 Custom hook using React Query
export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: checkHealth,
    retry: 2,
    refetchInterval: 60000, // Check every minute
  });
};

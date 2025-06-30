import { apiClient } from './client';

export const getProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};
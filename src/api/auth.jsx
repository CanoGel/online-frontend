import { apiClient } from './client';

export const register = async (userData) => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await apiClient.post('/users/logout');
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const decodeToken = (token) => {
  return jwtDecode(token);
};
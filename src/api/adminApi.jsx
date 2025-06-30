import { apiClient } from './client.jsx';

export const getUsers = async () => {
  const res = await apiClient.get('/users');
  return res.data;
};

export const updateUser = async (userId, userData) => {
  const res = await apiClient.put(`/users/${userId}`, userData);
  return res.data;
};

export const deleteUser = async (userId) => {
  const res = await apiClient.delete(`/users/${userId}`);
  return res.data;
};
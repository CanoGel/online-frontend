import { apiClient } from './client';

export const getBooks = async () => {
  try {
    const response = await apiClient.get('/books');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch books');
  }
};

export const getBookById = async (id) => {
  try {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Book not found');
  }
};

export const getNewReleases = async () => {
  try {
    const response = await apiClient.get('/books/new-releases');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch new releases');
  }
};

export const getBestSellers = async () => {
  try {
    const response = await apiClient.get('/books/best-sellers');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch best sellers');
  }
};

export const createBook = async (formData) => {
  try {
    const response = await apiClient.post('/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create book');
  }
};

export const updateBook = async (id, formData) => {
  try {
    const response = await apiClient.put(`/books/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update book');
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await apiClient.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete book');
  }
};
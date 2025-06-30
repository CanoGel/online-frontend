import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Main API client
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// FormData API client
export const apiFormDataClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Request interceptors for both clients
const setupInterceptors = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const message = error.response.data?.message || 
                       error.response.data?.error || 
                       'An error occurred';
        return Promise.reject(new Error(message));
      } else if (error.request) {
        return Promise.reject(new Error('No response received from server'));
      } else {
        return Promise.reject(new Error(error.message || 'An error occurred'));
      }
    }
  );
};

setupInterceptors(apiClient);
setupInterceptors(apiFormDataClient);
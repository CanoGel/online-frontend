import { apiClient } from './client';

export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/api/orders', orderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create order');
  }
};

export const getOrderDetails = async (id) => {
  try {
    const response = await apiClient.get(`/api/orders/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Order not found');
  }
};

export const payOrder = async (orderId, paymentResult) => {
  try {
    const response = await apiClient.put(`/api/orders/${orderId}/pay`, paymentResult);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Payment failed');
  }
};

export const getMyOrders = async () => {
  try {
    const response = await apiClient.get('/api/orders/myorders');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get orders');
  }
};
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const orderService = {
  getAllOrders: () => axios.get(`${API_URL}/orders`),
  getOrderById: (id) => axios.get(`${API_URL}/orders/${id}`),
  createOrder: (data) => axios.post(`${API_URL}/orders`, data),
  updateOrderStatus: (id, data) => axios.put(`${API_URL}/orders/${id}/status`, data),
  getUserOrders: (userId) => axios.get(`${API_URL}/users/${userId}/orders`),
};

export const productService = {
  getAllProducts: () => axios.get(`${API_URL}/products`),
  getProductById: (id) => axios.get(`${API_URL}/products/${id}`),
  createProduct: (data) => axios.post(`${API_URL}/products`, data),
  deleteProduct: (id) => axios.delete(`${API_URL}/products/${id}`),
};

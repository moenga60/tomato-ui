import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Auth API
export const auth = {
  login: (username: string, password: string) =>
    api.post('/users/login/', { username, password }),
  register: (data: any) => api.post('/users/register/', data),
  getProfile: () => api.get('/users/profile/'),
};

// Grading API
export const grading = {
  uploadImage: (formData: FormData) =>
    api.post('/grading/images/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  gradeImage: (imageId: number) =>
    api.post(`/grading/images/${imageId}/grade/`),
  getResults: (imageId: number) =>
    api.get(`/grading/results/${imageId}/`),
};

// Marketplace API
export const marketplace = {
  getProducts: (grade?: string) =>
    api.get('/marketplace/products/', { params: { grade } }),
  createProduct: (data: any) =>
    api.post('/marketplace/products/', data),
  createOrder: (data: any) =>
    api.post('/marketplace/orders/', data),
  getOrders: () => api.get('/marketplace/orders/'),
  updateOrderStatus: (orderId: number, status: string) =>
    api.post(`/marketplace/orders/${orderId}/status/`, { status }),
};

// Analytics API
export const analytics = {
  getMarketTrends: () => api.get('/analytics/market-trends/'),
  getPriceTrends: () => api.get('/analytics/market-trends/price-analysis/'),
  getRegionalAnalysis: () => api.get('/analytics/quality-metrics/regional/'),
};

export default api;
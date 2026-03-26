import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY || 'ecommerce_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY || 'ecommerce_token');
      localStorage.removeItem(process.env.REACT_APP_USER_KEY || 'ecommerce_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/api/users/login', credentials),
  
  register: (userData: {
    username: string;
    password: string;
    profile: {
      firstName: string;
      lastName: string;
      email: string;
      address: string;
      phone?: string;
    };
  }) => api.post('/api/users/register', userData),
};

export const catalogAPI = {
  getProducts: () => api.get('/api/catalog/products'),
  getProductById: (id: string) => api.get(`/api/catalog/products/${id}`),
  createProduct: (product: any) => api.post('/api/catalog/products', product),
  updateProduct: (id: string, product: any) => api.put(`/api/catalog/products/${id}`, product),
  deleteProduct: (id: string) => api.delete(`/api/catalog/products/${id}`),
};

export const profileAPI = {
  getProfile: () => api.get('/api/profile'),
  updateProfile: (profile: any) => api.put('/api/profile', profile),
};

export default api;

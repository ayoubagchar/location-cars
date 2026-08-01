import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle 401 Unauthorized response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (localStorage.getItem('admin_token')) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// PUBLIC ENDPOINTS
export const fetchPublicCars = (params = {}) => api.get('/cars', { params });
export const fetchCarDetails = (id) => api.get(`/cars/${id}`);
export const fetchDistinctBrands = () => api.get('/cars/brands');
export const submitContactRequest = (data) => api.post('/contact', data);
export const fetchAgencyInfo = () => api.get('/agency');

// AUTH ENDPOINTS
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const fetchCurrentUser = () => api.get('/auth/me');

// ADMIN ENDPOINTS
export const fetchAdminStats = () => api.get('/admin/stats');
export const fetchAdminCars = (params = {}) => api.get('/admin/cars', { params });
export const createCar = (data) => api.post('/admin/cars', data);
export const updateCar = (id, data) => api.put(`/admin/cars/${id}`, data);
export const toggleCarAvailability = (id, available) => api.patch(`/admin/cars/${id}/availability`, null, { params: { available } });
export const deleteCar = (id) => api.delete(`/admin/cars/${id}`);

export const fetchAdminContactRequests = (params = {}) => api.get('/admin/contact-requests', { params });
export const markContactRequestRead = (id) => api.patch(`/admin/contact-requests/${id}/read`);
export const deleteContactRequest = (id) => api.delete(`/admin/contact-requests/${id}`);

export const updateAgencySettings = (data) => api.put('/admin/agency', data);

// FILE UPLOAD
export const uploadCarImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const uploadMultipleCarImages = (files) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
  return api.post('/upload/multiple', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default api;

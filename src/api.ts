/**
 * API Configuration Module
 * 
 * @author Arpit Singh
 * @description Configured axios instance with base URL, JWT auth headers,
 * and automatic 401 error handling (auto-logout).
 */

import axios from 'axios';
import { store } from './store';
import { logout } from './store/slices/authSlice';

// API base URL - points to backend server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

/**
 * Configured axios instance for all API calls
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - attaches JWT token to every request
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor - handles 401 errors (auto-logout)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only trigger auto-logout if we're not already trying to login/register
    const isAuthRoute = error.config?.url?.includes('/api/auth/');
    
    if (error.response?.status === 401 && !isAuthRoute) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

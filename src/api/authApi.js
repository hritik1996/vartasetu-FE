import axios from 'axios';
import { getToken, setToken, removeToken } from '../utils/storage';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const registerAgent = async ({ name, email, password, role = 'agent' }) => {
  try {
    const response = await api.post('/api/auth/register-agent', {
      name,
      email,
      password,
      role
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    const { token } = response.data;
    if (token) {
      setToken(token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const getAgentProfile = async () => {
  try {
    const response = await api.get('/api/agents/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch profile' };
  }
};

export const logout = () => {
  removeToken();
};


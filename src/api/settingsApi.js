import axios from 'axios';
import { getToken } from '../utils/storage';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

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

// Get all settings
export const getSettings = async () => {
    try {
        const response = await api.get('/api/settings');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch settings' };
    }
};

// Update widget settings
export const updateWidgetSettings = async (data) => {
    try {
        const response = await api.put('/api/settings/widget', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update widget settings' };
    }
};

// Update notification settings
export const updateNotificationSettings = async (data) => {
    try {
        const response = await api.put('/api/settings/notifications', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update notification settings' };
    }
};

// Change password
export const updatePassword = async (oldPassword, newPassword) => {
    try {
        const response = await api.put('/api/settings/password', {
            oldPassword,
            newPassword
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to change password' };
    }
};

// Toggle 2FA
export const toggle2FA = async (enabled) => {
    try {
        const response = await api.put('/api/settings/2fa', { enabled });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to toggle 2FA' };
    }
};

// Generate API key
export const generateAPIKey = async (name) => {
    try {
        const response = await api.post('/api/settings/api-keys', { name });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to generate API key' };
    }
};

// Get API keys
export const getAPIKeys = async () => {
    try {
        const response = await api.get('/api/settings/api-keys');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch API keys' };
    }
};

// Revoke API key
export const revokeAPIKey = async (keyId) => {
    try {
        const response = await api.delete(`/api/settings/api-keys/${keyId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to revoke API key' };
    }
};

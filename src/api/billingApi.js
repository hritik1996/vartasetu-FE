import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

// Create axios instance with auth token
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Get current subscription
export const getCurrentSubscription = async () => {
    const response = await api.get('/api/billing/subscription');
    return response.data;
};

// Get available plans
export const getAvailablePlans = async () => {
    const response = await api.get('/api/billing/plans');
    return response.data;
};

// Update subscription
export const updateSubscription = async (planId, billingCycle = 'monthly') => {
    const response = await api.post('/api/billing/subscription/update', {
        planId,
        billingCycle,
    });
    return response.data;
};

// Get usage metrics
export const getUsageMetrics = async () => {
    const response = await api.get('/api/billing/usage');
    return response.data;
};

// Get payment methods
export const getPaymentMethods = async () => {
    const response = await api.get('/api/billing/payment-methods');
    return response.data;
};

// Add payment method
export const addPaymentMethod = async (cardData) => {
    const response = await api.post('/api/billing/payment-methods', cardData);
    return response.data;
};

// Remove payment method
export const removePaymentMethod = async (methodId) => {
    const response = await api.delete(`/api/billing/payment-methods/${methodId}`);
    return response.data;
};

// Set default payment method
export const setDefaultPaymentMethod = async (methodId) => {
    const response = await api.put(`/api/billing/payment-methods/${methodId}/default`);
    return response.data;
};

// Get invoices
export const getInvoices = async (page = 1, limit = 10) => {
    const response = await api.get('/api/billing/invoices', {
        params: { page, limit },
    });
    return response.data;
};

// Download invoice
export const downloadInvoice = async (invoiceId) => {
    const response = await api.get(`/api/billing/invoices/${invoiceId}/download`, {
        responseType: 'blob',
    });
    return response.data;
};

// Get upcoming invoice
export const getUpcomingInvoice = async () => {
    const response = await api.get('/api/billing/invoices/upcoming');
    return response.data;
};

export default api;

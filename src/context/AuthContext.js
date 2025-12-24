import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAgentProfile } from '../api/authApi';
import { isAuthenticated, removeToken } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAgentProfile = async () => {
    try {
      const agentData = await getAgentProfile();
      setAgent(agentData);
      return agentData;
    } catch (error) {
      console.error('Failed to load agent profile:', error);
      removeToken();
      setAgent(null);
      throw error;
    }
  };

  useEffect(() => {
    const loadAgent = async () => {
      if (isAuthenticated()) {
        await fetchAgentProfile();
      }
      setLoading(false);
    };

    loadAgent();
  }, []);

  const logout = () => {
    removeToken();
    setAgent(null);
  };

  const value = {
    agent,
    loading,
    isAuthenticated: !!agent,
    setAgent,
    refreshAgent: fetchAgentProfile,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};


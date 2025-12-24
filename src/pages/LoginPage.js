import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { refreshAgent } = useAuth();

  const handleLoginSuccess = async () => {
    try {
      await refreshAgent();
    } catch (error) {
      console.error('Unable to refresh agent after login:', error);
    }
    navigate('/home');
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPage;


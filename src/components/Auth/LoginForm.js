import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../api/authApi';
import Input from '../Common/Input';
import Button from '../Common/Button';
import './LoginForm.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getEmailError = () => {
    if (!touched.email) return '';
    if (!email) return 'Email is required';
    if (!validateEmail(email)) return 'Please enter a valid email';
    return '';
  };

  const getPasswordError = () => {
    if (!touched.password) return '';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Minimum 6 characters required';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTouched({ email: true, password: true });

    if (!email || !password || !validateEmail(email)) {
      setError('Please fill in all fields correctly');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clean-auth-page">
      {/* LEFT SIDE - Simple Branding */}
      <div className="brand-side">
        <div className="brand-wrapper">
          {/* Logo */}
          <div className="main-logo">
            <div className="logo-circle">
              <svg width="50" height="50" viewBox="0 0 50 50">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <circle cx="25" cy="25" r="24" fill="url(#logoGrad)" />
                <path d="M18 25L22 29L32 19" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1>VartaSetu</h1>
          </div>

          {/* Tagline */}
          <p className="main-tagline">Your intelligent customer support command center</p>

          {/* Simple Stats */}
          <div className="simple-stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="trust-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Enterprise-grade security & encryption</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="form-side">
        <div className="form-wrapper">
          <div className="form-title">
            <h2>Welcome back</h2>
            <p>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {error && (
              <div className="error-alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <Input
              id="email"
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              placeholder="you@company.com"
              required
              disabled={loading}
              error={getEmailError()}
              autoComplete="email"
            />

            <Input
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (error) setError(''); }}
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
              placeholder="Enter password"
              required
              disabled={loading}
              error={getPasswordError()}
              showPasswordToggle
              autoComplete="current-password"
            />

            <div className="form-extras">
              <label className="remember-checkbox">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  disabled={loading}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              loading={loading}
              fullWidth
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="form-bottom">
            <p>Don't have an account? <Link to="/register" className="register-link">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

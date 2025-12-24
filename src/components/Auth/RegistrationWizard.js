import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerAgent } from '../../api/authApi';
import Input from '../Common/Input';
import Button from '../Common/Button';
import './RegistrationWizard.css';

const RegistrationWizard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false, confirmPassword: false });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getEmailError = () => {
    if (!touched.email) return '';
    if (!formData.email) return 'Email is required';
    if (!validateEmail(formData.email)) return 'Please enter a valid email';
    return '';
  };

  const getPasswordError = () => {
    if (!touched.password) return '';
    if (!formData.password) return 'Password is required';
    if (formData.password.length < 6) return 'Minimum 6 characters required';
    return '';
  };

  const getConfirmPasswordError = () => {
    if (!touched.confirmPassword) return '';
    if (!formData.confirmPassword) return 'Please confirm password';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTouched({ email: true, password: true, confirmPassword: true });

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await registerAgent({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'agent'
      });
      // Redirect to login page after successful registration
      window.location.href = '/login';
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clean-auth-page">
      {/* LEFT SIDE - Brand */}
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
          <p className="main-tagline">Start delivering exceptional customer experiences today</p>

          {/* Simple Stats - DIFFERENT from login */}
          <div className="simple-stats">
            <div className="stat-item">
              <div className="stat-number">5 min</div>
              <div className="stat-label">Setup Time</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">Free</div>
              <div className="stat-label">Trial</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">No CC</div>
              <div className="stat-label">Required</div>
            </div>
          </div>

          {/* Features List - NEW */}
          <div className="features-box">
            <h3 className="features-title">Why VartaSetu?</h3>
            <div className="feature-list">
              <div className="feature-row">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Real-time customer conversations</span>
              </div>
              <div className="feature-row">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>AI-powered smart responses</span>
              </div>
              <div className="feature-row">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Multi-channel support integration</span>
              </div>
              <div className="feature-row">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Advanced analytics & insights</span>
              </div>
            </div>
          </div>

          {/* Trust Badge - UPDATED */}
          <div className="trust-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Trusted by 10,000+ businesses worldwide</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Register Form */}
      <div className="form-side">
        <div className="form-wrapper">
          <div className="form-title">
            <h2>Create your account</h2>
            <p>Get started with VartaSetu in minutes</p>
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
              id="name"
              type="text"
              label="Full Name"
              value={formData.name}
              onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (error) setError(''); }}
              placeholder="John Doe"
              required
              disabled={loading}
              autoComplete="name"
            />

            <Input
              id="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (error) setError(''); }}
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
              value={formData.password}
              onChange={(e) => { setFormData({ ...formData, password: e.target.value }); if (error) setError(''); }}
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
              placeholder="Create password"
              required
              disabled={loading}
              error={getPasswordError()}
              showPasswordToggle
              autoComplete="new-password"
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => { setFormData({ ...formData, confirmPassword: e.target.value }); if (error) setError(''); }}
              onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
              placeholder="Confirm password"
              required
              disabled={loading}
              error={getConfirmPasswordError()}
              showPasswordToggle
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="large"
              loading={loading}
              fullWidth
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="form-bottom">
            <p>Already have an account? <Link to="/login" className="register-link">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationWizard;

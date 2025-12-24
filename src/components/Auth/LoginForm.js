import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../api/authApi';
import './LoginForm.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const featureHighlights = [
    'Live context across every conversation',
    'Automated SLA nudges for high-priority queues',
    'Audit-ready transcripts with rich tagging'
  ];

  const insightMetrics = [
    { label: 'Active chats', value: '28', note: 'Live right now' },
    { label: 'CSAT (week)', value: '96%', note: 'Top performing pod' },
    { label: 'First response', value: '42s', note: 'Median speed' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-content fade-slide-in">
        <div className="brand-info">
          <span className="brand-pill">VartaSetu Platform</span>
          <h1>
            Agent Command Center for <span>real-time support</span>
          </h1>
          <p>
            Stay ahead of every customer promise with unified context, pod-level metrics, and
            lightning-fast access to historic conversations.
          </p>

          <div className="metrics-grid">
            {insightMetrics.map((metric) => (
              <div key={metric.label} className="metric-card">
                <span className="metric-label">{metric.label}</span>
                <span className="metric-value">{metric.value}</span>
                <span className="metric-note">{metric.note}</span>
              </div>
            ))}
          </div>

          <ul className="highlight-list">
            {featureHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="shift-card">
            <div>
              <p className="shift-title">Shift roster</p>
              <p className="shift-meta">
                Support Pod • Shift Bravo • {new Date().toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="shift-value">08:00 - 17:00 IST</p>
              <p className="shift-note">Escalation captain: Mira Patel</p>
            </div>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-panel-header">
            <h2>Sign in to VartaSetu Support</h2>
            <p>Use your VartaSetu workspace credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Work Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@vartasetu.com"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember((prev) => !prev)}
                  disabled={loading}
                />
                Remember this device
              </label>
              <button type="button" className="link-button">
                Need help signing in?
              </button>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Authorising...' : 'Enter Command Center'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              New to VartaSetu support? Contact Ops to get whitelisted. Emergency hotline:
              <strong> +91 80 0000 0000</strong>
            </p>
            <p className="login-helper">
              Need a workspace? <Link to="/register">Launch onboarding</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;


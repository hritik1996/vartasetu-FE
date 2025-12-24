import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerAgent } from '../../api/authApi';
import Input from '../Common/Input';
import Button from '../Common/Button';
import './RegistrationWizard.css';

const channelOptions = ['Messenger', 'WhatsApp', 'Email', 'SMS', 'Telegram', 'In-app'];

const initialInvites = [
  { label: 'Support Lead', email: '' },
  { label: 'On-call Specialist', email: '' },
  { label: 'Lifecycle Marketer', email: '' }
];

const RegistrationWizard = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    channels: ['Messenger', 'Email'],
    invites: initialInvites,
    snippetCopied: false,
    email: '',
    password: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [completed, setCompleted] = useState(false);

  const widgetSnippet = `<!-- VartaSetu widget -->
<script>
(function() {
  var vs = document.createElement('script');
  vs.type = 'text/javascript';
  vs.async = true;
  vs.src = 'https://cdn.vartasetu.com/widget.js';
  vs.onload = function() {
    window.vartasetu.init({
      workspace: 'your-workspace-id',
      installSource: 'onboarding_wizard'
    });
  };
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(vs, s);
})();
</script>`;

  const steps = [
    {
      id: 1,
      title: "Hi, what's your name?",
      description: 'This is how customers and teammates will see you inside VartaSetu.',
      content: (
        <div className="wizard-form-group">
          <label htmlFor="name">Display name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Aarav from VartaSetu"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="wizard-input"
          />
        </div>
      )
    },
    {
      id: 2,
      title: 'Automate your customer service',
      description: 'Tell us where VartaSetu will live. We use your website to personalise suggestions.',
      content: (
        <div className="wizard-form-group">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            placeholder="your-company.com"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="wizard-input"
          />
          <p className="field-help">
            We'll show you how to automatically answer FAQs using public content from your site.
          </p>
        </div>
      )
    },
    {
      id: 3,
      title: 'Install the VartaSetu chat widget',
      description: 'Add this snippet before the closing </body> tag on every page.',
      content: (
        <div className="snippet-card">
          <div className="snippet-header">
            <span className="snippet-tag">{'<script>'}</span>
            <button
              type="button"
              className="copy-button"
              onClick={() => {
                if (navigator?.clipboard?.writeText) {
                  navigator.clipboard.writeText(widgetSnippet);
                } else {
                  window.prompt('Copy this snippet', widgetSnippet);
                }
                setFormData({ ...formData, snippetCopied: true });
                setTimeout(() => setFormData((prev) => ({ ...prev, snippetCopied: false })), 2000);
              }}
            >
              {formData.snippetCopied ? 'Copied!' : 'Copy code'}
            </button>
          </div>
          <pre className="snippet-code">
            <code>{widgetSnippet}</code>
          </pre>
          <div className="snippet-actions">
            <button type="button" className="action-btn">Invite your developer</button>
            <button type="button" className="action-btn">Connect via Tag Manager</button>
            <button type="button" className="action-btn">See other integrations</button>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Choose your communication channels',
      description: 'Select the touchpoints you want to manage through VartaSetu.',
      content: (
        <div className="channel-grid">
          {channelOptions.map((channel) => {
            const selected = formData.channels.includes(channel);
            return (
              <button
                type="button"
                key={channel}
                className={`channel-chip ${selected ? 'selected' : ''}`}
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    channels: selected
                      ? prev.channels.filter((c) => c !== channel)
                      : [...prev.channels, channel]
                  }));
                }}
              >
                <span className="channel-name">{channel}</span>
                <span className="chip-status">{selected ? 'Enabled' : 'Add'}</span>
              </button>
            );
          })}
        </div>
      )
    },
    {
      id: 5,
      title: 'Invite your teammates',
      description: 'Get your crew online so every conversation has coverage.',
      content: (
        <div className="invite-grid">
          {formData.invites.map((invite, idx) => (
            <div key={invite.label} className="wizard-form-group">
              <label>{invite.label}</label>
              <input
                type="email"
                placeholder={`e.g. ${invite.label.toLowerCase().replace(' ', '.')}@vartasetu.com`}
                value={invite.email}
                onChange={(e) => {
                  const updated = [...formData.invites];
                  updated[idx] = { ...updated[idx], email: e.target.value };
                  setFormData({ ...formData, invites: updated });
                }}
                className="wizard-input"
              />
            </div>
          ))}
          <button
            type="button"
            className="add-teammate-btn"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                invites: [...prev.invites, { label: `Teammate ${prev.invites.length + 1}`, email: '' }]
              }))
            }
          >
            + Add another teammate
          </button>
        </div>
      )
    },
    {
      id: 6,
      title: 'Secure your workspace login',
      description: 'Create credentials for your primary agent account.',
      content: (
        <div className="credential-grid">
          <div className="wizard-form-group">
            <label htmlFor="work-email">Work email</label>
            <input
              id="work-email"
              type="email"
              placeholder="agent@vartasetu.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="wizard-input"
            />
          </div>
          <div className="wizard-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="wizard-input"
            />
            <p className="field-help">Use at least 8 characters with a mix of letters and numbers.</p>
          </div>
        </div>
      )
    }
  ];

  const totalSteps = steps.length;
  const current = steps[stepIndex];

  const handleContinue = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleFinish = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setSubmissionError('Please complete your name, work email, and password to continue.');
      return;
    }
    setSubmitting(true);
    setSubmissionError('');
    try {
      await registerAgent({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'agent'
      });
      setCompleted(true);
    } catch (error) {
      setSubmissionError(error.message || 'Failed to finish setup. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="clean-auth-page">
      {/* LEFT SIDE - Brand (same as login) */}
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

          {/* Simple Stats */}
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

          {/* Features List */}
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

          {/* Trust Badge */}
          <div className="trust-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Trusted by 10,000+ businesses worldwide</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Wizard */}
      <div className="form-side">
        <div className="wizard-wrapper">
          {completed ? (
            <>
              <div className="wizard-complete">
                <div className="success-icon">✓</div>
                <h2>Your VartaSetu workspace is live</h2>
                <p>We created your agent account. You can now sign in and start handling conversations.</p>
                <div className="next-steps">
                  <h3>Next steps</h3>
                  <ul>
                    <li>Log in with the credentials you just created.</li>
                    <li>Assign teammates from the dashboard.</li>
                    <li>Drop the widget snippet into your site to go live.</li>
                  </ul>
                </div>
                <Link to="/login" className="primary-button">
                  Go to login
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Progress Bar */}
              <div className="wizard-progress">
                <div className="progress-info">
                  <span className="step-label">Step {stepIndex + 1}</span>
                  <span className="step-total">{totalSteps}</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-thumb"
                    style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Header */}
              <div className="wizard-headline">
                <p className="wizard-step-count">{stepIndex + 1}/{totalSteps}</p>
                <h2>{current.title}</h2>
                <p className="wizard-description">{current.description}</p>
              </div>

              {/* Step Content */}
              <div className="wizard-content">
                {submissionError && <div className="wizard-error">{submissionError}</div>}
                {current.content}
              </div>

              {/* Navigation */}
              <div className="wizard-actions">
                {stepIndex > 0 ? (
                  <button type="button" className="ghost-button" onClick={handleBack} disabled={submitting}>
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    className="ghost-button"
                    onClick={() => setStepIndex(totalSteps - 1)}
                    disabled={submitting}
                  >
                    Skip setup
                  </button>
                )}

                {stepIndex === totalSteps - 1 ? (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={handleFinish}
                    disabled={submitting}
                  >
                    {submitting ? 'Finishing...' : 'Finish setup'}
                  </button>
                ) : (
                  <button type="button" className="primary-button" onClick={handleContinue} disabled={submitting}>
                    Continue
                  </button>
                )}
              </div>

              {/* Login Link */}
              <div className="form-bottom">
                <p>Already have an account? <Link to="/login" className="register-link">Sign in</Link></p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationWizard;

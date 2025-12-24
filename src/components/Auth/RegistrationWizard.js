import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerAgent } from '../../api/authApi';
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
          />
          <p className="field-help">
            We’ll show you how to automatically answer FAQs using public content from your site.
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
            <span>{'<script>'}</span>
            <button
              type="button"
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
          <pre>
            <code>{widgetSnippet}</code>
          </pre>
          <div className="snippet-actions">
            <button type="button">Invite your developer</button>
            <button type="button">Connect via Tag Manager</button>
            <button type="button">See other integrations</button>
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
                <span>{channel}</span>
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
              />
            </div>
          ))}
          <button
            type="button"
            className="link-button"
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
            />
            <p className="field-help">Use at least 8 characters with a mix of letters and numbers.</p>
          </div>
        </div>
      )
    }
  ];

  const widgetSnippet = `<!-- VartaSetu widget -->
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
})();`;

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
    <div className="register-page">
      <div className="register-hero">
        <div className="hero-pill">VartaSetu Onboarding</div>
        <h1>Launch live chat in minutes</h1>
        <p>
          Capture high-intent conversations, automate FAQs, and keep your entire team in sync with
          timelines and context designed for modern support orgs.
        </p>
        <div className="hero-metrics">
          <div>
            <span className="metric-value">12</span>
            <span className="metric-label">Workspaces created today</span>
          </div>
          <div>
            <span className="metric-value">98%</span>
            <span className="metric-label">CSAT during onboarding</span>
          </div>
          <div>
            <span className="metric-value">17s</span>
            <span className="metric-label">Median setup time</span>
          </div>
        </div>
      </div>

      <div className="wizard-card">
        {completed ? (
          <>
            <div className="wizard-headline">
              <p className="wizard-step-count">All done</p>
              <h2>Your VartaSetu workspace is live</h2>
              <p className="wizard-description">
                We created your agent account. You can now sign in and start handling conversations.
              </p>
            </div>
            <div className="wizard-content">
              <div className="wizard-success">
                <h3>Next steps</h3>
                <ul>
                  <li>Log in with the credentials you just created.</li>
                  <li>Assign teammates from the dashboard.</li>
                  <li>Drop the widget snippet into your site to go live.</li>
                </ul>
              </div>
            </div>
            <div className="wizard-actions">
              <Link to="/login" className="primary-button link-reset">
                Go to login
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="wizard-progress">
              <span>Step {stepIndex + 1}</span>
              <div className="progress-track">
                <div
                  className="progress-thumb"
                  style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
                />
              </div>
              <span>{totalSteps}</span>
            </div>

            <div className="wizard-headline">
              <p className="wizard-step-count">
                {stepIndex + 1}/{totalSteps}
              </p>
              <h2>{current.title}</h2>
              <p className="wizard-description">{current.description}</p>
            </div>

            <div className="wizard-content">
              {submissionError && <div className="wizard-error">{submissionError}</div>}
              {current.content}
            </div>

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
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationWizard;


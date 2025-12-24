import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import './PlaceholderPage.css';

const AppsPage = () => {
  return (
    <AppLayout>
      <div className="placeholder-page">
        <div className="placeholder-content">
          <div className="placeholder-icon">📦</div>
          <h1>Apps & Integrations</h1>
          <p>Extend VartaSetu with powerful integrations and marketplace apps.</p>
          <div className="placeholder-features">
            <div className="feature-item">
              <span className="feature-icon">🔗</span>
              <div>
                <h3>CRM Integration</h3>
                <p>Connect with Salesforce, HubSpot, and more</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📧</span>
              <div>
                <h3>Email & Calendar</h3>
                <p>Sync with Gmail, Outlook, and scheduling tools</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛠️</span>
              <div>
                <h3>Custom Apps</h3>
                <p>Build your own integrations with our API</p>
              </div>
            </div>
          </div>
          <button className="placeholder-btn">Coming Soon</button>
        </div>
      </div>
    </AppLayout>
  );
};

export default AppsPage;



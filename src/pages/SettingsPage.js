import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import './PlaceholderPage.css';

const SettingsPage = () => {
  return (
    <AppLayout>
      <div className="placeholder-page">
        <div className="placeholder-content">
          <div className="placeholder-icon">⚙️</div>
          <h1>Settings</h1>
          <p>Configure your workspace, widget, and account preferences.</p>
          <div className="placeholder-features">
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <div>
                <h3>Widget Customization</h3>
                <p>Customize colors, position, and appearance</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔔</span>
              <div>
                <h3>Notifications</h3>
                <p>Configure alerts, sounds, and email preferences</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔐</span>
              <div>
                <h3>Security</h3>
                <p>Two-factor auth, API keys, and access controls</p>
              </div>
            </div>
          </div>
          <button className="placeholder-btn">Coming Soon</button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;



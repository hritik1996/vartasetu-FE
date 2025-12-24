import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import './PlaceholderPage.css';

const NewsPage = () => {
  return (
    <AppLayout>
      <div className="placeholder-page">
        <div className="placeholder-content">
          <div className="placeholder-icon">🔔</div>
          <h1>News & Updates</h1>
          <p>Stay updated with the latest features, tips, and announcements.</p>
          <div className="placeholder-features">
            <div className="feature-item">
              <span className="feature-icon">🚀</span>
              <div>
                <h3>New Features</h3>
                <p>Learn about the latest VartaSetu capabilities</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <div>
                <h3>Tips & Guides</h3>
                <p>Best practices to improve your support</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📢</span>
              <div>
                <h3>Announcements</h3>
                <p>Important updates and maintenance notices</p>
              </div>
            </div>
          </div>
          <button className="placeholder-btn">Coming Soon</button>
        </div>
      </div>
    </AppLayout>
  );
};

export default NewsPage;



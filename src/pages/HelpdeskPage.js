import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import './PlaceholderPage.css';

const HelpdeskPage = () => {
  return (
    <AppLayout>
      <div className="placeholder-page">
        <div className="placeholder-content">
          <div className="placeholder-icon">🎫</div>
          <h1>Helpdesk</h1>
          <p>Full ticketing system for managing complex support cases.</p>
          <div className="placeholder-features">
            <div className="feature-item">
              <span className="feature-icon">📝</span>
              <div>
                <h3>Ticket Management</h3>
                <p>Create, track, and resolve support tickets efficiently</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔀</span>
              <div>
                <h3>Smart Routing</h3>
                <p>Auto-assign tickets to the right agents</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⏱️</span>
              <div>
                <h3>SLA Management</h3>
                <p>Set and track service level agreements</p>
              </div>
            </div>
          </div>
          <button className="placeholder-btn">Coming Soon</button>
        </div>
      </div>
    </AppLayout>
  );
};

export default HelpdeskPage;



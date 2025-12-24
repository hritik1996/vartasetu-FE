import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import './PlaceholderPage.css';

const BillingPage = () => {
  return (
    <AppLayout>
      <div className="placeholder-page">
        <div className="placeholder-content">
          <div className="placeholder-icon">💳</div>
          <h1>Billing</h1>
          <p>Manage your subscription, invoices, and payment methods.</p>
          <div className="placeholder-features">
            <div className="feature-item">
              <span className="feature-icon">📋</span>
              <div>
                <h3>Current Plan</h3>
                <p>View and upgrade your subscription tier</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🧾</span>
              <div>
                <h3>Invoices</h3>
                <p>Download past invoices and payment receipts</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <div>
                <h3>Usage & Limits</h3>
                <p>Track your chat volume and agent seats</p>
              </div>
            </div>
          </div>
          <button className="placeholder-btn">Coming Soon</button>
        </div>
      </div>
    </AppLayout>
  );
};

export default BillingPage;



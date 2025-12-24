import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import './EngagePage.css';

// Sample visitor data (in production, this would come from API/socket)
const sampleVisitors = [
  {
    id: 1,
    name: 'Priya Sharma',
    email: 'priya.sharma@mail.com',
    activity: 'chatting',
    country: 'India',
    countryCode: 'IN',
    currentPage: '/pricing',
    duration: '5m 23s'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    email: 'rahul.v@mail.com',
    activity: 'browsing',
    country: 'India',
    countryCode: 'IN',
    currentPage: '/features',
    duration: '2m 10s'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    email: 'amit.k@mail.com',
    activity: 'chatting',
    country: 'India',
    countryCode: 'IN',
    currentPage: '/contact',
    duration: '8m 45s'
  },
  {
    id: 4,
    name: 'Neha Gupta',
    email: 'neha.g@mail.com',
    activity: 'browsing',
    country: 'United States',
    countryCode: 'US',
    currentPage: '/demo',
    duration: '1m 32s'
  }
];

const EngagePage = () => {
  const [activeTab, setActiveTab] = useState('traffic');
  const [visitors] = useState(sampleVisitors);
  const [widgetInstalled] = useState(false);

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getCountryFlag = (code) => {
    const flags = {
      'IN': '🇮🇳',
      'US': '🇺🇸',
      'GB': '🇬🇧',
      'CA': '🇨🇦',
      'AU': '🇦🇺',
      'DE': '🇩🇪'
    };
    return flags[code] || '🌍';
  };

  return (
    <AppLayout>
      <div className="engage-page">
        {/* Header */}
        <div className="engage-header">
          <div className="engage-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
            <h1>Traffic</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="engage-tabs">
          <button 
            className={`engage-tab ${activeTab === 'traffic' ? 'active' : ''}`}
            onClick={() => setActiveTab('traffic')}
          >
            Engage
          </button>
        </div>

        {/* Content */}
        <div className="engage-content">
          {/* Visitors Table */}
          <div className="visitors-table-container">
            <table className="visitors-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Activity</th>
                  <th>Actions</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <tr key={visitor.id} className="visitor-row">
                    <td>
                      <div 
                        className="visitor-avatar"
                        style={{ background: getAvatarColor(visitor.name) }}
                      >
                        {getInitials(visitor.name)}
                      </div>
                    </td>
                    <td>
                      <span className="visitor-name">{visitor.name}</span>
                    </td>
                    <td>
                      <span className="visitor-email">{visitor.email}</span>
                    </td>
                    <td>
                      <div className="activity-badge">
                        <span className={`activity-dot ${visitor.activity}`}></span>
                        <span className="activity-text">
                          {visitor.activity === 'chatting' ? 'Chatting' : 'Browsing'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {visitor.activity === 'chatting' ? (
                          <button className="action-btn outline">
                            Supervise chat
                          </button>
                        ) : (
                          <>
                            <button className="action-btn primary">
                              Start chat
                            </button>
                            <button className="action-btn icon-only">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="country-info">
                        <span className="country-flag">{getCountryFlag(visitor.countryCode)}</span>
                        <span className="country-name">{visitor.country}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Install Widget CTA */}
          {!widgetInstalled && (
            <div className="widget-cta">
              <h2>Install chat widget to see visitors</h2>
              <p>
                There are visitors waiting on your website. Install the
                chat widget to connect with visitors browsing your site.
              </p>
              <div className="cta-buttons">
                <button className="cta-btn primary">
                  Install chat widget
                </button>
                <button className="cta-btn secondary">
                  Invite developer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default EngagePage;

import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import './ReportsPage.css';

const ReportsPage = () => {
  const [activeView, setActiveView] = useState('last-7-days');
  const [activeTab, setActiveTab] = useState('my-stats');
  const [summaryExpanded, setSummaryExpanded] = useState(true);
  const [chatsExpanded, setChatsExpanded] = useState(false);
  const [agentsExpanded, setAgentsExpanded] = useState(false);
  const [customersExpanded, setCustomersExpanded] = useState(false);
  const [insightsExpanded, setInsightsExpanded] = useState(false);
  const [ecommerceExpanded, setEcommerceExpanded] = useState(false);
  const [exportExpanded, setExportExpanded] = useState(false);

  const daysOfWeek = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <AppLayout>
      <div className="reports-page">
        {/* Sidebar */}
        <aside className="reports-sidebar">
          <h2 className="sidebar-title">Reports</h2>
          
          <div className="sidebar-section">
            <div className="section-label">My saved views</div>
          </div>

          {/* Summary Section */}
          <div className="sidebar-section">
            <button
              className="section-toggle"
              onClick={() => setSummaryExpanded(!summaryExpanded)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: summaryExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              <span>Summary</span>
            </button>
            {summaryExpanded && (
              <div className="section-items">
                <button
                  className={`section-item ${activeView === 'last-7-days' ? 'active' : ''}`}
                  onClick={() => setActiveView('last-7-days')}
                >
                  Last 7 days
                </button>
                <button
                  className={`section-item ${activeView === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveView('dashboard')}
                >
                  Dashboard
                </button>
              </div>
            )}
          </div>

          {/* Chats Section */}
          <div className="sidebar-section">
            <button
              className="section-toggle"
              onClick={() => setChatsExpanded(!chatsExpanded)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: chatsExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              <span>Chats</span>
            </button>
            {chatsExpanded && (
              <div className="section-items">
                <button className="section-item">Total chats</button>
                <button className="section-item">Chat engagement</button>
                <button className="section-item">Missed chats</button>
                <button className="section-item">Campaigns conversion</button>
                <button className="section-item">Tags usage</button>
                <button className="section-item">Chat satisfaction</button>
                <button className="section-item">Chat availability</button>
                <button className="section-item">Chat forms</button>
                <button className="section-item">Chat duration</button>
              </div>
            )}
          </div>

          {/* Agents Section */}
          <div className="sidebar-section">
            <button
              className="section-toggle"
              onClick={() => setAgentsExpanded(!agentsExpanded)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: agentsExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              <span>Agents</span>
            </button>
            {agentsExpanded && (
              <div className="section-items">
                <button className="section-item">Agent performance</button>
                <button className="section-item">Chat response times</button>
                <button className="section-item">Staffing prediction</button>
                <button className="section-item">Agent activity</button>
              </div>
            )}
          </div>

          {/* Customers Section */}
          <div className="sidebar-section">
            <button
              className="section-toggle"
              onClick={() => setCustomersExpanded(!customersExpanded)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: customersExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              <span>Customers</span>
            </button>
            {customersExpanded && (
              <div className="section-items">
                <button className="section-item">Queued customers</button>
                <button className="section-item">Queue abandonment</button>
              </div>
            )}
          </div>

          {/* Insights Section */}
          <div className="sidebar-section">
            <button
              className="section-toggle"
              onClick={() => setInsightsExpanded(!insightsExpanded)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: insightsExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              <span>Insights</span>
            </button>
            {insightsExpanded && (
              <div className="section-items">
                <button className="section-item">Top customer questions</button>
                <button className="section-item">Alerts</button>
              </div>
            )}
          </div>

          {/* Ecommerce Section */}
          <div className="sidebar-section">
            <button
              className="section-toggle"
              onClick={() => setEcommerceExpanded(!ecommerceExpanded)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: ecommerceExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              <span>Ecommerce</span>
            </button>
            {ecommerceExpanded && (
              <div className="section-items">
                <button className="section-item">Achieved goals</button>
                <button className="section-item">Tracked sales</button>
              </div>
            )}
          </div>

          {/* Export Section */}
          <div className="sidebar-section">
            <button
              className="section-toggle"
              onClick={() => setExportExpanded(!exportExpanded)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: exportExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                <polyline points="9 18 15 12 9 6"/>
              </svg>
              <span>Export raw data</span>
            </button>
            {exportExpanded && (
              <div className="section-items">
                <button className="section-item">Generate report</button>
                <button className="section-item">Scheduled reports</button>
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="sidebar-section">
            <button className="section-item">Reviews</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="reports-main">
          <div className="reports-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
            <h1>Last 7 days</h1>
          </div>

          <div className="reports-content">
            {/* Tabs */}
            <div className="report-tabs">
              <button
                className={`report-tab ${activeTab === 'my-stats' ? 'active' : ''}`}
                onClick={() => setActiveTab('my-stats')}
              >
                My stats
              </button>
              <button
                className={`report-tab ${activeTab === 'all-agents' ? 'active' : ''}`}
                onClick={() => setActiveTab('all-agents')}
              >
                All agents
              </button>
            </div>

            {/* Total Chats Section */}
            <div className="report-section">
              <h3 className="section-heading">Total chats</h3>
              
              <div className="chart-container">
                <div className="chart-empty-state">
                  <div className="empty-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <h3>No chats yet</h3>
                  <p>
                    It's ok to start by <a href="#test">chatting with yourself</a>
                  </p>
                </div>

                {/* Chart Axis */}
                <div className="chart-axis">
                  <div className="y-axis">
                    <span>0</span>
                  </div>
                  <div className="x-axis">
                    {daysOfWeek.map((day, index) => (
                      <div key={index} className="x-axis-item">
                        <div className="axis-line"></div>
                        <span className="axis-label">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="metric-info">
                  <span className="metric-label">Queued visitors</span>
                  <span className="metric-value">0</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                </div>
                <div className="metric-info">
                  <span className="metric-label">Goals</span>
                </div>
                <button className="metric-add-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add
                </button>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                  </svg>
                </div>
                <div className="metric-info">
                  <span className="metric-label">Chat satisfaction</span>
                  <span className="metric-value">-</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                </div>
                <div className="metric-info">
                  <span className="metric-label">Sales</span>
                </div>
                <button className="metric-add-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="report-footer">
              <p>This report was generated on {getCurrentDateTime()}</p>
              <p>All reports are displayed in your local time.</p>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default ReportsPage;

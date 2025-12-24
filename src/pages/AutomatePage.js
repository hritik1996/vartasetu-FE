import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import './AutomatePage.css';

const AutomatePage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: 'overview' },
    { id: 'chatbots', label: 'Chatbots', icon: 'bot' },
    { 
      id: 'knowledge', 
      label: 'Knowledge hub', 
      icon: 'knowledge',
      children: [
        { id: 'all-sources', label: 'All sources', count: 0 },
        { id: 'websites', label: 'Websites', count: 0 },
        { id: 'pdf-files', label: 'PDF files', count: 0 }
      ]
    },
    { 
      id: 'canned', 
      label: 'Canned responses', 
      icon: 'canned',
      children: [
        { id: 'responses-list', label: 'Responses list' },
        { id: 'suggested', label: 'Suggested responses' }
      ]
    },
    { id: 'routing', label: 'Routing rules', icon: 'routing' },
    { id: 'workflows', label: 'Workflows', icon: 'workflow', badge: 'Beta' }
  ];

  const speedUpFeatures = [
    {
      icon: 'copilot',
      title: 'Chat with Copilot',
      description: 'Get instant answers from AI assistant'
    },
    {
      icon: 'hashtag',
      title: 'Get canned response suggestions',
      description: 'Suggest responses based on specific events'
    },
    {
      icon: 'enhance',
      title: 'Enhance your messages',
      description: 'Adjust the tone, fix grammar and more'
    },
    {
      icon: 'reply',
      title: 'Get Reply suggestions',
      description: 'Suggest smart replies while chatting'
    }
  ];

  const automateFeatures = [
    {
      icon: 'summarize',
      title: 'Summarize your chats',
      description: 'Get chat summaries in form of a simple list'
    },
    {
      icon: 'autotag',
      title: 'Auto-tag your chats',
      description: 'Tag chats based on the canned response used'
    },
    {
      icon: 'aitag',
      title: 'Get AI tag suggestions',
      description: 'Suggest tags based on previous tag usage'
    }
  ];

  const efficiencyFeatures = [
    {
      icon: 'route',
      title: 'Route your chats',
      description: 'Direct customers to appropriate teams'
    },
    {
      icon: 'hours',
      title: 'Set working hours',
      description: 'Guarantee proper staffing for each shift'
    },
    {
      icon: 'workflow',
      title: 'Set up Workflows',
      description: 'Automate manual processes and routine tasks',
      badge: 'Beta'
    }
  ];

  const renderIcon = (type) => {
    const icons = {
      overview: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="9" y1="21" x2="9" y2="9"/>
        </svg>
      ),
      bot: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="10" rx="2"/>
          <circle cx="12" cy="5" r="2"/>
          <path d="M12 7v4"/>
          <line x1="8" y1="16" x2="8" y2="16"/>
          <line x1="16" y1="16" x2="16" y2="16"/>
        </svg>
      ),
      knowledge: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      canned: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <line x1="9" y1="10" x2="15" y2="10"/>
        </svg>
      ),
      routing: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 3 21 3 21 8"/>
          <line x1="4" y1="20" x2="21" y2="3"/>
          <polyline points="21 16 21 21 16 21"/>
          <line x1="15" y1="15" x2="21" y2="21"/>
          <line x1="4" y1="4" x2="9" y2="9"/>
        </svg>
      ),
      workflow: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
      ),
      copilot: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      hashtag: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="9" x2="20" y2="9"/>
          <line x1="4" y1="15" x2="20" y2="15"/>
          <line x1="10" y1="3" x2="8" y2="21"/>
          <line x1="16" y1="3" x2="14" y2="21"/>
        </svg>
      ),
      enhance: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      reply: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 17 4 12 9 7"/>
          <path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
        </svg>
      ),
      summarize: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="6" x2="21" y2="6"/>
          <line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      ),
      autotag: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
      ),
      aitag: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      route: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2"/>
          <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>
        </svg>
      ),
      hours: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      )
    };
    return icons[type] || icons.overview;
  };

  return (
    <AppLayout>
      <div className="automate-page">
        {/* Sidebar */}
        <aside className="automate-sidebar">
          <h2 className="sidebar-title">Automate</h2>
          <nav className="sidebar-nav">
            {sidebarItems.map((item) => (
              <div key={item.id} className="nav-group">
                <button
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span className="nav-icon">{renderIcon(item.icon)}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </button>
                {item.children && (
                  <div className="nav-children">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        className={`nav-child ${activeSection === child.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(child.id)}
                      >
                        <span>{child.label}</span>
                        {child.count !== undefined && (
                          <span className="child-count">{child.count}</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="automate-main">
          {/* Header */}
          <div className="automate-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
            <h1>Overview</h1>
          </div>

          {/* Hero Section */}
          <div className="automate-hero">
            <h2>
              Save <span className="highlight">up to 50% of time</span> by automating customer service
            </h2>
            <div className="hero-benefits">
              <div className="benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>provide 24/7 availability</span>
              </div>
              <div className="benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>respond 3x faster</span>
              </div>
              <div className="benefit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>improve customer satisfaction</span>
              </div>
            </div>
          </div>

          {/* ChatBot Card */}
          <div className="chatbot-card">
            <div className="chatbot-content">
              <h3>Support and sell automatically with ChatBot</h3>
              <p>
                Build a bot with no coding skills that will provide
                round-the-clock support and take a thousand chats
                at the same time.
              </p>
              <button className="setup-btn">Set up ChatBot</button>
            </div>
            <div className="chatbot-preview">
              <div className="preview-avatar">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className="preview-bubble visitor">Hi there!</div>
              <div className="preview-bubble agent">
                <span>Hey! Good to see you again.</span>
                <span>How can I help you today?</span>
                <span>I'm here to assist! 😊</span>
              </div>
              <div className="preview-bot-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Speed up chatting */}
          <section className="feature-section">
            <h3 className="section-title">Speed up chatting</h3>
            <div className="feature-grid">
              {speedUpFeatures.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{renderIcon(feature.icon)}</div>
                  <div className="feature-info">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Automate routine tasks */}
          <section className="feature-section">
            <h3 className="section-title">Automate routine tasks</h3>
            <div className="feature-grid">
              {automateFeatures.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{renderIcon(feature.icon)}</div>
                  <div className="feature-info">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ensure team efficiency */}
          <section className="feature-section">
            <h3 className="section-title">Ensure team efficiency</h3>
            <div className="feature-grid">
              {efficiencyFeatures.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{renderIcon(feature.icon)}</div>
                  <div className="feature-info">
                    <h4>
                      {feature.title}
                      {feature.badge && <span className="feature-badge">{feature.badge}</span>}
                    </h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </AppLayout>
  );
};

export default AutomatePage;

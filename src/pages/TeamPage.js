import React, { useState, useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { useAuth } from '../hooks/useAuth';
import './TeamPage.css';

const TeamPage = () => {
  const { agent } = useAuth();
  const [activeTab, setActiveTab] = useState('agents');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [groupsExpanded, setGroupsExpanded] = useState(true);
  const [workingHoursExpanded, setWorkingHoursExpanded] = useState(false);
  const [performanceExpanded, setPerformanceExpanded] = useState(false);

  // Sample agents data (in production, fetch from API)
  const [agents] = useState([
    {
      id: 1,
      name: agent?.name || 'Agent Name',
      email: agent?.email || 'agent@vartasetu.com',
      role: 'Owner',
      status: 'Accepting chats',
      isYou: true,
      avatar: null,
      chatLimit: 6,
      lastSeen: 'Just now',
      groups: ['General'],
      totalChats: 0,
      goals: []
    }
  ]);

  useEffect(() => {
    if (agents.length > 0 && !selectedAgent) {
      setSelectedAgent(agents[0]);
      setShowDetailsPanel(true);
    }
  }, [agents, selectedAgent]);

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="team-page">
        {/* Main Content */}
        <div className="team-main">
          <div className="team-header">
            <h1>Team</h1>
          </div>

          {/* Tabs */}
          <div className="team-tabs">
            <button
              className={`team-tab ${activeTab === 'agents' ? 'active' : ''}`}
              onClick={() => setActiveTab('agents')}
            >
              Agents
            </button>
            <button
              className={`team-tab ${activeTab === 'chatbots' ? 'active' : ''}`}
              onClick={() => setActiveTab('chatbots')}
            >
              Chatbots
            </button>
            <button
              className={`team-tab ${activeTab === 'groups' ? 'active' : ''}`}
              onClick={() => setActiveTab('groups')}
            >
              Groups
            </button>
            <button
              className={`team-tab ${activeTab === 'suspended' ? 'active' : ''}`}
              onClick={() => setActiveTab('suspended')}
            >
              Suspended agents
            </button>
          </div>

          {/* Actions Bar */}
          <div className="team-actions-bar">
            <div className="search-input-wrapper">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search agent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="action-buttons">
              <button className="action-btn outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Add new chatbot
              </button>
              <button className="action-btn primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Invite agents
              </button>
            </div>
          </div>

          {/* Agents List */}
          <div className="team-content">
            <div className="agents-section">
              <h3>Active ({filteredAgents.length})</h3>
              
              <table className="agents-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>
                      Status
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="18 15 12 9 6 15"/>
                      </svg>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="add-agent-row">
                    <td colSpan="4">
                      <button className="add-agent-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19"/>
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Add new agent
                      </button>
                    </td>
                  </tr>
                  {filteredAgents.map((agentItem) => (
                    <tr
                      key={agentItem.id}
                      className={`agent-row ${selectedAgent?.id === agentItem.id ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedAgent(agentItem);
                        setShowDetailsPanel(true);
                      }}
                    >
                      <td>
                        <div className="agent-info">
                          <div className="agent-avatar">
                            {getInitials(agentItem.name)}
                          </div>
                          <div className="agent-details">
                            <span className="agent-name">
                              {agentItem.name}
                              {agentItem.isYou && <span className="you-badge">(You)</span>}
                            </span>
                            <span className="agent-email">{agentItem.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="role-badge">{agentItem.role}</span>
                      </td>
                      <td>
                        <div className="status-cell">
                          <span className="status-indicator active"></span>
                          <span className="status-text">{agentItem.status}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </div>
                      </td>
                      <td>
                        <button className="more-btn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="1"/>
                            <circle cx="19" cy="12" r="1"/>
                            <circle cx="5" cy="12" r="1"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Details Panel */}
        {showDetailsPanel && selectedAgent && (
          <div className="team-details-panel">
            <div className="details-header">
              <h2>Details</h2>
              <button className="close-btn" onClick={() => setShowDetailsPanel(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="details-content">
              {/* Agent Profile */}
              <div className="agent-profile">
                <div className="profile-avatar-large">
                  {getInitials(selectedAgent.name)}
                  <span className="online-indicator"></span>
                </div>
                <div className="profile-info">
                  <h3>
                    {selectedAgent.name}
                    <span className="owner-badge">{selectedAgent.role}</span>
                  </h3>
                  <span className="profile-title">Product Expert</span>
                  <span className="profile-email">{selectedAgent.email}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="quick-stats">
                <div className="stat-item">
                  <span className="stat-label">Chat limit:</span>
                  <span className="stat-value">{selectedAgent.chatLimit} concurrent chats</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Login status:</span>
                  <span className="stat-value status-active">{selectedAgent.status}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Last seen:</span>
                  <span className="stat-value">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    {selectedAgent.lastSeen}
                  </span>
                </div>
              </div>

              {/* Groups Section */}
              <div className="collapsible-section">
                <button
                  className="section-header"
                  onClick={() => setGroupsExpanded(!groupsExpanded)}
                >
                  <span>Groups ({selectedAgent.groups.length})</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transform: groupsExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {groupsExpanded && (
                  <div className="section-content">
                    {selectedAgent.groups.map((group, index) => (
                      <div key={index} className="group-item">
                        <div className="group-icon">G</div>
                        <span>{group}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Working Hours Section */}
              <div className="collapsible-section">
                <button
                  className="section-header"
                  onClick={() => setWorkingHoursExpanded(!workingHoursExpanded)}
                >
                  <span>Working hours</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transform: workingHoursExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {workingHoursExpanded && (
                  <div className="section-content">
                    <div className="feature-promo">
                      <div className="promo-icon">⏰</div>
                      <div className="promo-text">
                        <strong>Set working hours</strong> to better manage staffing.
                      </div>
                    </div>
                    <div className="promo-actions">
                      <button className="promo-btn outline">Get feature</button>
                      <button className="promo-btn text">Learn more</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Performance Section */}
              <div className="collapsible-section">
                <button
                  className="section-header"
                  onClick={() => setPerformanceExpanded(!performanceExpanded)}
                >
                  <span>Performance</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transform: performanceExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {performanceExpanded && (
                  <div className="section-content">
                    <div className="performance-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      <span>Total chats</span>
                    </div>
                    <div className="performance-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                      <span>Goals</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default TeamPage;

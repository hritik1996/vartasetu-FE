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
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmails, setInviteEmails] = useState([
    { id: 1, email: '', role: 'Admin (billing access)' },
    { id: 2, email: '', role: 'Admin (billing access)' },
    { id: 3, email: '', role: 'Admin (billing access)' },
    { id: 4, email: '', role: 'Admin (billing access)' }
  ]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

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

  const handleEmailChange = (id, value) => {
    setInviteEmails(inviteEmails.map(item =>
      item.id === id ? { ...item, email: value } : item
    ));
  };

  const handleRoleChange = (id, value) => {
    setInviteEmails(inviteEmails.map(item =>
      item.id === id ? { ...item, role: value } : item
    ));
  };

  const handleCopyLink = () => {
    const inviteLink = `${window.location.origin}/invite?token=sample-token`;
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleSendInvites = () => {
    const validEmails = inviteEmails.filter(item => item.email.trim() !== '');
    if (validEmails.length === 0) {
      alert('Please enter at least one email address');
      return;
    }
    // In production, send API request to send invites
    console.log('Sending invites to:', validEmails);
    alert(`Invites sent to ${validEmails.length} email(s)`);
    setShowInviteModal(false);
    setInviteEmails([
      { id: 1, email: '', role: 'Admin (billing access)' },
      { id: 2, email: '', role: 'Admin (billing access)' },
      { id: 3, email: '', role: 'Admin (billing access)' },
      { id: 4, email: '', role: 'Admin (billing access)' }
    ]);
  };

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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
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
              <button className="action-btn primary" onClick={() => setShowInviteModal(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
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
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="add-agent-row">
                    <td colSpan="4">
                      <button className="add-agent-btn" onClick={() => setShowInviteModal(true)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
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
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </td>
                      <td style={{ position: 'relative' }}>
                        <button
                          className="more-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === agentItem.id ? null : agentItem.id);
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                          </svg>
                        </button>

                        {openMenuId === agentItem.id && (
                          <div className="agent-menu-dropdown">
                            <button
                              className="agent-menu-item"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Edit profile clicked');
                                setOpenMenuId(null);
                              }}
                            >
                              Edit profile
                            </button>
                            <button
                              className="agent-menu-item"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Change chat limit clicked');
                                setOpenMenuId(null);
                              }}
                            >
                              Change chat limit
                            </button>
                            <button
                              className="agent-menu-item"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('View agent reports clicked');
                                setOpenMenuId(null);
                              }}
                            >
                              View agent reports
                            </button>
                          </div>
                        )}
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
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
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
                    <polyline points="6 9 12 15 18 9" />
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
                    <polyline points="6 9 12 15 18 9" />
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
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {performanceExpanded && (
                  <div className="section-content">
                    <div className="performance-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>Total chats</span>
                    </div>
                    <div className="performance-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                      <span>Goals</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
            <div className="invite-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Invite people to LiveChat</h2>
                <button className="modal-close-btn" onClick={() => setShowInviteModal(false)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-section">
                  <label className="modal-label">Email addresses</label>
                  {inviteEmails.map((item) => (
                    <div key={item.id} className="invite-row">
                      <input
                        type="email"
                        className="invite-email-input"
                        placeholder={`Eg. chatting.agent${item.id}@gmail.com`}
                        value={item.email}
                        onChange={(e) => handleEmailChange(item.id, e.target.value)}
                      />
                      <select
                        className="invite-role-select"
                        value={item.role}
                        onChange={(e) => handleRoleChange(item.id, e.target.value)}
                      >
                        <option value="Admin (billing access)">Admin (billing access)</option>
                        <option value="Agent">Agent</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                    </div>
                  ))}
                </div>

                <div className="modal-divider">
                  <button className="copy-link-btn" onClick={handleCopyLink}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    {linkCopied ? 'Link copied!' : 'Copy invite link'}
                  </button>
                </div>
              </div>

              <div className="modal-footer">
                <button className="modal-btn-send" onClick={handleSendInvites}>
                  Send invites
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default TeamPage;

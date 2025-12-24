import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import { useAuth } from '../hooks/useAuth';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { agent } = useAuth();
  const [fullName, setFullName] = useState(agent?.name || '');
  const [jobTitle, setJobTitle] = useState('Product Expert');
  const [chatLimit, setChatLimit] = useState(6);
  const [agentStatus, setAgentStatus] = useState('accept');
  const [timeFormat, setTimeFormat] = useState('12-hour');
  const [showGroupSelector, setShowGroupSelector] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState(['General']);
  const [groupSearch, setGroupSearch] = useState('');

  const availableGroups = ['General', 'Sales', 'Support', 'Technical'];

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleGroupToggle = (group) => {
    if (selectedGroups.includes(group)) {
      setSelectedGroups(selectedGroups.filter(g => g !== group));
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  };

  const filteredGroups = availableGroups.filter(g => 
    g.toLowerCase().includes(groupSearch.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="profile-page">
        <div className="profile-container">
          {/* Header */}
          <div className="profile-header">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Back
            </button>
            <h1>Profile</h1>
          </div>

          {/* Agent Info Card */}
          <div className="agent-info-card">
            <div className="agent-avatar-large">
              {getInitials(agent?.name || 'Agent')}
              <span className="online-badge"></span>
            </div>
            <div className="agent-info-text">
              <div className="agent-name-row">
                <h2>{agent?.name || 'Agent Name'}</h2>
                <span className="owner-badge">Owner</span>
              </div>
              <span className="agent-job-title">{jobTitle}</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="profile-section">
            <h3 className="section-title">Details</h3>

            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Job title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Chat limit</label>
              <input
                type="number"
                value={chatLimit}
                onChange={(e) => setChatLimit(e.target.value)}
                className="form-input"
              />
              <span className="form-hint">3 is optimal for rookies</span>
            </div>

            <div className="form-group">
              <button className="link-btn">Change password</button>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={agent?.email || ''}
                disabled
                className="form-input disabled"
              />
            </div>

            <div className="form-group">
              <label>Member of {selectedGroups.length} group{selectedGroups.length !== 1 ? 's' : ''}</label>
              <button 
                className="assign-btn"
                onClick={() => setShowGroupSelector(!showGroupSelector)}
              >
                Assign to groups
              </button>

              {showGroupSelector && (
                <div className="group-selector">
                  <div className="group-search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Find group"
                      value={groupSearch}
                      onChange={(e) => setGroupSearch(e.target.value)}
                    />
                  </div>
                  <div className="group-list">
                    {filteredGroups.map((group) => (
                      <label key={group} className="group-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedGroups.includes(group)}
                          onChange={() => handleGroupToggle(group)}
                        />
                        <span className="group-icon">G</span>
                        <span>{group}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {selectedGroups.length > 0 && (
                <div className="selected-groups">
                  {selectedGroups.map((group) => (
                    <div key={group} className="group-tag">
                      <span className="group-icon-small">G</span>
                      <span>{group}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Agent Status Section */}
          <div className="profile-section">
            <h3 className="section-title">Agent status after logging in</h3>
            
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="agentStatus"
                  value="accept"
                  checked={agentStatus === 'accept'}
                  onChange={(e) => setAgentStatus(e.target.value)}
                />
                <div className="radio-content">
                  <span className="radio-label">Accept chats</span>
                </div>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="agentStatus"
                  value="dont-accept"
                  checked={agentStatus === 'dont-accept'}
                  onChange={(e) => setAgentStatus(e.target.value)}
                />
                <div className="radio-content">
                  <span className="radio-label">Don't accept chats</span>
                </div>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="agentStatus"
                  value="working-hours"
                  checked={agentStatus === 'working-hours'}
                  onChange={(e) => setAgentStatus(e.target.value)}
                />
                <div className="radio-content">
                  <span className="radio-label">According to working hours</span>
                </div>
              </label>

              {agentStatus === 'working-hours' && (
                <div className="working-hours-section">
                  <button className="add-hours-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add working hours
                  </button>
                  <p className="hours-hint">
                    Set custom hours for when the agent will be accepting chats each day.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="profile-section">
            <h3 className="section-title">Two-factor authentication (2FA)</h3>
            <p className="section-description">
              2FA makes it more difficult for someone else to sign in to your account. 
              Use authentication app like Google authenticator to protect your account.
            </p>
            <button className="secondary-btn">Enable 2FA</button>
          </div>

          {/* Role and Permissions */}
          <div className="profile-section">
            <h3 className="section-title">Role and permissions</h3>
            <p className="section-text">
              You're the owner and have all permissions.
            </p>
          </div>

          {/* Time Format */}
          <div className="profile-section">
            <h3 className="section-title">Time format</h3>
            
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="timeFormat"
                  value="12-hour"
                  checked={timeFormat === '12-hour'}
                  onChange={(e) => setTimeFormat(e.target.value)}
                />
                <div className="radio-content">
                  <span className="radio-label">12-hour (09:23:00 pm)</span>
                </div>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="timeFormat"
                  value="24-hour"
                  checked={timeFormat === '24-hour'}
                  onChange={(e) => setTimeFormat(e.target.value)}
                />
                <div className="radio-content">
                  <span className="radio-label">24-hour (21:23:00)</span>
                </div>
              </label>
            </div>
          </div>

          {/* Email Updates */}
          <div className="profile-section">
            <h3 className="section-title">Email updates</h3>
            <p className="section-description">
              Receive notifications about important updates and changes to your account.
            </p>
          </div>

          {/* Save Button */}
          <div className="profile-actions">
            <button className="save-btn">Save changes</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;



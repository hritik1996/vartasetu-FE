import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import SidebarNav from './SidebarNav';
import './AppLayout.css';

const AppLayout = ({ children }) => {
  const { agent } = useAuth();
  const [searchFocused, setSearchFocused] = useState(false);

  // Calculate trial days (placeholder)
  const trialDays = 29;

  return (
    <div className="app-layout">
      <SidebarNav />
      <div className="app-body">
        {/* Top Bar */}
        <header className="app-header">
          {/* Trial Banner */}
          <div className="trial-banner">
            <span className="trial-days">{trialDays}</span>
            <span className="trial-text">days left in your trial.</span>
            <button className="upgrade-btn">Upgrade now</button>
          </div>

          {/* Search Bar */}
          <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search or ask"
              className="search-input"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="search-shortcut">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="header-actions">
            <div className="team-avatars">
              <div className="avatar-stack">
                <div className="mini-avatar" style={{ background: '#4a9eff' }}>
                  {agent?.name?.charAt(0) || 'A'}
                </div>
              </div>
              <span className="team-count">2</span>
            </div>
            <button className="invite-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
              Invite
            </button>
            <div className="header-avatar">
              {agent?.name?.charAt(0) || 'A'}
              <span className="online-indicator"></span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;

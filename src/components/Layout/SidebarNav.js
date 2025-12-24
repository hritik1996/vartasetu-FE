import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './SidebarNav.css';

// SVG Icons as components for clean look
const Icons = {
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  chats: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  engage: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  automate: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  archives: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="21 8 21 21 3 21 3 8"/>
      <rect x="1" y="3" width="22" height="5"/>
      <line x1="10" y1="12" x2="14" y2="12"/>
    </svg>
  ),
  team: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  reports: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  apps: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  helpdesk: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  ),
  billing: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  settings: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  news: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  help: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  keyboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
      <line x1="6" y1="8" x2="6.01" y2="8"/>
      <line x1="10" y1="8" x2="10.01" y2="8"/>
      <line x1="14" y1="8" x2="14.01" y2="8"/>
      <line x1="18" y1="8" x2="18.01" y2="8"/>
      <line x1="8" y1="12" x2="8.01" y2="12"/>
      <line x1="12" y1="12" x2="12.01" y2="12"/>
      <line x1="16" y1="12" x2="16.01" y2="12"/>
      <line x1="7" y1="16" x2="17" y2="16"/>
    </svg>
  ),
  download: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  company: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  logout: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  bug: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
};

// Main navigation items
const mainNavItems = [
  { id: 'home', label: 'Home', icon: Icons.home, to: '/home' },
  { id: 'chats', label: 'Chats', icon: Icons.chats, to: '/dashboard' },
  { id: 'engage', label: 'Engage', icon: Icons.engage, to: '/engage' },
  { id: 'automate', label: 'Automate', icon: Icons.automate, to: '/automate' },
  { id: 'archives', label: 'Archives', icon: Icons.archives, to: '/archives' },
  { id: 'team', label: 'Team', icon: Icons.team, to: '/team' },
  { id: 'reports', label: 'Reports', icon: Icons.reports, to: '/reports' },
  { id: 'apps', label: 'Apps', icon: Icons.apps, to: '/apps' },
  { id: 'helpdesk', label: 'Helpdesk', icon: Icons.helpdesk, to: '/helpdesk' }
];

// Bottom navigation items
const bottomNavItems = [
  { id: 'billing', label: 'Billing', icon: Icons.billing, to: '/billing' },
  { id: 'settings', label: 'Settings', icon: Icons.settings, to: '/settings', hasBadge: true },
  { id: 'news', label: 'News', icon: Icons.news, to: '/news' }
];

const SidebarNav = () => {
  const location = useLocation();
  const { agent, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [acceptChats, setAcceptChats] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <aside className="sidebar-nav">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="url(#logoGrad)"/>
            <path d="M7 8h10M7 12h6M7 16h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="24" y2="24">
                <stop stopColor="#ff5f2d"/>
                <stop offset="1" stopColor="#ff9500"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-main-nav">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive || location.pathname.startsWith(item.to) ? 'active' : ''}`
            }
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-tooltip">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <nav className="sidebar-bottom-nav">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''} ${item.hasBadge ? 'has-badge' : ''}`
            }
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.hasBadge && <span className="nav-badge"></span>}
            <span className="nav-tooltip">{item.label}</span>
          </NavLink>
        ))}

        {/* Profile Button */}
        <div className="profile-wrapper">
          <button
            className={`sidebar-link profile-btn ${profileOpen ? 'active' : ''}`}
            onClick={() => setProfileOpen(!profileOpen)}
            title="Profile"
          >
            <div className="profile-avatar">
              {getInitials(agent?.name)}
              <span className={`status-dot ${acceptChats ? 'online' : 'away'}`}></span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <>
              <div className="profile-backdrop" onClick={() => setProfileOpen(false)}></div>
              <div className="profile-dropdown">
                <div className="profile-header">
                  <div className="profile-avatar-lg">
                    {getInitials(agent?.name)}
                  </div>
                  <div className="profile-info">
                    <span className="profile-name">{agent?.name || 'Agent'}</span>
                    <span className="profile-email">{agent?.email || 'agent@vartasetu.com'}</span>
                  </div>
                </div>

                <div className="profile-section">
                  <div className="profile-toggle-row">
                    <span>Accept chats</span>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={acceptChats}
                        onChange={() => setAcceptChats(!acceptChats)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="profile-toggle-row">
                    <span>Dark mode <span className="info-icon">ⓘ</span></span>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <button className="profile-menu-item has-alert">
                    <span>Notification preferences</span>
                    <span className="alert-dot"></span>
                  </button>
                </div>

                <div className="profile-section">
                  <button className="profile-menu-item">
                    {Icons.download}
                    <span>Download apps</span>
                    <div className="app-icons">
                      <span>🤖</span>
                      <span>🍎</span>
                      <span>🖥️</span>
                    </div>
                  </button>
                </div>

                <div className="profile-section">
                  <button 
                    className="profile-menu-item"
                    onClick={() => {
                      setProfileOpen(false);
                      window.location.href = '/profile';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Profile</span>
                  </button>
                  <button className="profile-menu-item">
                    {Icons.help}
                    <span>Help Center</span>
                  </button>
                  <button className="profile-menu-item">
                    {Icons.bug}
                    <span>Report an issue</span>
                  </button>
                  <button className="profile-menu-item">
                    {Icons.keyboard}
                    <span>Keyboard shortcuts</span>
                  </button>
                  <button className="profile-menu-item">
                    {Icons.company}
                    <span>Company details</span>
                  </button>
                </div>

                <div className="profile-section">
                  <button className="profile-menu-item logout" onClick={handleLogout}>
                    {Icons.logout}
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default SidebarNav;

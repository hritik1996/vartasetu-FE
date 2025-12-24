import React from 'react';
import './ChatList.css';

const ChatList = ({
  conversations,
  selectedId,
  onSelect,
  loading,
  filter,
  onFilterChange,
  sortBy,
  onSortChange
}) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#22c55e';
      case 'waiting': return '#f59e0b';
      case 'closed': return '#9ca3af';
      default: return '#22c55e';
    }
  };

  return (
    <div className="chat-list-panel">
      {/* Header */}
      <div className="chat-list-header">
        <h2>Chats</h2>
      </div>

      {/* Filter Row */}
      <div className="chat-list-filters">
        <button 
          className={`filter-dropdown ${filter === 'my' ? 'active' : ''}`}
          onClick={() => onFilterChange(filter === 'my' ? 'all' : 'my')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          <span>My chats ({conversations.length})</span>
        </button>

        <button 
          className="sort-dropdown"
          onClick={() => onSortChange(sortBy === 'newest' ? 'oldest' : 'newest')}
        >
          <span>{sortBy === 'newest' ? 'Newest' : 'Oldest'}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>

      {/* Chat Items */}
      <div className="chat-list-items">
        {loading ? (
          <div className="chat-list-empty">
            <div className="loading-skeleton">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-lines">
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>
            </div>
            <div className="loading-skeleton">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-lines">
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>
            </div>
          </div>
        ) : conversations.length === 0 ? (
          <div className="chat-list-empty">
            <div className="empty-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
            <p>No active chats</p>
            <span>New conversations will appear here</span>
          </div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`chat-list-item ${selectedId === conv.id ? 'selected' : ''}`}
              onClick={() => onSelect(conv.id)}
            >
              <div className="chat-item-avatar">
                {getInitials(conv.visitorName || conv.visitorId)}
                <span 
                  className="status-indicator"
                  style={{ background: getStatusColor(conv.status) }}
                ></span>
              </div>
              <div className="chat-item-content">
                <div className="chat-item-header">
                  <span className="chat-item-name">
                    {conv.visitorName || `Visitor ${conv.visitorId?.substring(0, 6) || 'Unknown'}`}
                  </span>
                  <span className="chat-item-time">
                    {formatTime(conv.updatedAt || conv.createdAt)}
                  </span>
                </div>
                <p className="chat-item-preview">
                  {conv.lastMessage?.content || 'No messages yet'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;


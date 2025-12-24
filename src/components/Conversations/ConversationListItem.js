import React from 'react';
import './ConversationListItem.css';

const ConversationListItem = ({ conversation, isSelected, onClick }) => {
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getLastMessageSnippet = () => {
    if (conversation.lastMessage) {
      const content = conversation.lastMessage.content || '';
      return content.length > 50 ? content.substring(0, 50) + '...' : content;
    }
    return 'No messages yet';
  };

  return (
    <div
      className={`conversation-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="conversation-item-header">
        <div className="visitor-info">
          <span className="visitor-id">
            Visitor {conversation.visitorId ? conversation.visitorId.substring(0, 8) : 'N/A'}
          </span>
          <span className={`status-badge ${conversation.status || 'open'}`}>
            {conversation.status || 'open'}
          </span>
        </div>
        <span className="conversation-time">
          {formatTime(conversation.updatedAt || conversation.createdAt)}
        </span>
      </div>
      <div className="conversation-item-preview">
        {getLastMessageSnippet()}
      </div>
    </div>
  );
};

export default ConversationListItem;


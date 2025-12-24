import React from 'react';
import ConversationListItem from './ConversationListItem';
import './ConversationList.css';

const ConversationList = ({ conversations, selectedId, onSelect, loading }) => {
  if (loading) {
    return (
      <div className="conversation-list">
        <div className="conversation-list-header">
          <h2>Conversations</h2>
        </div>
        <div className="loading-state">Loading conversations...</div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="conversation-list">
        <div className="conversation-list-header">
          <h2>Conversations</h2>
        </div>
        <div className="empty-state">No conversations yet</div>
      </div>
    );
  }

  return (
    <div className="conversation-list">
      <div className="conversation-list-header">
        <h2>Conversations</h2>
        <span className="conversation-count">{conversations.length}</span>
      </div>
      <div className="conversation-items">
        {conversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedId === conversation.id}
            onClick={() => onSelect(conversation.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;


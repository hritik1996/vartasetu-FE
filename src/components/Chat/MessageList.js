import React from 'react';
import './MessageList.css';

const MessageList = ({ messages }) => {

  const formatMessageTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="no-messages">No messages yet. Start the conversation!</div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`message-item ${message.senderType === 'agent' ? 'agent' : 'visitor'}`}
          >
            <div className="message-bubble">
              <div className="message-content">{message.content}</div>
              <div className="message-time">{formatMessageTime(message.createdAt)}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;


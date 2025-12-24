import React, { useState, useEffect, useRef } from 'react';
import { getConversation, sendMessage } from '../../api/conversationsApi';
import './ChatArea.css';

const ChatArea = ({ conversationId, conversation, onMessageSent, newMessage, agentName }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [tags, setTags] = useState(['support']);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickReplies = [
    "Hi there! 👋 How can I help you today?",
    "Would you like me to help you with that?"
  ];

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    const loadMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getConversation(conversationId);
        setMessages(data.messages || []);
      } catch (err) {
        setError(err.message || 'Failed to load conversation');
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (newMessage && newMessage.conversationId === conversationId) {
      setMessages(prev => {
        if (prev.some(m => m.id === newMessage.message.id)) return prev;
        return [...prev, newMessage.message];
      });
    }
  }, [newMessage, conversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !conversationId) return;

    const content = inputValue;
    setInputValue('');

    try {
      const msg = await sendMessage(conversationId, content);
      setMessages(prev => [...prev, msg]);
      if (onMessageSent) onMessageSent(conversationId, msg);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getVisitorName = () => {
    return conversation?.visitorName || `Visitor ${conversation?.visitorId?.substring(0, 6) || ''}`;
  };

  // Empty state
  if (!conversationId) {
    return (
      <div className="chat-area-panel empty">
        <div className="empty-chat-state">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h3>Select a conversation</h3>
          <p>Choose a chat from the list to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-area-panel">
      {/* Chat Header */}
      <div className="chat-area-header">
        <div className="chat-title">
          <h3>{conversation?.visitorName || 'Chat'}</h3>
        </div>
        <div className="chat-header-actions">
          <button className="header-action-btn" onClick={() => setShowMenu(!showMenu)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2"/>
              <circle cx="12" cy="12" r="2"/>
              <circle cx="12" cy="19" r="2"/>
            </svg>
          </button>
          {showMenu && (
            <div className="chat-menu-dropdown">
              <button>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 1l4 4-4 4"/>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                </svg>
                Transfer to...
              </button>
              <button>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Create ticket
              </button>
              <button className="danger">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                </svg>
                Ban customer
              </button>
              <div className="menu-divider"></div>
              <button>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                End chat
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div className="chat-info-banner">
        <div className="info-icon">ℹ️</div>
        <p>
          This is your chat workspace. Respond to customer queries and provide excellent support. 👋
        </p>
      </div>

      {/* Messages */}
      <div className="chat-messages-area">
        {loading ? (
          <div className="messages-loading">Loading messages...</div>
        ) : error ? (
          <div className="messages-error">{error}</div>
        ) : (
          <>
            {messages.map((msg, index) => {
              const isAgent = msg.senderType === 'agent';
              const showSender = index === 0 || messages[index - 1]?.senderType !== msg.senderType;

              return (
                <div key={msg.id} className={`message-group ${isAgent ? 'agent' : 'visitor'}`}>
                  {showSender && !isAgent && (
                    <span className="message-sender">{getVisitorName()}</span>
                  )}
                  {showSender && isAgent && (
                    <span className="message-sender agent-name">{agentName}</span>
                  )}
                  <div className="message-bubble">
                    <p>{msg.content}</p>
                    <span className="message-time">{formatTime(msg.createdAt)}</span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Quick Replies */}
      <div className="quick-replies">
        {quickReplies.map((reply, i) => (
          <button key={i} onClick={() => setInputValue(reply)}>
            {reply.length > 30 ? reply.substring(0, 30) + '...' : reply}
          </button>
        ))}
      </div>

      {/* Message Input */}
      <div className="chat-input-area">
        <div className="input-hint">⌘+K for quick actions</div>
        <div className="input-container">
          <div className="input-toolbar">
            <button className="toolbar-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Message
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows="1"
          />
          <div className="input-actions">
            <button className="action-btn" title="AI Assist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </button>
            <button className="action-btn" title="Hashtag">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="9" x2="20" y2="9"/>
                <line x1="4" y1="15" x2="20" y2="15"/>
                <line x1="10" y1="3" x2="8" y2="21"/>
                <line x1="16" y1="3" x2="14" y2="21"/>
              </svg>
            </button>
            <button className="action-btn" title="Attachment">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
              </svg>
            </button>
            <button className="action-btn" title="Emoji">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </button>
            <button className="action-btn" title="More">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="19" cy="12" r="1"/>
                <circle cx="5" cy="12" r="1"/>
              </svg>
            </button>
            <button 
              className="send-btn" 
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="chat-tags-area">
        <button className="add-tag-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
          Add tag
        </button>
        {tags.map((tag, i) => (
          <span key={i} className="tag-chip">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ChatArea;



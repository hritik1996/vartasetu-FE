import React, { useState, useEffect, useRef } from 'react';
import { getConversation, sendMessage } from '../../api/conversationsApi';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatPanel.css';

const ChatPanel = ({ conversationId, onMessageSent, newMessage }) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!conversationId) {
      setConversation(null);
      setMessages([]);
      setLoading(false);
      return;
    }

    const loadConversation = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getConversation(conversationId);
        setConversation(data);
        setMessages(data.messages || []);
      } catch (err) {
        setError(err.message || 'Failed to load conversation');
      } finally {
        setLoading(false);
      }
    };

    loadConversation();
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content) => {
    if (!conversationId || !content.trim()) return;

    try {
      const newMessage = await sendMessage(conversationId, content);
      setMessages(prev => [...prev, newMessage]);
      if (onMessageSent) {
        onMessageSent(conversationId, newMessage);
      }
    } catch (err) {
      setError(err.message || 'Failed to send message');
    }
  };

  // Handle new messages from socket
  useEffect(() => {
    if (newMessage && newMessage.conversationId === conversationId) {
      setMessages(prev => {
        // Avoid duplicates
        if (prev.some(m => m.id === newMessage.message.id)) {
          return prev;
        }
        return [...prev, newMessage.message];
      });
    }
  }, [newMessage, conversationId]);

  if (!conversationId) {
    return (
      <div className="chat-panel">
        <div className="chat-placeholder">
          Select a conversation to start chatting
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="chat-panel">
        <div className="chat-loading">Loading conversation...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chat-panel">
        <div className="chat-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-header-info">
          <h3 className="chat-visitor-name">
            Visitor {conversation.visitorId ? conversation.visitorId.substring(0, 8) : 'N/A'}
          </h3>
          <span className={`chat-status ${conversation.status || 'open'}`}>
            {conversation.status || 'open'}
          </span>
        </div>
      </div>
      <MessageList messages={messages} />
      <div ref={messagesEndRef} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatPanel;


import React, { useState, useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import ChatList from '../components/Chat/ChatList';
import ChatArea from '../components/Chat/ChatArea';
import CustomerPanel from '../components/Chat/CustomerPanel';
import { useConversations } from '../hooks/useConversations';
import { useChatSocket } from '../hooks/useChatSocket';
import { useAuth } from '../hooks/useAuth';
import './DashboardPage.css';

const DashboardPage = () => {
  const { agent } = useAuth();
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [latestMessage, setLatestMessage] = useState(null);
  const [listFilter, setListFilter] = useState('my');
  const [sortBy, setSortBy] = useState('newest');
  const { conversations, loading, updateConversation, addConversation } = useConversations();

  // Handle new messages from socket
  const handleNewMessage = (data) => {
    const { conversationId, message } = data;
    updateConversation(conversationId, {
      lastMessage: message,
      updatedAt: message.createdAt
    });
    setLatestMessage(data);
  };

  // Handle conversation updates
  const handleConversationUpdate = (data) => {
    if (data.conversation) {
      const exists = conversations.some(c => c.id === data.conversation.id);
      if (!exists) {
        addConversation(data.conversation);
      } else {
        updateConversation(data.conversation.id, data.conversation);
      }
    }
  };

  const { joinConversation, leaveConversation } = useChatSocket(
    handleNewMessage,
    handleConversationUpdate
  );

  useEffect(() => {
    if (selectedConversationId) {
      joinConversation(selectedConversationId);
    }
    return () => {
      if (selectedConversationId) {
        leaveConversation(selectedConversationId);
      }
    };
  }, [selectedConversationId, joinConversation, leaveConversation]);

  const handleMessageSent = (conversationId, message) => {
    updateConversation(conversationId, {
      lastMessage: message,
      updatedAt: message.createdAt
    });
  };

  // Sort conversations
  const sortedConversations = [...conversations].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
    }
    return new Date(a.updatedAt || a.createdAt) - new Date(b.updatedAt || b.createdAt);
  });

  const selectedConversation = conversations.find(c => c.id === selectedConversationId) || null;

  return (
    <AppLayout>
      <div className="chat-dashboard">
        {/* Left - Chat List */}
        <ChatList
          conversations={sortedConversations}
          selectedId={selectedConversationId}
          onSelect={setSelectedConversationId}
          loading={loading}
          filter={listFilter}
          onFilterChange={setListFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Middle - Chat Area */}
        <ChatArea
          conversationId={selectedConversationId}
          conversation={selectedConversation}
          onMessageSent={handleMessageSent}
          newMessage={latestMessage}
          agentName={agent?.name || 'Agent'}
        />

        {/* Right - Customer Panel */}
        <CustomerPanel
          conversation={selectedConversation}
          onEndChat={() => {
            setSelectedConversationId(null);
          }}
        />
      </div>
    </AppLayout>
  );
};

export default DashboardPage;

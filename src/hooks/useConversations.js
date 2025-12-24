import { useState, useEffect } from 'react';
import { getConversations } from '../api/conversationsApi';

export const useConversations = (page = 1, limit = 20) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getConversations(page, limit);
        if (page === 1) {
          setConversations(data.conversations || []);
        } else {
          setConversations(prev => [...prev, ...(data.conversations || [])]);
        }
        setHasMore(data.hasMore || false);
      } catch (err) {
        setError(err.message || 'Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [page, limit]);

  const updateConversation = (conversationId, updates) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId ? { ...conv, ...updates } : conv
      )
    );
  };

  const addConversation = (conversation) => {
    setConversations(prev => [conversation, ...prev]);
  };

  return {
    conversations,
    loading,
    error,
    hasMore,
    updateConversation,
    addConversation
  };
};


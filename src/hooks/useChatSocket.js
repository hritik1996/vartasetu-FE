import { useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import { getToken } from '../utils/storage';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export const useChatSocket = (onNewMessage, onConversationUpdate) => {
  const socketRef = useRef(null);
  const onNewMessageRef = useRef(onNewMessage);
  const onConversationUpdateRef = useRef(onConversationUpdate);

  // Keep refs updated
  useEffect(() => {
    onNewMessageRef.current = onNewMessage;
    onConversationUpdateRef.current = onConversationUpdate;
  }, [onNewMessage, onConversationUpdate]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      auth: {
        token
      },
      transports: ['websocket', 'polling']
    });

    const socket = socketRef.current;

    // Join agent lobby
    socket.emit('agent:join');

    // Listen for new messages
    socket.on('new_message', (data) => {
      if (onNewMessageRef.current) {
        onNewMessageRef.current(data);
      }
    });

    // Listen for conversation updates
    socket.on('conversation_created', (data) => {
      if (onConversationUpdateRef.current) {
        onConversationUpdateRef.current(data);
      }
    });

    socket.on('conversation_updated', (data) => {
      if (onConversationUpdateRef.current) {
        onConversationUpdateRef.current(data);
      }
    });

    // Error handling
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.emit('agent:leave');
        socket.disconnect();
      }
    };
  }, []);

  const joinConversation = useCallback((conversationId) => {
    if (socketRef.current) {
      socketRef.current.emit('agent:join_conversation', { conversationId });
    }
  }, []);

  const leaveConversation = useCallback((conversationId) => {
    if (socketRef.current) {
      socketRef.current.emit('agent:leave_conversation', { conversationId });
    }
  }, []);

  return {
    socket: socketRef.current,
    joinConversation,
    leaveConversation
  };
};


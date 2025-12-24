import React from 'react';
import './ConversationMeta.css';

const ConversationMeta = ({ conversation, latestMessage }) => {
  if (!conversation) {
    return (
      <div className="conversation-meta empty">
        <div className="empty-state">
          <h3>Insights will appear here</h3>
          <p>Select a conversation to view visitor details, tags, and timeline.</p>
        </div>
      </div>
    );
  }

  const safeStatus = (conversation.status || 'open').toLowerCase();
  const visitorLabel = conversation.visitorId || `Visitor ${conversation.id}`;
  const lastMessage = latestMessage?.message || conversation.lastMessage;

  const timeline = [
    {
      title: 'Last response',
      detail: lastMessage?.content || 'No replies yet',
      time: lastMessage?.createdAt || conversation.updatedAt
    },
    {
      title: 'Conversation opened',
      detail: conversation.createdAt ? new Date(conversation.createdAt).toLocaleString() : '—',
      time: conversation.createdAt
    },
    {
      title: 'Customer joined queue',
      detail: (conversation.queue || 'Live chat').toUpperCase(),
      time: conversation.createdAt
    }
  ];

  const tags = conversation.tags || ['Priority: Medium', 'Live widget'];

  return (
    <div className="conversation-meta">
      <header>
        <div>
          <p className="meta-label">Current visitor</p>
          <h3>{visitorLabel}</h3>
          <span className={`status-pill ${safeStatus}`}>{safeStatus}</span>
        </div>
        <button type="button" className="ghost-button">Assign owner</button>
      </header>

      <section className="meta-section">
        <h4>Tags</h4>
        <div className="tag-grid">
          {tags.map((tag) => (
            <span key={tag} className="meta-tag">
              {tag}
            </span>
          ))}
          <button type="button" className="mini-button">+ Tag</button>
        </div>
      </section>

      <section className="meta-section">
        <h4>Channels</h4>
        <div className="channel-pills">
          <span>Email</span>
          <span>Live widget</span>
          <span>Automation</span>
        </div>
      </section>

      <section className="meta-section timeline">
        <h4>Timeline</h4>
        <ul>
          {timeline.map((item) => (
            <li key={item.title}>
              <div className="timeline-dot" />
              <div>
                <p className="timeline-title">{item.title}</p>
                <p className="timeline-detail">{item.detail}</p>
                <span className="timeline-time">
                  {item.time ? new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="meta-section quick-actions">
        <h4>Quick actions</h4>
        <div className="quick-action-grid">
          <button type="button">Snooze 1h</button>
          <button type="button">Escalate</button>
          <button type="button">Create follow-up</button>
        </div>
      </section>
    </div>
  );
};

export default ConversationMeta;


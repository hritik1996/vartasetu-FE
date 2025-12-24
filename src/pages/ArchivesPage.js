import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import './ArchivesPage.css';

const ArchivesPage = () => {
  const [archives] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState(null);

  // Skeleton placeholders for archives list
  const SkeletonItem = () => (
    <div className="archive-skeleton-item">
      <div className="skeleton-line long"></div>
      <div className="skeleton-line medium"></div>
      <div className="skeleton-line short"></div>
    </div>
  );

  // Skeleton placeholders for details panel
  const DetailsSkeleton = () => (
    <div className="details-skeleton">
      <div className="skeleton-row">
        <div className="skeleton-dot"></div>
        <div className="skeleton-lines">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
      <div className="skeleton-row">
        <div className="skeleton-dot"></div>
        <div className="skeleton-lines">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
      <div className="skeleton-row">
        <div className="skeleton-dot"></div>
        <div className="skeleton-lines">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
      <div className="skeleton-row">
        <div className="skeleton-dot"></div>
        <div className="skeleton-lines">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
    </div>
  );

  return (
    <AppLayout>
      <div className="archives-page">
        {/* Left Panel - Archives List */}
        <div className="archives-list-panel">
          <div className="archives-list-header">
            <h2>Archives</h2>
            <button className="filter-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="21" x2="4" y2="14"/>
                <line x1="4" y1="10" x2="4" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12" y2="3"/>
                <line x1="20" y1="21" x2="20" y2="16"/>
                <line x1="20" y1="12" x2="20" y2="3"/>
                <line x1="1" y1="14" x2="7" y2="14"/>
                <line x1="9" y1="8" x2="15" y2="8"/>
                <line x1="17" y1="16" x2="23" y2="16"/>
              </svg>
            </button>
          </div>
          <div className="archives-list-content">
            {/* Show skeleton placeholders */}
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
          </div>
        </div>

        {/* Middle Panel - Chat Content */}
        <div className="archives-chat-panel">
          <div className="archives-chat-header">
            <h2>Chat</h2>
          </div>
          <div className="archives-chat-content">
            {archives.length === 0 ? (
              <div className="archives-empty-state">
                <div className="empty-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                    <line x1="8" y1="14" x2="8" y2="14"/>
                    <line x1="12" y1="14" x2="12" y2="14"/>
                    <line x1="16" y1="14" x2="16" y2="14"/>
                    <line x1="8" y1="18" x2="8" y2="18"/>
                    <line x1="12" y1="18" x2="12" y2="18"/>
                  </svg>
                </div>
                <h3>Nothing in your Archives yet</h3>
                <p>
                  Archives organize and hold all your finished chats.
                  <br />
                  To start receiving chats, first install your VartaSetu widget.
                </p>
                <button className="install-btn">
                  Install VartaSetu
                </button>
                <span className="or-text">
                  Or <a href="#invite">invite developer</a>
                </span>
              </div>
            ) : (
              <div className="archives-messages">
                {/* Messages would render here when archive is selected */}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Details */}
        <div className="archives-details-panel">
          <DetailsSkeleton />
          <div className="details-divider"></div>
          <DetailsSkeleton />
          <div className="details-divider"></div>
          <DetailsSkeleton />
        </div>
      </div>
    </AppLayout>
  );
};

export default ArchivesPage;

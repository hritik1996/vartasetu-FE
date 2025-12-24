import React from 'react';
import './QueueFilters.css';

const defaultFilters = [
  { id: 'all', label: 'All queues' },
  { id: 'open', label: 'Open' },
  { id: 'waiting', label: 'Waiting on customer' },
  { id: 'closed', label: 'Closed' }
];

const QueueFilters = ({
  filters = defaultFilters,
  activeFilter = 'all',
  onFilterChange,
  searchTerm = '',
  onSearchChange
}) => {
  return (
    <div className="queue-toolbar">
      <div className="queue-filters">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={`queue-chip ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange?.(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="queue-actions">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search visitor, email, status..."
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
        <button type="button" className="queue-button">
          + New conversation
        </button>
      </div>
    </div>
  );
};

export default QueueFilters;


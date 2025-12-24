import React from 'react';
import './StatsBar.css';

const StatsBar = ({ stats = [] }) => {
  return (
    <div className="stats-bar">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card">
          <div className="stat-label">{stat.label}</div>
          <div className="stat-value">{stat.value}</div>
          {stat.trend && <div className={`stat-trend ${stat.trend.type}`}>{stat.trend.text}</div>}
          {stat.caption && <div className="stat-caption">{stat.caption}</div>}
        </div>
      ))}
    </div>
  );
};

export default StatsBar;


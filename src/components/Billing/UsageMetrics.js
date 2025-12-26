import React from 'react';
import './UsageMetrics.css';

const UsageMetrics = ({ usage, limits }) => {
    const getPercentage = (used, limit) => {
        if (limit === 'Unlimited') return 0;
        return Math.min((used / limit) * 100, 100);
    };

    const getStatusColor = (percentage) => {
        if (percentage >= 90) return 'danger';
        if (percentage >= 80) return 'warning';
        return 'success';
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const metrics = [
        {
            icon: '💬',
            label: 'Conversations',
            used: usage.conversations,
            limit: limits.conversations,
            tooltip: 'Total conversations this billing period'
        },
        {
            icon: '👥',
            label: 'Active Agents',
            used: usage.agents,
            limit: limits.agents,
            tooltip: 'Number of team members with access'
        },
        {
            icon: '💾',
            label: 'Storage Used',
            used: usage.storage,
            limit: limits.storage,
            tooltip: 'File attachments and chat history',
            unit: 'GB'
        },
        {
            icon: '🔌',
            label: 'API Calls',
            used: usage.apiCalls || 0,
            limit: limits.apiCalls || 'Unlimited',
            tooltip: 'API requests this month'
        }
    ];

    return (
        <div className="usage-metrics">
            <div className="metrics-header">
                <h2 className="metrics-title">Usage & Limits</h2>
                <p className="metrics-subtitle">Track your current usage across all resources</p>
            </div>

            <div className="metrics-grid">
                {metrics.map((metric, index) => {
                    const percentage = getPercentage(metric.used, metric.limit);
                    const status = getStatusColor(percentage);

                    return (
                        <div key={index} className="metric-card" title={metric.tooltip}>
                            <div className="metric-header">
                                <span className="metric-icon">{metric.icon}</span>
                                <span className="metric-label">{metric.label}</span>
                            </div>

                            <div className="metric-value">
                                <span className="value-current">{formatNumber(metric.used)}</span>
                                <span className="value-separator">/</span>
                                <span className="value-limit">
                                    {metric.limit === 'Unlimited' ? '∞' : formatNumber(metric.limit)}
                                    {metric.unit && ` ${metric.unit}`}
                                </span>
                            </div>

                            <div className="progress-bar">
                                <div
                                    className={`progress-fill ${status}`}
                                    style={{ width: `${percentage}%` }}
                                >
                                    {percentage > 10 && (
                                        <span className="progress-text">{Math.round(percentage)}%</span>
                                    )}
                                </div>
                            </div>

                            {percentage >= 80 && (
                                <div className={`metric-warning ${status}`}>
                                    {percentage >= 90 ? (
                                        <>⚠️ Approaching limit - consider upgrading</>
                                    ) : (
                                        <>⚡ Usage at {Math.round(percentage)}%</>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UsageMetrics;

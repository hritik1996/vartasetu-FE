import React from 'react';
import './InvoiceList.css';

const InvoiceList = ({ invoices, onDownload }) => {
    const getStatusBadge = (status) => {
        const statusMap = {
            paid: { label: 'Paid', class: 'success' },
            pending: { label: 'Pending', class: 'warning' },
            failed: { label: 'Failed', class: 'danger' },
            refunded: { label: 'Refunded', class: 'info' }
        };

        const statusInfo = statusMap[status.toLowerCase()] || { label: status, class: 'default' };

        return (
            <span className={`status-badge ${statusInfo.class}`}>
                {statusInfo.label}
            </span>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatAmount = (amount) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    return (
        <div className="invoice-list">
            <div className="invoice-header">
                <h2 className="invoice-title">Billing History</h2>
                <p className="invoice-subtitle">Download invoices and payment receipts</p>
            </div>

            <div className="invoice-table-container">
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="no-invoices">
                                    <div className="empty-state">
                                        <span className="empty-icon">📄</span>
                                        <p>No invoices yet</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            invoices.map((invoice) => (
                                <tr key={invoice.id} className="invoice-row">
                                    <td className="invoice-id">
                                        <span className="id-text">#{invoice.id}</span>
                                    </td>
                                    <td>{formatDate(invoice.date)}</td>
                                    <td className="invoice-description">{invoice.description}</td>
                                    <td className="invoice-amount">{formatAmount(invoice.amount)}</td>
                                    <td>{getStatusBadge(invoice.status)}</td>
                                    <td>
                                        <div className="invoice-actions">
                                            <button
                                                className="action-btn download"
                                                onClick={() => onDownload(invoice.id)}
                                                title="Download Invoice"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" />
                                                    <polyline points="7 10 12 15 17 10" strokeWidth="2" strokeLinecap="round" />
                                                    <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                            <button
                                                className="action-btn view"
                                                title="View Details"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth="2" />
                                                    <circle cx="12" cy="12" r="3" strokeWidth="2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoiceList;

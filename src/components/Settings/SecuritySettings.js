import React, { useState, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { getAPIKeys, generateAPIKey, revokeAPIKey, updatePassword, toggle2FA } from '../../api/settingsApi';
import './SecuritySettings.css';

const SecuritySettings = ({ settings, onUpdate, loading }) => {
    const [twoFAEnabled, setTwoFAEnabled] = useState(settings?.twoFAEnabled || false);
    const [apiKeys, setApiKeys] = useState([]);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showNewKeyForm, setShowNewKeyForm] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [newKeyName, setNewKeyName] = useState('');
    const [loadingKeys, setLoadingKeys] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadAPIKeys();
    }, []);

    const loadAPIKeys = async () => {
        try {
            setLoadingKeys(true);
            const data = await getAPIKeys();
            setApiKeys(data.keys || []);
        } catch (err) {
            console.error('Failed to load API keys:', err);
        } finally {
            setLoadingKeys(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            await updatePassword(passwordForm.oldPassword, passwordForm.newPassword);
            setSuccess('Password changed successfully');
            setShowPasswordForm(false);
            setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setError(err.message || 'Failed to change password');
        }
    };

    const handle2FAToggle = async (enabled) => {
        try {
            await toggle2FA(enabled);
            setTwoFAEnabled(enabled);
            setSuccess(enabled ? '2FA enabled successfully' : '2FA disabled successfully');
        } catch (err) {
            setError(err.message || 'Failed to toggle 2FA');
        }
    };

    const handleGenerateKey = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!newKeyName.trim()) {
            setError('Please enter a key name');
            return;
        }

        try {
            const data = await generateAPIKey(newKeyName);
            setApiKeys([...apiKeys, data.key]);
            setSuccess('API key generated successfully');
            setShowNewKeyForm(false);
            setNewKeyName('');
        } catch (err) {
            setError(err.message || 'Failed to generate API key');
        }
    };

    const handleRevokeKey = async (keyId) => {
        if (!window.confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
            return;
        }

        try {
            await revokeAPIKey(keyId);
            setApiKeys(apiKeys.filter(k => k.id !== keyId));
            setSuccess('API key revoked successfully');
        } catch (err) {
            setError(err.message || 'Failed to revoke API key');
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setSuccess('API key copied to clipboard');
    };

    return (
        <div className="security-settings">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Password */}
            <div className="setting-group">
                <h3 className="setting-group-title">Password</h3>

                {!showPasswordForm ? (
                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={() => setShowPasswordForm(true)}
                    >
                        Change Password
                    </button>
                ) : (
                    <form onSubmit={handlePasswordChange} className="password-form">
                        <div className="form-group">
                            <label htmlFor="old-password">Current Password</label>
                            <input
                                id="old-password"
                                type="password"
                                value={passwordForm.oldPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                                placeholder="Enter current password"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new-password">New Password</label>
                            <input
                                id="new-password"
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                placeholder="Enter new password"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm New Password</label>
                            <input
                                id="confirm-password"
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                placeholder="Confirm new password"
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <button type="button" className="ghost-btn" onClick={() => setShowPasswordForm(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="primary-btn">
                                Update Password
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Two-Factor Authentication */}
            <div className="setting-group">
                <h3 className="setting-group-title">Two-Factor Authentication</h3>

                <div className="setting-item">
                    <ToggleSwitch
                        id="2fa-toggle"
                        label="Enable Two-Factor Authentication"
                        checked={twoFAEnabled}
                        onChange={handle2FAToggle}
                        disabled={loading}
                    />
                    <p className="setting-hint">Add an extra layer of security to your account</p>
                </div>
            </div>

            {/* API Keys */}
            <div className="setting-group">
                <div className="group-header">
                    <h3 className="setting-group-title">API Keys</h3>
                    <button
                        type="button"
                        className="secondary-btn-sm"
                        onClick={() => setShowNewKeyForm(!showNewKeyForm)}
                    >
                        {showNewKeyForm ? 'Cancel' : '+ New Key'}
                    </button>
                </div>

                {showNewKeyForm && (
                    <form onSubmit={handleGenerateKey} className="new-key-form">
                        <div className="form-group">
                            <label htmlFor="key-name">Key Name</label>
                            <input
                                id="key-name"
                                type="text"
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                                placeholder="e.g., Production API, Mobile App"
                                required
                            />
                        </div>
                        <button type="submit" className="primary-btn">
                            Generate Key
                        </button>
                    </form>
                )}

                {loadingKeys ? (
                    <p className="loading-text">Loading API keys...</p>
                ) : apiKeys.length === 0 ? (
                    <p className="empty-text">No API keys yet. Generate one to get started.</p>
                ) : (
                    <div className="api-keys-list">
                        {apiKeys.map((key) => (
                            <div key={key.id} className="api-key-item">
                                <div className="key-info">
                                    <strong>{key.name}</strong>
                                    <code className="key-value">{key.key}</code>
                                    <span className="key-date">Created {new Date(key.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="key-actions">
                                    <button
                                        type="button"
                                        className="icon-btn"
                                        onClick={() => copyToClipboard(key.key)}
                                        title="Copy to clipboard"
                                    >
                                        📋
                                    </button>
                                    <button
                                        type="button"
                                        className="icon-btn danger"
                                        onClick={() => handleRevokeKey(key.id)}
                                        title="Revoke key"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="security-info">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div>
                    <strong>Security Best Practices</strong>
                    <p>Keep your API keys secure. Never share them publicly or commit them to version control.</p>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;

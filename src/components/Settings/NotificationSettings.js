import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import './NotificationSettings.css';

const NotificationSettings = ({ settings, onUpdate, loading }) => {
    const [notifSettings, setNotifSettings] = useState({
        emailEnabled: settings?.emailEnabled !== false,
        desktopEnabled: settings?.desktopEnabled !== false,
        soundEnabled: settings?.soundEnabled !== false,
        newMessageEmail: settings?.newMessageEmail !== false,
        assignmentEmail: settings?.assignmentEmail !== false,
        mentionEmail: settings?.mentionEmail !== false
    });

    const handleToggle = (key, value) => {
        const updated = { ...notifSettings, [key]: value };
        setNotifSettings(updated);
        onUpdate(updated);
    };

    return (
        <div className="notification-settings">
            <div className="setting-group">
                <h3 className="setting-group-title">General Notifications</h3>

                <div className="setting-item">
                    <ToggleSwitch
                        id="email-notifications"
                        label="Email Notifications"
                        checked={notifSettings.emailEnabled}
                        onChange={(checked) => handleToggle('emailEnabled', checked)}
                        disabled={loading}
                    />
                    <p className="setting-hint">Receive notifications via email</p>
                </div>

                <div className="setting-item">
                    <ToggleSwitch
                        id="desktop-notifications"
                        label="Desktop Alerts"
                        checked={notifSettings.desktopEnabled}
                        onChange={(checked) => handleToggle('desktopEnabled', checked)}
                        disabled={loading}
                    />
                    <p className="setting-hint">Show desktop push notifications</p>
                </div>

                <div className="setting-item">
                    <ToggleSwitch
                        id="sound-notifications"
                        label="Notification Sound"
                        checked={notifSettings.soundEnabled}
                        onChange={(checked) => handleToggle('soundEnabled', checked)}
                        disabled={loading}
                    />
                    <p className="setting-hint">Play sound for new notifications</p>
                </div>
            </div>

            {notifSettings.emailEnabled && (
                <div className="setting-group">
                    <h3 className="setting-group-title">Email Preferences</h3>
                    <p className="setting-description">Choose which events trigger email notifications</p>

                    <div className="setting-item">
                        <ToggleSwitch
                            id="new-message"
                            label="New Messages"
                            checked={notifSettings.newMessageEmail}
                            onChange={(checked) => handleToggle('newMessageEmail', checked)}
                            disabled={loading}
                        />
                        <p className="setting-hint">When you receive a new conversation message</p>
                    </div>

                    <div className="setting-item">
                        <ToggleSwitch
                            id="assignment"
                            label="Assignment Alerts"
                            checked={notifSettings.assignmentEmail}
                            onChange={(checked) => handleToggle('assignmentEmail', checked)}
                            disabled={loading}
                        />
                        <p className="setting-hint">When a conversation is assigned to you</p>
                    </div>

                    <div className="setting-item">
                        <ToggleSwitch
                            id="mention"
                            label="Mentions"
                            checked={notifSettings.mentionEmail}
                            onChange={(checked) => handleToggle('mentionEmail', checked)}
                            disabled={loading}
                        />
                        <p className="setting-hint">When someone mentions you in a note</p>
                    </div>
                </div>
            )}

            <div className="notification-info">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <div>
                    <strong>Browser Permissions</strong>
                    <p>For desktop notifications, you may need to grant permission in your browser settings.</p>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;

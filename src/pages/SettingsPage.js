import React, { useState, useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import WidgetCustomization from '../components/Settings/WidgetCustomization';
import NotificationSettings from '../components/Settings/NotificationSettings';
import SecuritySettings from '../components/Settings/SecuritySettings';
import { getSettings, updateWidgetSettings, updateNotificationSettings } from '../api/settingsApi';
import './SettingsPage.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('widget');
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      // Try to load from backend first
      const data = await getSettings();
      setSettings(data);
      // Also save to localStorage as backup
      localStorage.setItem('vartasetu_settings', JSON.stringify(data));
    } catch (err) {
      // If backend fails, try localStorage
      const cached = localStorage.getItem('vartasetu_settings');
      if (cached) {
        setSettings(JSON.parse(cached));
      } else {
        // Use default settings if nothing available
        setSettings({
          widget: {
            primaryColor: '#6366f1',
            position: 'bottom-right',
            greetingMessage: 'Hi! How can we help you today?',
            showBranding: true
          },
          notifications: {
            emailEnabled: true,
            desktopEnabled: true,
            soundEnabled: false,
            newMessageEmail: true,
            assignmentEmail: true,
            mentionEmail: true
          },
          security: {
            twoFAEnabled: false
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWidgetUpdate = async (widgetSettings) => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // Update local state immediately
      const newSettings = { ...settings, widget: widgetSettings };
      setSettings(newSettings);

      // Save to localStorage
      localStorage.setItem('vartasetu_settings', JSON.stringify(newSettings));

      // Try to save to backend (don't show error if it fails)
      try {
        await updateWidgetSettings(widgetSettings);
      } catch (backendErr) {
        console.log('Backend not available, using localStorage');
      }

      setSuccess('Widget settings saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update widget settings');
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationUpdate = async (notificationSettings) => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // Update local state immediately
      const newSettings = { ...settings, notifications: notificationSettings };
      setSettings(newSettings);

      // Save to localStorage
      localStorage.setItem('vartasetu_settings', JSON.stringify(newSettings));

      // Try to save to backend (don't show error if it fails)
      try {
        await updateNotificationSettings(notificationSettings);
      } catch (backendErr) {
        console.log('Backend not available, using localStorage');
      }

      setSuccess('Notification settings saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update notification settings');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'widget', label: 'Widget', icon: '🎨' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔐' }
  ];

  if (loading) {
    return (
      <AppLayout>
        <div className="settings-page">
          <div className="settings-loading">
            <div className="loading-spinner"></div>
            <p>Loading settings...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="settings-page">
        <div className="settings-header">
          <div className="header-icon">⚙️</div>
          <div className="header-content">
            <h1>Settings</h1>
            <p>Configure your workspace, widget, and account preferences.</p>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {success}
          </div>
        )}

        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'widget' && (
            <WidgetCustomization
              settings={settings?.widget}
              onUpdate={handleWidgetUpdate}
              loading={saving}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationSettings
              settings={settings?.notifications}
              onUpdate={handleNotificationUpdate}
              loading={saving}
            />
          )}

          {activeTab === 'security' && (
            <SecuritySettings
              settings={settings?.security}
              onUpdate={(data) => setSettings({ ...settings, security: data })}
              loading={saving}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;

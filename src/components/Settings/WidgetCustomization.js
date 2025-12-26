import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import './WidgetCustomization.css';

const WidgetCustomization = ({ settings, onUpdate, loading }) => {
    const [widgetSettings, setWidgetSettings] = useState({
        primaryColor: settings?.primaryColor || '#6366f1',
        position: settings?.position || 'bottom-right',
        greetingMessage: settings?.greetingMessage || 'Hi! How can we help you today?',
        showBranding: settings?.showBranding !== false
    });

    const handleChange = (key, value) => {
        const updated = { ...widgetSettings, [key]: value };
        setWidgetSettings(updated);
        onUpdate(updated);
    };

    const positions = [
        { id: 'bottom-right', label: 'Bottom Right', icon: '↘' },
        { id: 'bottom-left', label: 'Bottom Left', icon: '↙' },
        { id: 'top-right', label: 'Top Right', icon: '↗' },
        { id: 'top-left', label: 'Top Left', icon: '↖' }
    ];

    return (
        <div className="widget-customization">
            <div className="setting-group">
                <h3 className="setting-group-title">Widget Appearance</h3>

                <div className="setting-item">
                    <ColorPicker
                        label="Primary Color"
                        value={widgetSettings.primaryColor}
                        onChange={(color) => handleChange('primaryColor', color)}
                    />
                    <p className="setting-hint">This color will be used for buttons, links, and accents</p>
                </div>

                <div className="setting-item">
                    <label className="setting-label">Widget Position</label>
                    <div className="position-grid">
                        {positions.map((pos) => (
                            <button
                                key={pos.id}
                                type="button"
                                className={`position-btn ${widgetSettings.position === pos.id ? 'active' : ''}`}
                                onClick={() => handleChange('position', pos.id)}
                                disabled={loading}
                            >
                                <span className="position-icon">{pos.icon}</span>
                                <span className="position-label">{pos.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="setting-item">
                    <label className="setting-label" htmlFor="greeting">Greeting Message</label>
                    <input
                        id="greeting"
                        type="text"
                        value={widgetSettings.greetingMessage}
                        onChange={(e) => handleChange('greetingMessage', e.target.value)}
                        placeholder="Hi! How can we help you today?"
                        className="setting-input"
                        disabled={loading}
                    />
                    <p className="setting-hint">First message displayed to visitors</p>
                </div>

                <div className="setting-item">
                    <label className="setting-checkbox">
                        <input
                            type="checkbox"
                            checked={widgetSettings.showBranding}
                            onChange={(e) => handleChange('showBranding', e.target.checked)}
                            disabled={loading}
                        />
                        <span>Show "Powered by VartaSetu" branding</span>
                    </label>
                </div>
            </div>

            {/* Widget Preview */}
            <div className="widget-preview">
                <h4 className="preview-title">Preview</h4>
                <div className="preview-container">
                    <div
                        className="preview-widget"
                        style={{
                            backgroundColor: widgetSettings.primaryColor,
                            [widgetSettings.position === 'bottom-right' || widgetSettings.position === 'top-right' ? 'right' : 'left']: '20px',
                            [widgetSettings.position.startsWith('bottom') ? 'bottom' : 'top']: '20px'
                        }}
                    >
                        <div className="preview-bubble">
                            {widgetSettings.greetingMessage}
                        </div>
                        {widgetSettings.showBranding && (
                            <div className="preview-branding">Powered by VartaSetu</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WidgetCustomization;

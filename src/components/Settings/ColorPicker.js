import React, { useState } from 'react';
import './ColorPicker.css';

const PRESET_COLORS = [
    '#6366f1', // Indigo
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#f43f5e', // Rose
    '#ef4444', // Red
    '#f59e0b', // Amber
    '#10b981', // Emerald
    '#06b6d4', // Cyan
    '#3b82f6', // Blue
    '#6366f1', // Indigo
];

const ColorPicker = ({ value, onChange, label }) => {
    const [showCustom, setShowCustom] = useState(false);
    const [customColor, setCustomColor] = useState(value || '#6366f1');

    const handlePresetClick = (color) => {
        onChange(color);
        setShowCustom(false);
    };

    const handleCustomChange = (e) => {
        const color = e.target.value;
        setCustomColor(color);
        onChange(color);
    };

    return (
        <div className="color-picker">
            {label && <label className="color-picker-label">{label}</label>}

            <div className="color-presets">
                {PRESET_COLORS.map((color) => (
                    <button
                        key={color}
                        type="button"
                        className={`color-preset ${value === color ? 'active' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handlePresetClick(color)}
                        title={color}
                    >
                        {value === color && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        )}
                    </button>
                ))}

                <button
                    type="button"
                    className={`color-preset custom ${showCustom ? 'active' : ''}`}
                    onClick={() => setShowCustom(!showCustom)}
                    title="Custom color"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14"></path>
                    </svg>
                </button>
            </div>

            {showCustom && (
                <div className="custom-color-input">
                    <input
                        type="color"
                        value={customColor}
                        onChange={handleCustomChange}
                        className="color-input"
                    />
                    <input
                        type="text"
                        value={customColor}
                        onChange={(e) => {
                            setCustomColor(e.target.value);
                            if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                                onChange(e.target.value);
                            }
                        }}
                        placeholder="#000000"
                        className="color-hex-input"
                    />
                </div>
            )}
        </div>
    );
};

export default ColorPicker;

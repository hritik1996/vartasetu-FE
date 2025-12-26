import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ id, checked, onChange, label, disabled = false }) => {
    return (
        <div className="toggle-switch-container">
            {label && <span className="toggle-label">{label}</span>}
            <label className="toggle-switch" htmlFor={id}>
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                />
                <span className="toggle-slider"></span>
            </label>
        </div>
    );
};

export default ToggleSwitch;

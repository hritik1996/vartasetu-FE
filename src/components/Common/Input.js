import React, { useState } from 'react';
import './Input.css';

const Input = ({
    id,
    type = 'text',
    label,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    error = '',
    success = false,
    icon,
    showPasswordToggle = false,
    autoComplete,
    className = '',
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`input-wrapper ${className} ${error ? 'has-error' : ''} ${success ? 'has-success' : ''}`}>
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                    {required && <span className="required-indicator">*</span>}
                </label>
            )}

            <div className={`input-container ${isFocused ? 'focused' : ''} ${disabled ? 'disabled' : ''}`}>
                {icon && <span className="input-icon">{icon}</span>}

                <input
                    id={id}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`input-field ${icon ? 'has-icon' : ''}`}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${id}-error` : undefined}
                    {...props}
                />

                {type === 'password' && showPasswordToggle && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={handleTogglePassword}
                        disabled={disabled}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {error && (
                <span id={`${id}-error`} className="input-message error-message" role="alert">
                    {error}
                </span>
            )}

            {success && !error && (
                <span className="input-message success-message">
                    ✓ Looks good
                </span>
            )}
        </div>
    );
};

export default Input;

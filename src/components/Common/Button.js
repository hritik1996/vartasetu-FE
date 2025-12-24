import React from 'react';
import './Button.css';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    onClick,
    className = '',
    ...props
}) => {
    const buttonClasses = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth ? 'btn-full-width' : '',
        loading ? 'btn-loading' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <span className="btn-spinner">
                    <svg className="spinner" viewBox="0 0 24 24" fill="none">
                        <circle
                            className="spinner-track"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                        />
                        <circle
                            className="spinner-head"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    </svg>
                </span>
            )}

            {!loading && icon && iconPosition === 'left' && (
                <span className="btn-icon btn-icon-left">{icon}</span>
            )}

            <span className="btn-text">{children}</span>

            {!loading && icon && iconPosition === 'right' && (
                <span className="btn-icon btn-icon-right">{icon}</span>
            )}
        </button>
    );
};

export default Button;

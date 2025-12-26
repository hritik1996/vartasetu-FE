import React from 'react';
import './PlanCard.css';

const PlanCard = ({
    plan,
    isCurrentPlan,
    isPopular,
    billingCycle,
    onUpgrade
}) => {
    const getPrice = () => {
        if (plan.price === 0) return 'Free';
        if (billingCycle === 'annual') {
            const monthlyPrice = plan.annualPrice / 12;
            return `₹${monthlyPrice.toFixed(0)}/mo`;
        }
        return `₹${plan.price}/mo`;
    };

    const getSavings = () => {
        if (plan.price === 0 || billingCycle === 'monthly') return null;
        const monthlyCost = plan.price * 12;
        const savings = monthlyCost - plan.annualPrice;
        const savingsPercent = Math.round((savings / monthlyCost) * 100);
        return `Save ${savingsPercent}%`;
    };

    return (
        <div className={`plan-card ${isCurrentPlan ? 'current' : ''} ${isPopular ? 'popular' : ''}`}>
            {isPopular && <div className="popular-badge">Most Popular</div>}
            {isCurrentPlan && <div className="current-badge">Current Plan</div>}

            <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-tagline">{plan.tagline}</p>
            </div>

            <div className="plan-pricing">
                <div className="price">{getPrice()}</div>
                {billingCycle === 'annual' && plan.price > 0 && (
                    <div className="billing-info">
                        <span className="annual-price">₹{plan.annualPrice}/year</span>
                        {getSavings() && <span className="savings">{getSavings()}</span>}
                    </div>
                )}
            </div>

            <ul className="plan-features">
                {plan.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="10" fill="#10b981" fillOpacity="0.1" />
                            <path d="M6 10l2.5 2.5L14 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="plan-limits">
                <div className="limit-item">
                    <span className="limit-label">Conversations</span>
                    <span className="limit-value">{plan.limits.conversations}</span>
                </div>
                <div className="limit-item">
                    <span className="limit-label">Agents</span>
                    <span className="limit-value">{plan.limits.agents}</span>
                </div>
                {plan.limits.storage && (
                    <div className="limit-item">
                        <span className="limit-label">Storage</span>
                        <span className="limit-value">{plan.limits.storage}</span>
                    </div>
                )}
            </div>

            <button
                className={`plan-button ${isCurrentPlan ? 'current' : 'upgrade'}`}
                disabled={isCurrentPlan}
                onClick={() => !isCurrentPlan && onUpgrade(plan)}
            >
                {isCurrentPlan ? 'Current Plan' : 'Upgrade'}
            </button>
        </div>
    );
};

export default PlanCard;

import React, { useState, useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import PlanCard from '../components/Billing/PlanCard';
import UsageMetrics from '../components/Billing/UsageMetrics';
import InvoiceList from '../components/Billing/InvoiceList';
import './BillingPage.css';

const BillingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with API calls when backend is ready
  const currentPlan = 'Free';

  const plans = [
    {
      id: 'free',
      name: 'Free',
      tagline: 'Perfect for trying out Vartasetu',
      price: 0,
      annualPrice: 0,
      features: [
        'Up to 100 conversations/month',
        '2 active agents',
        'Basic chat widget',
        'Email support',
        '7-day chat history',
        'Basic analytics'
      ],
      limits: {
        conversations: '100/mo',
        agents: '2',
        storage: '500 MB'
      }
    },
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'Great for small teams',
      price: 999,
      annualPrice: 9999,
      features: [
        'Up to 1,000 conversations/month',
        '5 active agents',
        'Customizable widget',
        'Email & chat support',
        '30-day chat history',
        'Advanced analytics',
        'Custom branding',
        'File attachments'
      ],
      limits: {
        conversations: '1K/mo',
        agents: '5',
        storage: '5 GB'
      }
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'For growing businesses',
      price: 2999,
      annualPrice: 29999,
      features: [
        'Up to 10,000 conversations/month',
        '20 active agents',
        'Full widget customization',
        'Priority support 24/7',
        'Unlimited chat history',
        'Advanced analytics & reports',
        'API access',
        'Multiple chat widgets',
        'Team management',
        'Integrations (Slack, WhatsApp)'
      ],
      limits: {
        conversations: '10K/mo',
        agents: '20',
        storage: '50 GB'
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'Custom solutions for large teams',
      price: 9999,
      annualPrice: 99999,
      features: [
        'Unlimited conversations',
        'Unlimited agents',
        'Complete customization',
        'Dedicated support manager',
        'Unlimited storage',
        'Custom integrations',
        'SLA guarantees',
        'Advanced security',
        'Onboarding & training',
        'Custom contracts'
      ],
      limits: {
        conversations: 'Unlimited',
        agents: 'Unlimited',
        storage: 'Unlimited'
      }
    }
  ];

  const usage = {
    conversations: 45,
    agents: 1,
    storage: 120, // MB
    apiCalls: 250
  };

  const limits = {
    conversations: 100,
    agents: 2,
    storage: 500,
    apiCalls: 'Unlimited'
  };

  const invoices = [
    {
      id: 'INV-2024-001',
      date: '2024-01-01',
      description: 'Pro Plan - January 2024',
      amount: 2999,
      status: 'paid'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-01',
      description: 'Pro Plan - December 2023',
      amount: 2999,
      status: 'paid'
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-01',
      description: 'Starter Plan - November 2023',
      amount: 999,
      status: 'paid'
    },
    {
      id: 'INV-2023-010',
      date: '2023-10-01',
      description: 'Starter Plan - October 2023',
      amount: 999,
      status: 'paid'
    }
  ];

  const handleUpgrade = (plan) => {
    // TODO: Implement upgrade flow with modal confirmation
    console.log('Upgrading to:', plan.name);
    alert(`Upgrade to ${plan.name} plan - Coming Soon!`);
  };

  const handleDownloadInvoice = (invoiceId) => {
    // TODO: Implement actual PDF download
    console.log('Downloading invoice:', invoiceId);
    alert(`Downloading invoice ${invoiceId} - Coming Soon!`);
  };

  return (
    <AppLayout>
      <div className="billing-page">
        {/* Header */}
        <div className="billing-header">
          <div className="header-content">
            <div className="header-icon">💳</div>
            <div>
              <h1>Billing & Subscription</h1>
              <p>Manage your plan, usage, and payment information</p>
            </div>
          </div>
        </div>

        {/* Usage Metrics */}
        <UsageMetrics usage={usage} limits={limits} />

        {/* Plans Section */}
        <div className="plans-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Choose Your Plan</h2>
              <p className="section-subtitle">Select the perfect plan for your business needs</p>
            </div>

            <div className="billing-toggle">
              <button
                className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                className={`toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
                onClick={() => setBillingCycle('annual')}
              >
                Annual
                <span className="save-badge">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="plans-grid">
            {plans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCurrentPlan={plan.name === currentPlan}
                isPopular={plan.id === 'pro'}
                billingCycle={billingCycle}
                onUpgrade={handleUpgrade}
              />
            ))}
          </div>
        </div>

        {/* Invoice History */}
        <InvoiceList
          invoices={invoices}
          onDownload={handleDownloadInvoice}
        />
      </div>
    </AppLayout>
  );
};

export default BillingPage;

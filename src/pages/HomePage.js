import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { useAuth } from '../hooks/useAuth';
import './HomePage.css';

const checklist = [
  {
    title: 'Preview and customize your widget',
    description: 'Match colors, tone, and positioning to your brand before going live.',
    action: 'Preview widget',
    link: 'https://example.com/widget'
  },
  {
    title: 'Test your copilots knowledge',
    description: 'Run sample prompts to see how your bot responds to customers.',
    action: 'Launch test pad'
  },
  {
    title: 'Chat with the VartaSetu Copilot',
    description: 'Ask the assistant to summarize chats or draft replies for your team.',
    action: 'Open Copilot'
  },
  {
    title: 'Invite your teammates',
    description: 'Give agents access so queues never go unattended.',
    action: 'Send invites'
  },
  {
    title: 'Connect VartaSetu to your site',
    description: 'Drop the script into your site and start collecting conversations.',
    action: 'Copy snippet'
  }
];

const HomePage = () => {
  const { agent } = useAuth();

  return (
    <AppLayout>
      <div className="home-shell">
        <div className="home-topbar">
          <div>
            <p className="welcome-text">Hello {agent?.name || agent?.email || 'there'} 👋</p>
            <h2>Let’s get your workspace ready</h2>
            <p className="subtitle">Complete the checklist so you can start chatting with customers.</p>
          </div>
          <div className="trial-pill">
            <span>Trial day 3 of 14</span>
            <button type="button">Upgrade now</button>
          </div>
        </div>

        <div className="home-grid">
          <section className="home-checklist">
            <h3>Launch checklist</h3>
            <ul>
              {checklist.map((item, index) => (
                <li key={item.title}>
                  <div className="step-index">{index + 1}</div>
                  <div className="step-info">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <button type="button">{item.action}</button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="home-preview">
            <div className="widget-card">
              <div className="widget-header">
                <p>Hello, we’re VartaSetu</p>
                <button type="button">Chat now</button>
              </div>
              <div className="widget-body">
                <div className="message visitor">
                  <span>Visitor</span>
                  <p>Hi! Do you have onboarding docs?</p>
                </div>
                <div className="message agent">
                  <span>You</span>
                  <p>Absolutely! Sharing links to the help center now.</p>
                </div>
              </div>
            </div>
            <div className="insight-card">
              <h4>Workspace stats</h4>
              <div className="insight-metrics">
                <div>
                  <span>New visitors</span>
                  <strong>184</strong>
                </div>
                <div>
                  <span>Automation coverage</span>
                  <strong>72%</strong>
                </div>
                <div>
                  <span>Pending invites</span>
                  <strong>3</strong>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;



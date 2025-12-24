import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import EngagePage from '../pages/EngagePage';
import AutomatePage from '../pages/AutomatePage';
import ArchivesPage from '../pages/ArchivesPage';
import TeamPage from '../pages/TeamPage';
import ReportsPage from '../pages/ReportsPage';
import AppsPage from '../pages/AppsPage';
import HelpdeskPage from '../pages/HelpdeskPage';
import BillingPage from '../pages/BillingPage';
import SettingsPage from '../pages/SettingsPage';
import NewsPage from '../pages/NewsPage';
import ProfilePage from '../pages/ProfilePage';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#1a1d21',
        color: '#fff'
      }}>
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#1a1d21',
        color: '#fff'
      }}>
        Loading...
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/home" />;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      {/* Private Routes - Main Navigation */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/engage"
        element={
          <PrivateRoute>
            <EngagePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/automate"
        element={
          <PrivateRoute>
            <AutomatePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/archives"
        element={
          <PrivateRoute>
            <ArchivesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/team"
        element={
          <PrivateRoute>
            <TeamPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <ReportsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/apps"
        element={
          <PrivateRoute>
            <AppsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/helpdesk"
        element={
          <PrivateRoute>
            <HelpdeskPage />
          </PrivateRoute>
        }
      />

      {/* Private Routes - Bottom Navigation */}
      <Route
        path="/billing"
        element={
          <PrivateRoute>
            <BillingPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/news"
        element={
          <PrivateRoute>
            <NewsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRouter;

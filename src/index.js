import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import './index.css';
import './content/assets/vendor/bootstrap/css/bootstrap.min.css'
import './content/assets/vendor/bootstrap-icons/bootstrap-icons.css'
import './content/assets/css/main.css'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


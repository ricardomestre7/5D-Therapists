import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Toaster } from '@/components/ui/toaster.jsx';
import { ThemeProvider } from '@/components/theme/theme-provider.jsx';
import { AuthProvider } from '@/contexts/SupabaseAuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme-5d">
        <AuthProvider>
          <App />
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
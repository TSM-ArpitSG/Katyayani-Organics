/**
 * Application Entry Point
 * 
 * @author Arpit Singh
 * @description Main entry file that bootstraps the React application.
 * Initializes Redux store and toast notifications.
 * 
 * @module main
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './store'
import './index.css'
import App from './App.tsx'

/**
 * Bootstrap the React application
 * 
 * @description
 * Renders the app with:
 * - React.StrictMode for detecting potential issues
 * - Redux Provider for state management
 * - Global Toaster for notifications with custom styling
 * - Main App component with routing
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      {/* Global Toast Notification System */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '600',
            minWidth: '320px',
            padding: '16px 24px',
          },
          success: {
            duration: 3000,
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 50px -10px rgba(16, 185, 129, 0.4)',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10b981',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#fff',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 50px -10px rgba(239, 68, 68, 0.4)',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
          loading: {
            style: {
              background: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
              color: '#fff',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 50px -10px rgba(249, 115, 22, 0.4)',
            },
          },
        }}
      />
    </Provider>
  </StrictMode>,
)
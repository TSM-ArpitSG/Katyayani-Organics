/**
 * App Component - Main Application Router
 * 
 * @author Arpit Singh
 * @description Root component that configures application routing.
 * Manages route protection and navigation based on authentication state.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './hooks/useRedux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* Root Route - Smart redirect based on authentication */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
        />

        {/* Login Route - Public access */}
        <Route path="/login" element={<LoginPage />} />

        {/* Register Route - Public access */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Dashboard Route - Requires authentication */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
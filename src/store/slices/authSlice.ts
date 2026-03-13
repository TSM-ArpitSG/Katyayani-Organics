/**
 * Authentication Redux Slice
 * 
 * @author Arpit Singh
 * @description Redux slice managing authentication state with localStorage persistence.
 * Handles user login (setCredentials) and logout actions with automatic state persistence.
 * 
 * @module authSlice
 */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';

/**
 * Authentication state structure
 * 
 * @interface AuthState
 * @property {User | null} user - Currently authenticated user object
 * @property {string | null} token - JWT authentication token
 * @property {boolean} isAuthenticated - Flag indicating if user is logged in
 */
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

/**
 * Load authentication state from localStorage
 * 
 * @returns {AuthState} Restored auth state or default unauthenticated state
 * 
 * @description
 * Attempts to restore authentication state from localStorage on app initialization.
 * If both token and user data exist in storage, returns authenticated state.
 * Otherwise, returns default unauthenticated state.
 */
const loadAuthFromStorage = (): AuthState => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  if (token && userStr) {
    return {
      user: JSON.parse(userStr),
      token,
      isAuthenticated: true,
    };
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

/**
 * Initial authentication state
 * Loaded from localStorage if available
 */
const initialState: AuthState = loadAuthFromStorage();

/**
 * Authentication Redux slice
 * 
 * @description
 * Manages authentication state including:
 * - User credentials and token
 * - Authentication status
 * - localStorage synchronization
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Set user credentials (login)
     * 
     * @param {AuthState} state - Current auth state
     * @param {PayloadAction<{ user: User; token: string }>} action - User and token payload
     * 
     * @description
     * Updates state with authenticated user data and persists to localStorage.
     * Called after successful login to store credentials.
     */
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Persist to localStorage for session persistence
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    /**
     * Clear user credentials (logout)
     * 
     * @param {AuthState} state - Current auth state
     * 
     * @description
     * Clears authentication state and removes data from localStorage.
     * Called when user logs out to reset to unauthenticated state.
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear localStorage to remove persisted session
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

// Export actions for use in components
export const { setCredentials, logout } = authSlice.actions;

// Export reducer for store configuration
export default authSlice.reducer;
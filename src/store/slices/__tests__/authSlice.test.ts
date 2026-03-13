/**
 * AuthSlice Reducer Tests
 * 
 * @author Arpit Singh
 * @description Unit tests for the authSlice Redux reducer.
 * Verifies correct state transitions for login (setCredentials) and logout actions,
 * including localStorage persistence.
 * 
 * @module authSlice.test
 */

import { describe, it, expect, beforeEach } from 'vitest';
import authReducer, { setCredentials, logout } from '../authSlice';

/**
 * AuthState interface for testing
 * 
 * @interface AuthState
 * @property {Object | null} user - Current authenticated user object
 * @property {string | null} token - JWT authentication token
 * @property {boolean} isAuthenticated - Authentication status flag
 * 
 * @description
 * Local definition of AuthState to avoid import issues.
 * Matches the shape of the actual auth state in the Redux store.
 */
interface AuthState {
  user: { id: string; username: string } | null;
  token: string | null;
  isAuthenticated: boolean;
}

/**
 * Test Suite: authSlice Reducer
 * 
 * @description
 * Tests the authSlice reducer's ability to:
 * - Return the correct initial state
 * - Handle the `setCredentials` action (login)
 * - Handle the `logout` action
 * - Interact correctly with `localStorage` for persistence
 */
describe('authSlice', () => {
  /**
   * Initial state for the auth slice
   * Represents an unauthenticated user state
   */
  const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
  };

  /**
   * Setup before each test
   * 
   * @description
   * Clears localStorage to ensure test isolation.
   * Prevents state leakage between tests.
   */
  beforeEach(() => {
    localStorage.clear();
  });

  /**
   * Test: Should return the initial state
   * 
   * @description Verifies that the reducer correctly initializes
   * with the predefined initial state when no state is provided.
   * This ensures the reducer has proper default values.
   */
  it('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  /**
   * Test: Should handle setCredentials (login)
   * 
   * @description Verifies that the `setCredentials` action correctly:
   * - Updates `user` and `token` in the state
   * - Sets `isAuthenticated` to true
   * - Persists `token` and `user` to `localStorage`
   * 
   * This simulates a successful login flow where credentials
   * are stored both in Redux state and localStorage for persistence.
   */
  it('should handle setCredentials', () => {
    const user = { id: '1', username: 'test' };
    const token = 'fake-jwt-token';

    // Dispatch setCredentials action
    const actual = authReducer(initialState, setCredentials({ user, token }));

    // Verify state updates
    expect(actual.user).toEqual(user);
    expect(actual.token).toEqual(token);
    expect(actual.isAuthenticated).toBe(true);

    // Verify localStorage persistence
    expect(localStorage.getItem('token')).toBe(token);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(user));
  });

  /**
   * Test: Should handle logout
   * 
   * @description Verifies that the `logout` action correctly:
   * - Clears `user` and `token` in the state
   * - Sets `isAuthenticated` to false
   * - Removes `token` and `user` from `localStorage`
   * 
   * This simulates the logout flow where all authentication
   * data is cleared from both Redux state and localStorage.
   */
  it('should handle logout', () => {
    // State simulating a logged-in user
    const loggedInState: AuthState = {
      user: { id: '1', username: 'test' },
      token: 'fake-jwt-token',
      isAuthenticated: true,
    };

    // Dispatch logout action
    const actual = authReducer(loggedInState, logout());

    // Verify state is cleared
    expect(actual.user).toBeNull();
    expect(actual.token).toBeNull();
    expect(actual.isAuthenticated).toBe(false);

    // Verify localStorage is cleared
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
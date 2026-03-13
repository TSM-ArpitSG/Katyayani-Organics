/**
 * Vitest Test Setup Configuration
 * 
 * @author Arpit Singh
 * @description Global test setup for Vitest and React Testing Library.
 * Configures mocks and cleanup for consistent test environment.
 * 
 * @module test/setup
 */

import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

/**
 * Mock window.matchMedia API
 * 
 * @description
 * Provides a mock implementation of window.matchMedia for tests.
 * Required because JSDOM doesn't implement matchMedia by default.
 * This mock is needed for components that use media queries or
 * theme detection (like ThemeToggle component).
 * 
 * Returns a stub that always reports `matches: false` and provides
 * all required matchMedia API methods.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false, // Always returns false for simplicity in tests
    media: query,
    onchange: null,
    addListener: () => { }, // Deprecated but included for compatibility
    removeListener: () => { }, // Deprecated but included for compatibility
    addEventListener: () => { },
    removeEventListener: () => { },
    dispatchEvent: () => true,
  }),
});

/**
 * Cleanup after each test
 * 
 * @description
 * Automatically unmounts React components and cleans up the DOM
 * after each test to prevent test pollution and memory leaks.
 * Ensures tests run in isolation with a clean slate.
 */
afterEach(() => {
  cleanup();
});
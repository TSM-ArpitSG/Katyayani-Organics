/**
 * ThemeToggle Component Tests
 * 
 * @author Arpit Singh
 * @description Unit tests for the ThemeToggle component using Vitest and React Testing Library.
 * Tests theme switching functionality, localStorage persistence, and user interactions.
 * 
 * @module ThemeToggle.test
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../ThemeToggle';

/**
 * Test Suite: ThemeToggle Component
 * 
 * @description
 * Tests the ThemeToggle component's ability to:
 * - Render the toggle button correctly
 * - Toggle between light and dark modes
 * - Persist theme preference to localStorage
 * - Load saved theme preference on mount
 */
describe('ThemeToggle', () => {
  /**
   * Setup before each test
   * Clears localStorage and resets theme to light mode
   */
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Remove dark class
    document.documentElement.classList.remove('dark');
  });

  /**
   * Cleanup after each test
   * Ensures no side effects between tests
   */
  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  /**
   * Test: Renders toggle button
   * 
   * @description Verifies that the theme toggle button is rendered
   * and accessible via its ARIA role
   */
  it('renders toggle button', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  /**
   * Test: Toggles dark mode when clicked
   * 
   * @description Verifies that clicking the toggle button:
   * - Switches from light to dark mode
   * - Saves preference to localStorage
   * - Can toggle back to light mode
   */
  it('toggles dark mode when clicked', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });

    // Initially should be light mode
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click to enable dark mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    // Click to disable dark mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  /**
   * Test: Respects saved theme preference from localStorage
   * 
   * @description Verifies that when a theme preference is saved in localStorage,
   * the component loads and applies that preference on mount
   */
  it('respects saved theme preference from localStorage', () => {
    // Set dark mode preference in localStorage
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    
    // Dark mode should be applied on component mount
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
/**
 * Vitest Configuration
 * 
 * @author Arpit Singh
 * @description Configuration file for Vitest test runner.
 * Sets up React testing environment with jsdom and global test utilities.
 * 
 * @module vitest.config
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vitest configuration object
 * 
 * @description
 * Configures Vitest for testing React components with:
 * - React plugin for JSX/TSX support
 * - jsdom environment for DOM simulation
 * - Global test utilities (describe, it, expect, etc.)
 * - CSS processing for component styles
 * - Path aliases matching main Vite config
 */
export default defineConfig({
  /**
   * Vite plugins
   * Includes React plugin for Fast Refresh and JSX transform
   */
  plugins: [react()],

  /**
   * Test-specific configuration
   */
  test: {
    /**
     * Enable global test APIs
     * Makes describe, it, expect, etc. available without imports
     */
    globals: true,

    /**
     * Test environment
     * Uses jsdom to simulate browser DOM for component testing
     */
    environment: 'jsdom',

    /**
     * Setup files to run before tests
     * Configures Testing Library and global mocks
     */
    setupFiles: './src/test/setup.ts',

    /**
     * Enable CSS processing in tests
     * Allows importing and testing components with styles
     */
    css: true,
  },

  /**
   * Module resolution configuration
   */
  resolve: {
    /**
     * Path aliases
     * Allows importing with '@/' prefix pointing to src directory
     * Example: import Component from '@/components/Component'
     */
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
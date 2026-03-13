/**
 * MSW Browser Worker Setup
 * 
 * @author Arpit Singh
 * @description Configures and exports Mock Service Worker for browser environment.
 * Intercepts network requests during development for API mocking.
 * 
 * @module mocks/browser
 */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * MSW Service Worker instance
 * 
 * @description
 * Browser-specific MSW worker that intercepts fetch/XHR requests.
 * Initialized in main.tsx before React app renders.
 * 
 * The worker runs in a Service Worker thread and intercepts all
 * network requests matching the defined handlers.
 * 
 * Usage: worker.start() in main.tsx (development only)
 */
export const worker = setupWorker(...handlers);
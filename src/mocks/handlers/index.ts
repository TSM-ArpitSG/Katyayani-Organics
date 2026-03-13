/**
 * MSW Request Handlers
 * 
 * @author Arpit Singh
 * @description Mock Service Worker handlers that intercept API requests.
 * Simulates a complete REST API for authentication and task management.
 * 
 * @module handlers
 * @example
 * // Handlers are automatically used by MSW browser instance
 * // No direct import needed in application code
 */

import { http, HttpResponse } from 'msw';
import { db } from './db';
import type { LoginRequest, CreateTaskRequest, UpdateTaskRequest } from '../../types';

/**
 * Fake JWT token for mock authentication
 * Used to simulate backend authentication without a real server
 */
const FAKE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidGVzdCJ9.fake';

/**
 * Simulate network latency
 * 
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>} Promise that resolves after delay
 * 
 * @description
 * Adds realistic network delay to mock API responses,
 * making the development experience closer to production.
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * MSW Request Handlers Array
 * 
 * @description
 * Defines all intercepted API endpoints with mock implementations.
 * Handles authentication, CRUD operations for tasks, and error cases.
 */
export const handlers = [
  /**
   * POST /api/login - User authentication
   * 
   * @description
   * Simulates user login with hardcoded credentials.
   * Returns JWT token and user object on success.
   * 
   * Credentials: username="test", password="test123"
   * 
   * @returns {200} Success with token and user
   * @returns {401} Invalid credentials
   */
  http.post('/api/login', async ({ request }) => {
    await delay(500); // Simulate network delay

    const body = await request.json() as LoginRequest;
    const { username, password } = body;

    // Check credentials (hardcoded for demo purposes)
    if (username === 'test' && password === 'test123') {
      return HttpResponse.json({
        success: true,
        token: FAKE_JWT,
        user: {
          id: 1,
          username: 'test',
        },
      });
    }

    // Invalid credentials - return 401 error
    return HttpResponse.json(
      { success: false, message: 'Invalid username or password' },
      { status: 401 }
    );
  }),

  /**
   * GET /api/tasks - Fetch all tasks
   * 
   * @description
   * Returns complete list of tasks from mock database.
   * Used by dashboard to display all user tasks.
   * 
   * @returns {200} Array of all tasks
   */
  http.get('/api/tasks', async () => {
    await delay(300); // Simulate network delay

    const tasks = db.tasks.getAll();
    return HttpResponse.json(tasks);
  }),

  /**
   * POST /api/tasks - Create new task
   * 
   * @description
   * Creates a new task with provided data.
   * Auto-generates ID and timestamps.
   * 
   * @returns {201} Newly created task object
   */
  http.post('/api/tasks', async ({ request }) => {
    await delay(400); // Simulate network delay

    const body = await request.json() as CreateTaskRequest;
    const newTask = db.tasks.create(body);

    return HttpResponse.json(newTask, { status: 201 });
  }),

  /**
   * PUT /api/tasks/:id - Update existing task
   * 
   * @description
   * Updates specified fields of an existing task.
   * Returns updated task on success.
   * 
   * @param {string} id - Task ID from URL parameter
   * @returns {200} Updated task object
   * @returns {404} Task not found
   */
  http.put('/api/tasks/:id', async ({ request, params }) => {
    await delay(400); // Simulate network delay

    const { id } = params;
    const body = await request.json() as UpdateTaskRequest;

    const updatedTask = db.tasks.update(id as string, body);

    // Handle task not found case
    if (!updatedTask) {
      return HttpResponse.json(
        { success: false, message: 'Task not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(updatedTask);
  }),

  /**
   * DELETE /api/tasks/:id - Delete task
   * 
   * @description
   * Permanently removes a task from the database.
   * Returns success message on completion.
   * 
   * @param {string} id - Task ID from URL parameter
   * @returns {200} Success message
   * @returns {404} Task not found
   */
  http.delete('/api/tasks/:id', async ({ params }) => {
    await delay(300); // Simulate network delay

    const { id } = params;
    const deleted = db.tasks.delete(id as string);

    // Handle task not found case
    if (!deleted) {
      return HttpResponse.json(
        { success: false, message: 'Task not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      message: 'Task deleted successfully',
    });
  }),
];
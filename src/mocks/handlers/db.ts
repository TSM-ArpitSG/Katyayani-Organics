/**
 * Mock Database Module
 * 
 * @author Arpit Singh
 * @description In-memory database with localStorage persistence for MSW mock API.
 * Simulates backend database operations for task management.
 * 
 * @module db
 * @example
 * import { db } from './db';
 * 
 * const tasks = db.tasks.getAll();
 * const newTask = db.tasks.create({ title, description, status });
 */

import type { Task } from '../../types';

/**
 * localStorage key for persisting task data
 * Ensures data survives page refreshes during development
 */
const STORAGE_KEY = 'katyayani-tasks';

/**
 * Load tasks from localStorage or return default demo tasks
 * 
 * @returns {Task[]} Array of tasks from storage or defaults
 * 
 * @description
 * Checks localStorage for existing tasks. If none found, returns
 * a set of default demo tasks to showcase the application functionality.
 */
const loadTasks = (): Task[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  // Default demo tasks - shown on first app load
  return [
    {
      id: '1',
      title: 'Complete Katyayani Assignment',
      description: 'Build a task management app with React, TypeScript, and MSW',
      status: 'in-progress',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Deploy to Vercel',
      description: 'Host the application online for submission',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

/**
 * Persist tasks to localStorage
 * 
 * @param {Task[]} tasks - Array of tasks to save
 * 
 * @description
 * Serializes and stores tasks in localStorage to maintain state
 * across page refreshes during development and testing.
 */
const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

/**
 * In-memory tasks array
 * Acts as the "database" for the mock API
 */
let tasks: Task[] = loadTasks();

/**
 * Database operations interface
 * Simulates CRUD operations for task management
 * 
 * @namespace db
 */
export const db = {
  tasks: {
    /**
     * Get all tasks
     * 
     * @returns {Task[]} Array of all tasks
     * 
     * @description
     * Returns the complete list of tasks from in-memory storage.
     * Used by GET /api/tasks endpoint.
     */
    getAll: (): Task[] => tasks,

    /**
     * Get task by ID
     * 
     * @param {number} id - Task ID to find
     * @returns {Task | undefined} Found task or undefined
     * 
     * @description
     * Searches for a specific task by its ID.
     * Returns undefined if not found.
     */
    getById: (id: string): Task | undefined => {
      return tasks.find(task => task.id === id);
    },

    /**
     * Create new task
     * 
     * @param {Omit<Task, 'id' | 'createdAt' | 'updatedAt'>} data - Task data without auto-generated fields
     * @returns {Task} Newly created task with all fields
     * 
     * @description
     * Creates a new task with auto-generated ID and timestamps.
     * Persists to localStorage and returns the complete task object.
     * Used by POST /api/tasks endpoint.
     */
    create: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task => {
      const newTask: Task = {
        ...data,
        id: Date.now().toString(), // Simple ID generation using timestamp
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      tasks.push(newTask);
      saveTasks(tasks);
      return newTask;
    },

    /**
     * Update existing task
     * 
     * @param {number} id - Task ID to update
     * @param {Partial<Task>} data - Fields to update
     * @returns {Task | null} Updated task or null if not found
     * 
     * @description
     * Updates specified fields of an existing task.
     * Automatically updates the 'updatedAt' timestamp.
     * Returns null if task with given ID doesn't exist.
     * Used by PUT /api/tasks/:id endpoint.
     */
    update: (id: string, data: Partial<Task>): Task | null => {
      const index = tasks.findIndex(task => task.id === id);
      if (index === -1) return null;

      tasks[index] = {
        ...tasks[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      saveTasks(tasks);
      return tasks[index];
    },

    /**
     * Delete task by ID
     * 
     * @param {number} id - Task ID to delete
     * @returns {boolean} True if deleted, false if not found
     * 
     * @description
     * Removes a task from the database by its ID.
     * Returns true if successful, false if task doesn't exist.
     * Used by DELETE /api/tasks/:id endpoint.
     */
    delete: (id: string): boolean => {
      const initialLength = tasks.length;
      tasks = tasks.filter(task => task.id !== id);
      if (tasks.length < initialLength) {
        saveTasks(tasks);
        return true;
      }
      return false;
    },
  },
};
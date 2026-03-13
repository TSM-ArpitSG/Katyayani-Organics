/**
 * TypeScript Type Definitions
 * 
 * @author Arpit Singh
 * @description Centralized type definitions for the entire application.
 * Includes types for users, authentication, tasks, and API requests/responses.
 * 
 * @module types
 */

// ==================== User and Authentication Types ====================

export interface User {
  id: string;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

// ==================== Task Types ====================

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface DeleteTaskResponse {
  success: boolean;
  message: string;
}
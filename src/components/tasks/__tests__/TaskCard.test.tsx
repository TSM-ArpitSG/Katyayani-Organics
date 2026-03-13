/**
 * TaskCard Component Tests
 * 
 * @author Arpit Singh
 * @description Unit tests for the TaskCard component using Vitest and React Testing Library.
 * Tests rendering, user interactions, and status display functionality.
 * 
 * @module TaskCard.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../TaskCard';
import type { Task } from '../../../types';

/**
 * Test Suite: TaskCard Component
 * 
 * @description
 * Tests the TaskCard component's ability to:
 * - Render task information correctly
 * - Handle edit button clicks
 * - Handle delete button clicks
 * - Display appropriate status badges for different task statuses
 */
describe('TaskCard', () => {
  // Mock task data for testing
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  // Mock callback functions
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  /**
   * Test: Renders task information correctly
   * 
   * @description Verifies that all task properties (title, description, status)
   * are displayed in the component
   */
  it('renders task information correctly', () => {
    render(
      <TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    // Assert that all task details are visible in the document
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  /**
   * Test: Calls onEdit when edit button is clicked
   * 
   * @description Verifies that clicking the edit button triggers the onEdit
   * callback with the correct task object
   */
  it('calls onEdit when edit button is clicked', () => {
    render(
      <TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    // Find and click the edit button
    const editButton = screen.getByTitle('Edit task');
    fireEvent.click(editButton);

    // Assert that onEdit was called with the task object
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
  });

  /**
   * Test: Calls onDelete when delete button is clicked
   * 
   * @description Verifies that clicking the delete button triggers the onDelete
   * callback with the correct task object
   */
  it('calls onDelete when delete button is clicked', () => {
    render(
      <TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    // Find and click the delete button
    const deleteButton = screen.getByTitle('Delete task');
    fireEvent.click(deleteButton);

    // Assert that onDelete was called with the task object
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask);
  });

  /**
   * Test: Displays correct status badge color for different statuses
   * 
   * @description Verifies that the component displays the appropriate status
   * badge text for completed and in-progress tasks by re-rendering with different
   * task statuses
   */
  it('displays correct status badge color for different statuses', () => {
    // Test 'completed' status
    const completedTask = { ...mockTask, status: 'completed' as const };
    const { rerender } = render(
      <TaskCard task={completedTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(screen.getByText('Completed')).toBeInTheDocument();

    // Test 'in-progress' status by re-rendering with new data
    const inProgressTask = { ...mockTask, status: 'in-progress' as const };
    rerender(
      <TaskCard task={inProgressTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });
});
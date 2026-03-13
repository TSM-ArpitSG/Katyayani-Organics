/**
 * TaskCard Component
 * 
 * @author Arpit Singh
 * @description Individual task card component displaying task information with edit/delete actions.
 * Features smooth animations, hover effects, and status badges with the Sunset Redux theme.
 * 
 * @component
 * @example
 * <TaskCard 
 *   task={taskObject} 
 *   onEdit={handleEdit} 
 *   onDelete={handleDelete} 
 * />
 */

import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import type { Task } from '../../types';

/**
 * Props for TaskCard component
 * @interface TaskCardProps
 * @property {Task} task - The task object to display
 * @property {Function} onEdit - Callback when edit button is clicked
 * @property {Function} onDelete - Callback when delete button is clicked
 */
interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

/**
 * Color mappings for different task statuses
 * Supports both light and dark modes with appropriate contrast
 */
const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800',
};

/**
 * Human-readable labels for task statuses
 */
const statusLabels = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

/**
 * TaskCard - Individual task display card component
 * 
 * @param {TaskCardProps} props - Component props
 * @returns {JSX.Element} Animated task card with actions
 * 
 * @description
 * Features:
 * - Animated entrance and exit transitions
 * - Smooth hover effect with lift and shadow
 * - Edit and delete action buttons
 * - Color-coded status badges
 * - Formatted timestamp display
 * - Line-clamped text for title and description
 * - Responsive to light/dark mode
 */
export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <motion.div
      layout // Smoothly animates position changes
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{
        y: -4, // Lift effect on hover
        boxShadow: "0 20px 40px -15px rgba(251, 113, 133, 0.3)",
        transition: { duration: 0.2 }
      }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800/50 p-5 transition-all cursor-pointer"
    >
      {/* Header: Task Title and Action Buttons */}
      <div className="flex justify-between items-start mb-3">
        {/* Task Title - Limited to 2 lines */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 line-clamp-2">
          {task.title}
        </h3>

        {/* Action Buttons: Edit and Delete */}
        <div className="flex items-center gap-1 ml-4">
          {/* Edit Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(task)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors"
            title="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </motion.button>

          {/* Delete Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(task)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Task Description - Limited to 2 lines */}
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* Footer: Status Badge and Timestamps */}
      <div className="flex items-center justify-between">
        {/* Status Badge - Color-coded by status */}
        <motion.span
          layout
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}
        >
          {statusLabels[task.status]}
        </motion.span>

        {/* Timestamps */}
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[10px] text-gray-400 dark:text-gray-500">
            Created: {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500">
            Updated: {new Date(task.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
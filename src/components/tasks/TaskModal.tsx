/**
 * TaskModal Component
 * 
 * @author Arpit Singh
 * @description Modal dialog for creating and editing tasks with Formik validation.
 * Features animated entrance, form validation with Yup, and real-time error feedback.
 * 
 * @component
 * @example
 * <TaskModal 
 *   isOpen={true} 
 *   onClose={handleClose} 
 *   onSubmit={handleSubmit}
 *   task={existingTask} // Optional - for editing
 * />
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X, Loader2 } from 'lucide-react';
import type { Task, TaskStatus } from '../../types';

/**
 * Props for TaskModal component
 * @interface TaskModalProps
 * @property {boolean} isOpen - Controls modal visibility
 * @property {Function} onClose - Callback when modal should close
 * @property {Function} onSubmit - Async callback when form is submitted
 * @property {Task | null} [task] - Optional task object for editing (creates new task if null)
 */
interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => Promise<void>;
  task?: Task | null;
}

/**
 * Form values structure for task creation/editing
 * @interface TaskFormValues
 * @property {string} title - Task title (3-100 characters)
 * @property {string} description - Task description (10-500 characters)
 * @property {TaskStatus} status - Task status (pending/in-progress/completed)
 */
export interface TaskFormValues {
  title: string;
  description: string;
  status: TaskStatus;
}

/**
 * Yup validation schema for task form
 * Ensures all fields meet requirements before submission
 */
const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  status: Yup.string()
    .required('Status is required')
    .oneOf(['pending', 'in-progress', 'completed']),
});

/**
 * TaskModal - Modal dialog for task creation and editing
 * 
 * @param {TaskModalProps} props - Component props
 * @returns {JSX.Element} Animated modal with form
 * 
 * @description
 * Features:
 * - Create new tasks or edit existing ones
 * - Formik form management with Yup validation
 * - Real-time validation feedback
 * - Animated entrance/exit transitions
 * - Backdrop with blur effect
 * - Loading state during submission
 * - Sunset Redux gradient styling
 * - Responsive design
 */
export default function TaskModal({ isOpen, onClose, onSubmit, task }: TaskModalProps) {
  // Initialize Formik form with validation
  const formik = useFormik<TaskFormValues>({
    initialValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || 'pending',
    },
    validationSchema,
    enableReinitialize: true, // Reset form when task prop changes
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
        onClose();
        formik.resetForm();
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Darkened overlay with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Modal Container - Centered */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-orange-100 dark:border-orange-900/30"
            >
              {/* Modal Header - Title and Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 dark:from-orange-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
                  {task ? 'Edit Task' : 'Create New Task'}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Form Body */}
              <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
                {/* Title Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Task Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    {...formik.getFieldProps('title')}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${formik.touched.title && formik.errors.title
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500/20'
                      } focus:ring-4 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition`}
                    placeholder="Enter task title"
                  />
                  {/* Error message for title field */}
                  {formik.touched.title && formik.errors.title && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {formik.errors.title}
                    </motion.p>
                  )}
                </motion.div>

                {/* Description Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    {...formik.getFieldProps('description')}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${formik.touched.description && formik.errors.description
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500/20'
                      } focus:ring-4 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition resize-none`}
                    placeholder="Describe your task in detail"
                  />
                  {/* Error message for description field */}
                  {formik.touched.description && formik.errors.description && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {formik.errors.description}
                    </motion.p>
                  )}
                </motion.div>

                {/* Status Field - Dropdown Select */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Status *
                  </label>
                  <select
                    id="status"
                    {...formik.getFieldProps('status')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </motion.div>

                {/* Form Action Buttons - Cancel and Submit */}
                <motion.div
                  className="flex gap-3 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Cancel Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </motion.button>

                  {/* Submit Button - With animated shine effect */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    className="relative overflow-hidden flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 hover:from-orange-600 hover:via-pink-600 hover:to-rose-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30"
                  >
                    {/* Animated shine effect on button */}
                    {!formik.isSubmitting && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          repeatDelay: 1
                        }}
                      />
                    )}
                    {/* Button text with loading state */}
                    <span className="relative z-10 flex items-center gap-2">
                      {formik.isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>{task ? 'Update Task' : 'Create Task'}</>
                      )}
                    </span>
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
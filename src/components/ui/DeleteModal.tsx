/**
 * DeleteModal Component
 * 
 * @author Arpit Singh
 * @description Confirmation modal for task deletion with warning UI.
 * Features animated entrance, loading state, and prominent warning indicators.
 * 
 * @component
 * @example
 * <DeleteModal 
 *   isOpen={true} 
 *   onClose={handleClose} 
 *   onConfirm={handleDelete}
 *   taskTitle="My Task"
 *   isDeleting={false}
 * />
 */

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Props for DeleteModal component
 * @interface DeleteModalProps
 * @property {boolean} isOpen - Controls modal visibility
 * @property {Function} onClose - Callback when modal is closed/cancelled
 * @property {Function} onConfirm - Callback when delete is confirmed
 * @property {string} [taskTitle] - Optional task title to display in confirmation
 * @property {boolean} [isDeleting=false] - Loading state during deletion
 */
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle?: string;
  isDeleting?: boolean;
}

/**
 * DeleteModal - Confirmation dialog for task deletion
 * 
 * @param {DeleteModalProps} props - Component props
 * @returns {JSX.Element} Animated confirmation modal
 * 
 * @description
 * Features:
 * - Warning icon and prominent delete messaging
 * - Shows task title for confirmation
 * - "Cannot be undone" warning
 * - Loading state during deletion process
 * - Animated entrance and exit
 * - Backdrop with blur effect
 * - Disabled interactions during deletion
 * - Red gradient theme for danger action
 */
export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
  isDeleting = false
}: DeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Darkened overlay with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Modal Container - Centered */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border-2 border-red-200 dark:border-red-800/50"
            >
              {/* Header - Warning Icon and Title */}
              <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  {/* Warning Icon Badge */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Delete Task?
                  </h2>
                </div>
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  disabled={isDeleting}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Modal Content - Confirmation Message */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {/* Confirmation Question */}
                <motion.p
                  className="text-gray-600 dark:text-gray-400 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Are you sure you want to delete this task?
                </motion.p>

                {/* Task Title Display - Shows what will be deleted */}
                {taskTitle && (
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                      "{taskTitle}"
                    </p>
                  </motion.div>
                )}

                {/* Warning Message - Permanent action notice */}
                <motion.p
                  className="text-sm text-red-600 dark:text-red-400 mt-4 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  This action cannot be undone.
                </motion.p>
              </motion.div>

              {/* Action Buttons - Cancel and Delete */}
              <motion.div
                className="flex gap-3 p-6 pt-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* Cancel Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </motion.button>

                {/* Delete Confirm Button - Danger action with loading state */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition shadow-lg shadow-red-500/30 disabled:cursor-not-allowed"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Task'}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
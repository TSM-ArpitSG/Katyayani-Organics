/**
 * LogoutModal Component
 * 
 * @author Arpit Singh
 * @description Confirmation modal for user logout with sunset theme styling.
 * Features animated entrance, displays current user, and provides clear logout confirmation.
 * 
 * @component
 * @example
 * <LogoutModal 
 *   isOpen={true} 
 *   onClose={handleClose} 
 *   onConfirm={handleLogout}
 *   username="john_doe"
 * />
 */

import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';

/**
 * Props for LogoutModal component
 * @interface LogoutModalProps
 * @property {boolean} isOpen - Controls modal visibility
 * @property {Function} onClose - Callback when modal is closed/cancelled
 * @property {Function} onConfirm - Callback when logout is confirmed
 * @property {string} [username] - Optional username to display in confirmation
 */
interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  username?: string;
}

/**
 * LogoutModal - Confirmation dialog for user logout
 * 
 * @param {LogoutModalProps} props - Component props
 * @returns {JSX.Element} Animated confirmation modal
 * 
 * @description
 * Features:
 * - Logout icon with sunset gradient badge
 * - Shows current logged-in username
 * - Re-login reminder message
 * - Animated entrance and exit
 * - Backdrop with blur effect
 * - Sunset Redux gradient theme
 * - Responsive design
 */
export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
  username
}: LogoutModalProps) {
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border-2 border-orange-200 dark:border-orange-800/50"
            >
              {/* Header - Logout Icon and Title */}
              <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  {/* Logout Icon Badge - Sunset gradient */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30">
                    <LogOut className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Log Out?
                  </h2>
                </div>
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
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
                  className="text-gray-600 dark:text-gray-400 mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Are you sure you want to log out?
                </motion.p>

                {/* Current User Display - Shows who is logged in */}
                {username && (
                  <motion.div
                    className="bg-gradient-to-r from-orange-50 via-pink-50 to-rose-50 dark:from-orange-900/20 dark:via-pink-900/20 dark:to-rose-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Currently logged in as
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">
                      {username}
                    </p>
                  </motion.div>
                )}

                {/* Info Message - Re-login reminder */}
                <motion.p
                  className="text-sm text-gray-500 dark:text-gray-400 mt-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  You'll need to log in again to access your tasks.
                </motion.p>
              </motion.div>

              {/* Action Buttons - Cancel and Logout */}
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
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </motion.button>

                {/* Logout Confirm Button - Sunset gradient theme */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 hover:from-orange-600 hover:via-pink-600 hover:to-rose-600 text-white font-medium rounded-lg transition shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
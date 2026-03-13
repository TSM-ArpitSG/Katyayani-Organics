/**
 * Header Component
 * 
 * @author Arpit Singh
 * @description Main navigation header with user info, theme toggle, and logout functionality.
 * Features animated entrance, sunset-themed gradients, and responsive design.
 * 
 * @component
 * @example
 * <Header />
 */

import { motion } from 'framer-motion';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { logout } from '../../store/slices/authSlice';
import { useState } from 'react';
import LogoutModal from '../ui/LogoutModal';
import ThemeToggle from '../ui/ThemeToggle';

/**
 * Header - Application navigation bar component
 * 
 * @returns {JSX.Element} Animated header with branding and user controls
 * 
 * @description
 * Features:
 * - App branding with animated logo
 * - User profile badge showing current username
 * - Theme toggle button (light/dark mode)
 * - Logout button with confirmation modal
 * - Sticky positioning with backdrop blur
 * - Sunset Redux theme styling
 * - Smooth entrance animations
 */
export default function Header() {
  // Hooks for navigation and Redux state management
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  // State for logout confirmation modal
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  /**
   * Opens the logout confirmation modal
   */
  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  /**
   * Executes logout process after confirmation
   * - Dispatches Redux logout action
   * - Shows success toast notification
   * - Navigates to login page
   * - Closes confirmation modal
   */
  const confirmLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      {/* Main Header - Sticky with backdrop blur */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 dark:bg-gray-800/80 border-b border-orange-100 dark:border-orange-900/30 sticky top-0 z-30 backdrop-blur-lg"
      >
        <div className="flex justify-between items-center h-16">

          {/* Left Section: Logo & Brand Title */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            {/* Logo Badge with gradient */}
            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-rose-500 rounded-xl shadow-lg shadow-orange-500/30">
              <span className="text-white font-bold text-lg sm:text-xl">K</span>
            </div>

            {/* Brand Text - Hide tagline on mobile */}
            <div>
              <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 dark:from-orange-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
                Katyayani Tasks
              </h1>
              <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
                Stay Organized, Stay Productive
              </p>
            </div>
          </motion.div>

          {/* Right Section: User Controls */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 sm:gap-4"
          >

            {/* User Badge - Compact on mobile */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-50 via-pink-50 to-rose-50 dark:from-orange-900/20 dark:via-pink-900/20 dark:to-rose-900/20 rounded-lg sm:rounded-xl border border-orange-200 dark:border-orange-800/50">
              <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-500 via-pink-500 to-rose-500 rounded-md sm:rounded-lg shadow-sm">
                <UserIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white max-w-[60px] sm:max-w-none truncate">
                {user?.username}
              </span>
            </div>

            {/* Theme Toggle Button - Slightly smaller on mobile */}
            <div className="scale-90 sm:scale-100">
              <ThemeToggle />
            </div>

            {/* Logout Button - Icon only on mobile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium rounded-lg sm:rounded-xl transition border border-red-200 dark:border-red-800"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Logout Confirmation Modal - Rendered outside header for proper z-index */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        username={user?.username}
      />
    </>
  );
}
/**
 * ThemeToggle Component
 * 
 * @author Arpit Singh
 * @description Animated toggle button for switching between light and dark themes.
 * Features sliding animation, icon transitions, and persistent theme storage.
 * 
 * @component
 * @example
 * <ThemeToggle />
 */

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * ThemeToggle - Interactive theme switcher button
 * 
 * @returns {JSX.Element} Animated theme toggle button
 * 
 * @description
 * Features:
 * - Smooth sliding animation between light/dark modes
 * - Persists theme preference to localStorage
 * - Respects system color scheme preference on first load
 * - Animated sun/moon icon transitions
 * - Sunset gradient for light mode, purple gradient for dark mode
 * - Spring physics for natural toggle motion
 * - Accessible with ARIA labels
 */
export default function ThemeToggle() {
  // State to track current theme (true = dark, false = light)
  const [isDark, setIsDark] = useState(false);

  /**
   * Initialize theme on component mount
   * - Checks localStorage for saved preference
   * - Falls back to system color scheme preference
   * - Applies theme to document root
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  /**
   * Toggle theme between light and dark modes
   * - Updates state
   * - Applies/removes 'dark' class to document root
   * - Persists preference to localStorage
   */
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-gradient-to-r from-orange-400 via-pink-400 to-rose-400 dark:from-purple-500 dark:via-pink-500 dark:to-rose-500 rounded-full p-1 transition-colors shadow-lg"
      aria-label="Toggle theme"
    >
      {/* Sliding Circle - Moves left/right with theme change */}
      <motion.div
        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: isDark ? 22 : 0, // Slide right when dark, left when light
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icon - Moon for dark mode, Sun for light mode */}
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-purple-600" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-orange-600" />
        )}
      </motion.div>
    </motion.button>
  );
}
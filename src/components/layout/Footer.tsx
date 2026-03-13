/**
 * Footer Component - Developer Credit Badge
 * 
 * @author Arpit Singh
 * @description Floating developer credit badge with glass morphism design.
 * Features avatar icon, gradient border glow, and high contrast in all themes.
 * Displays professional developer attribution in bottom-right corner.
 * Now draggable - user can click and hold to reposition.
 * 
 * @component
 * @example
 * <Footer />
 */

import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

/**
 * Footer - Developer credit badge component
 * 
 * @returns {JSX.Element} Glass morphism badge with developer attribution
 * 
 * @description
 * Displays "Developed by Arpit Singh" in a modern glass card design with:
 * - Glass morphism effect (backdrop blur + semi-transparent background)
 * - Gradient avatar icon circle
 * - Animated gradient glow border
 * - Hover scale effect
 * - High contrast text visible in light and dark modes
 * - Draggable positioning - click and hold to move anywhere on screen
 * - Responsive design
 * 
 * Design Features:
 * - Avatar: Gradient circle with User icon
 * - Text: Two-line layout with label and name
 * - Border: Gradient border with theme-aware colors
 * - Glow: Animated gradient blur effect on hover
 * - Shadow: Deep shadow for depth
 * - Drag: Smooth dragging with viewport constraints
 */
export default function Footer() {
  const constraintsRef = useRef(null);

  return (
    <>
      {/* Invisible viewport container for drag constraints */}
      <motion.div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none"
      />

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 cursor-grab active:cursor-grabbing"
        whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
      >
        <div className="group relative">
          {/* Gradient glow effect - should NOT block view */}
          <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-xl sm:rounded-2xl opacity-30 group-hover:opacity-50 blur-lg sm:blur-xl transition duration-300 pointer-events-none"></div>

          {/* Glass card with proper glassmorphism - Responsive sizing */}
          <div className="relative px-2.5 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-orange-50/30 via-pink-50/30 to-rose-50/30 dark:from-orange-900/30 dark:via-pink-900/30 dark:to-rose-900/30 backdrop-filter backdrop-blur-lg rounded-xl sm:rounded-2xl border border-orange-200/50 dark:border-orange-800/50 sm:border-2 shadow-xl sm:shadow-2xl flex items-center gap-2 sm:gap-3 group-hover:scale-105 transition-transform duration-300">

            {/* Avatar circle - Responsive size */}
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md sm:shadow-lg">
              <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
            </div>

            {/* Text content - Responsive text sizes */}
            <div className="flex flex-col leading-tight">
              {/* Label text - Smaller on mobile */}
              <span className="text-[8px] sm:text-[10px] text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">
                Developed by
              </span>

              {/* Developer name - Responsive gradient text */}
              <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 dark:from-orange-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
                Arpit Singh
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
/**
 * CustomToast Component
 * 
 * @author Arpit Singh
 * @description Custom toast notification component with animated progress ring.
 * Features gradient backgrounds, animated icons, and countdown progress visualization.
 * 
 * @component
 * @example
 * <CustomToast 
 *   message="Task created successfully!" 
 *   type="success" 
 *   duration={3000} 
 * />
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

/**
 * Props for CustomToast component
 * @interface CustomToastProps
 * @property {string} message - The notification message to display
 * @property {'success' | 'error' | 'loading'} type - Type of toast notification
 * @property {number} [duration=3000] - Duration in milliseconds before auto-dismiss
 */
interface CustomToastProps {
  message: string;
  type: 'success' | 'error' | 'loading';
  duration?: number;
}

/**
 * CustomToast - Animated notification toast component
 * 
 * @param {CustomToastProps} props - Component props
 * @returns {JSX.Element} Animated toast notification
 * 
 * @description
 * Features:
 * - Circular progress ring showing time remaining
 * - Type-specific gradient backgrounds and icons
 * - Smooth entrance and exit animations
 * - Loading spinner for async operations
 * - Auto-dismissing after specified duration
 * - Responsive design with modern UI
 */
export default function CustomToast({ message, type, duration = 3000 }: CustomToastProps) {
  // Progress state for countdown animation (100 = full, 0 = empty)
  const [progress, setProgress] = useState(100);

  /**
   * Progress countdown effect
   * Updates progress every 50ms for smooth animation
   * Skipped for loading toasts (no auto-dismiss)
   */
  useEffect(() => {
    if (type === 'loading') return; // Don't show progress for loading

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 50));
        return newProgress < 0 ? 0 : newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, type]);

  /**
   * Configuration object for different toast types
   * Maps type to gradient color and icon component
   */
  const config = {
    success: {
      gradient: 'from-green-500 to-emerald-600',
      icon: CheckCircle,
    },
    error: {
      gradient: 'from-red-500 to-red-600',
      icon: XCircle,
    },
    loading: {
      gradient: 'from-orange-500 via-pink-500 to-rose-500',
      icon: Loader2,
    },
  };

  // Extract gradient and icon for current type
  const { gradient, icon: Icon } = config[type];

  // Calculate SVG circle progress values
  const circumference = 2 * Math.PI * 18; // Circle circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r ${gradient} text-white shadow-2xl border-2 border-white/20 backdrop-blur-lg min-w-[320px]`}
    >
      {/* Circular Progress Ring - Shown for success and error types */}
      {type !== 'loading' && (
        <div className="relative flex-shrink-0">
          <svg className="w-12 h-12 -rotate-90">
            {/* Background circle (static) */}
            <circle
              cx="24"
              cy="24"
              r="18"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="3"
            />
            {/* Progress circle (animated countdown) */}
            <circle
              cx="24"
              cy="24"
              r="18"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-100 ease-linear"
            />
          </svg>
          {/* Icon centered inside progress ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
        </div>
      )}

      {/* Loading Spinner - Shown only for loading type */}
      {type === 'loading' && (
        <div className="flex-shrink-0">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}

      {/* Toast Message */}
      <div className="flex-1">
        <p className="font-semibold text-sm leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
}
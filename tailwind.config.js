/**
 * Tailwind CSS Configuration
 * 
 * @author Arpit Singh
 * @description Custom Tailwind configuration with extended theme.
 * Includes custom colors, animations, and dark mode support.
 * 
 * Features:
 * - Off-white color palette (2024 design trend)
 * - Custom animations (fade, slide, scale, shimmer, gradient)
 * - Dark mode with class-based toggle
 * - Custom keyframes for smooth transitions
 */

/** @type {import('tailwindcss').Config} */
export default {
  /**
   * Content paths for Tailwind to scan
   * Includes HTML and all JS/TS/JSX/TSX files
   */
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  /**
   * Dark mode configuration
   * Uses class-based toggle via ThemeToggle component
   */
  darkMode: 'class',

  /**
   * Theme extensions
   */
  theme: {
    extend: {
      /**
       * Custom color palette
       * 
       * @description
       * Off-white and warm gray palette for modern, elegant design.
       * Follows 2024 design trends with softer, warmer tones.
       */
      colors: {
        // Primary off-white color
        'off-white': '#FAFAF9',

        // Warm gray scale for neutral elements
        'warm-gray': {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
      },

      /**
       * Custom animations
       * 
       * @description
       * Predefined animation utilities for consistent transitions.
       * Used throughout the app for entrance/exit effects.
       */
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'gradient': 'gradient 8s ease infinite',
      },

      /**
       * Keyframe definitions
       * 
       * @description
       * Custom @keyframes for the animations above.
       * Provides smooth, polished motion effects.
       */
      keyframes: {
        // Fade in from transparent to opaque
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },

        // Slide up with fade
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },

        // Slide down with fade
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },

        // Scale in with fade (used for modals, cards)
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },

        // Shimmer effect (loading states)
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },

        // Gradient animation (backgrounds)
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
      },

      /**
       * Backdrop blur utilities
       * Extra small blur for subtle glass effects
       */
      backdropBlur: {
        xs: '2px',
      },
    },
  },

  /**
   * Tailwind plugins
   * Currently none - add custom plugins here if needed
   */
  plugins: [],
}
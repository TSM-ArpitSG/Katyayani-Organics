/**
 * RegisterPage Component
 * 
 * @author Arpit Singh
 * @description User registration page with Formik validation and animated UI.
 * Features form validation, sunset theme styling matching the login page.
 * 
 * @component
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { UserPlus, Loader2, Lock, User, Zap } from 'lucide-react';
import { useAppDispatch } from '../hooks/useRedux';
import { setCredentials } from '../store/slices/authSlice';
import Footer from '../components/layout/Footer';
import api from '../api';

/**
 * Yup validation schema for registration form
 */
const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await api.post('/api/auth/register', {
          username: values.username,
          password: values.password,
        });

        dispatch(setCredentials({ user: response.data.user, token: response.data.token }));
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Registration failed');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-orange-950 dark:to-pink-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-pink-400/20 to-purple-400/20 dark:from-orange-600/10 dark:via-pink-600/10 dark:to-purple-600/10 animate-gradient"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 border border-orange-100 dark:border-orange-900/30">
          {/* Logo & Title */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-5 sm:mb-6"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 via-pink-500 to-rose-500 rounded-2xl sm:rounded-3xl mb-2.5 sm:mb-3 shadow-lg shadow-orange-500/40 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <UserPlus className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" strokeWidth={2.5} />
            </motion.div>
            <motion.h1
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 dark:from-orange-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent mb-1 sm:mb-1.5"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% auto' }}
            >
              Create Account
            </motion.h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Join us and start managing your tasks
            </p>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-orange-50 via-pink-50 to-rose-50 dark:from-orange-950/30 dark:via-pink-950/30 dark:to-rose-950/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3 mb-4 sm:mb-5 border border-orange-200 dark:border-orange-800/50"
          >
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">
                  Create your account with a username (min 3 chars) and password (min 6 chars).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-3.5 sm:space-y-4">
            {/* Username Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  id="username"
                  type="text"
                  {...formik.getFieldProps('username')}
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border-2 ${formik.touched.username && formik.errors.username
                    ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                    : 'border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20'
                    } bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all outline-none text-sm`}
                  placeholder="Choose a username"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-600 dark:bg-red-400"></span>
                  {formik.errors.username}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...formik.getFieldProps('password')}
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border-2 ${formik.touched.password && formik.errors.password
                    ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                    : 'border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20'
                    } bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all outline-none text-sm`}
                  placeholder="Create a password"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-600 dark:bg-red-400"></span>
                  {formik.errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  {...formik.getFieldProps('confirmPassword')}
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border-2 ${formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                    : 'border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20'
                    } bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all outline-none text-sm`}
                  placeholder="Confirm your password"
                />
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-600 dark:bg-red-400"></span>
                  {formik.errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || !formik.isValid}
              className="w-full relative overflow-hidden bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 hover:from-orange-600 hover:via-pink-600 hover:to-rose-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50 disabled:shadow-none text-sm"
              style={{ backgroundSize: '200% auto' }}
            >
              {!isLoading && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* Link to Login */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-5 text-center space-y-2"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-600 dark:text-orange-400 hover:underline font-semibold">
                Sign in
              </Link>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Built for Katyayani Organics • 2025
            </p>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

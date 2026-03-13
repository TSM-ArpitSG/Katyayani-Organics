/**
 * LoginPage Component
 * 
 * @author Arpit Singh
 * @description Authentication page with Formik validation and animated UI.
 * Features form validation and sunset theme styling.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { LogIn, Loader2, Lock, User } from 'lucide-react';
import { useAppDispatch } from '../hooks/useRedux';
import { setCredentials } from '../store/slices/authSlice';
import Footer from '../components/layout/Footer';
import api from '../api';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await api.post('/api/auth/login', values);
        dispatch(setCredentials({ user: response.data.user, token: response.data.token }));
        toast.success('Login successful!');
        navigate('/dashboard');
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Login failed');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-orange-950 dark:to-pink-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-pink-400/20 to-purple-400/20 dark:from-orange-600/10 dark:via-pink-600/10 dark:to-purple-600/10 animate-gradient"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 border border-orange-100 dark:border-orange-900/30">
          {/* Logo & Title Section */}
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
              <LogIn className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" strokeWidth={2.5} />
            </motion.div>
            <motion.h1
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 dark:from-orange-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent mb-1 sm:mb-1.5"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% auto' }}
            >
              Welcome Back
            </motion.h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Let's make today productive
            </p>
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
                  placeholder="Enter your username"
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
                  placeholder="Enter your password"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-600 dark:bg-red-400"></span>
                  {formik.errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign in
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-5 text-center space-y-2"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-600 dark:text-orange-400 hover:underline font-semibold">
                Register
              </Link>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Built for Katyayani Organics • 2026
            </p>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
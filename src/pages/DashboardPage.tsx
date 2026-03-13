/**
 * DashboardPage Component
 * 
 * @author Arpit Singh
 * @description Main dashboard page displaying task management interface.
 * Features task CRUD operations, search, filters, loading/error states, and animated UI.
 * 
 * @component
 * @example
 * <DashboardPage />
 */

/**
 * Dashboard Page
 * 
 * @author Arpit Singh
 * @description The primary task management interface. Fetches, lists, and provides
 * modals to create, update, and delete tasks dynamically. Features animated
 * layout transitions and a responsive grid system.
 */
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import { Plus, Loader2, AlertCircle, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setTasks, addTask, updateTask, deleteTask, setLoading, setError } from '../store/slices/tasksSlice';
import Header from '../components/layout/Header';
import TaskCard from '../components/tasks/TaskCard';
import TaskModal, { type TaskFormValues } from '../components/tasks/TaskModal';
import type { Task, TaskStatus } from '../types';
import DeleteModal from '../components/ui/DeleteModal';
import Footer from '../components/layout/Footer';

/**
 * DashboardPage - Main task management dashboard
 * 
 * @returns {JSX.Element} Complete dashboard interface
 * 
 * @description
 * Features:
 * - Task CRUD operations with API integration
 * - Real-time search functionality with modern UI
 * - Filter tasks by status (pending, in-progress, completed)
 * - Smooth layout animations
 * - Loading, error, and empty states
 * - Task creation/edit modal
 * - Delete confirmation modal
 * - Redux state management
 * - Toast notifications for user feedback
 * - Sunset Redux theme styling
 */
export default function DashboardPage() {
  // Redux state and dispatch
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);

  // Local component state for modals and selections
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  /**
   * Fetch tasks on component mount
   */
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Fetch all tasks from API
   * Updates Redux store with fetched tasks
   */
  const fetchTasks = async () => {
    dispatch(setLoading(true));
    try {
      const response = await api.get<Task[]>('/api/tasks');
      dispatch(setTasks(response.data));
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to fetch tasks'));
    }
  };

  /**
   * Filter and search tasks
   * 
   * @description
   * Filters tasks based on:
   * - Search query (matches title or description)
   * - Status filter (pending, in-progress, completed, or all)
   * 
   * Uses useMemo for performance optimization
   */
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [tasks, statusFilter, searchQuery]);

  /**
   * Get count of tasks by status
   */
  const taskCounts = useMemo(() => {
    return {
      all: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      'in-progress': tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
    };
  }, [tasks]);

  /**
   * Create new task via API
   * 
   * @param {TaskFormValues} values - Form data for new task
   * @throws {Error} If task creation fails
   */
  const handleCreateTask = async (values: TaskFormValues) => {
    try {
      const response = await api.post<Task>('/api/tasks', values);
      dispatch(addTask(response.data));
      toast.success('Task created successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create task');
      throw err; // Re-throw to prevent modal from closing
    }
  };

  /**
   * Update existing task via API
   * 
   * @param {TaskFormValues} values - Updated form data
   * @throws {Error} If task update fails
   */
  const handleUpdateTask = async (values: TaskFormValues) => {
    if (!selectedTask) return;

    try {
      const response = await api.put<Task>(`/api/tasks/${selectedTask.id}`, values);
      dispatch(updateTask(response.data));
      toast.success('Task updated successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update task');
      throw err; // Re-throw to prevent modal from closing
    }
  };

  /**
   * Handle form submission - routes to create or update
   * 
   * @param {TaskFormValues} values - Form data from modal
   */
  const handleSubmit = async (values: TaskFormValues) => {
    if (selectedTask) {
      await handleUpdateTask(values);
    } else {
      await handleCreateTask(values);
    }
  };

  /**
   * Open edit modal with selected task data
   * 
   * @param {Task} task - Task to edit
   */
  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  /**
   * Open delete confirmation modal
   * 
   * @param {Task} task - Task to delete
   */
  const handleDelete = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  /**
   * Confirm and execute task deletion
   * Removes task from API and Redux store
   */
  const confirmDelete = async () => {
    if (!taskToDelete) return;

    setIsDeleting(true);
    try {
      await api.delete(`/api/tasks/${taskToDelete.id}`);
      dispatch(deleteTask(taskToDelete.id));
      toast.success('Task deleted successfully!');
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Open modal for creating new task
   */
  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  /**
   * Close task modal and reset selection
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  /**
   * Clear search query
   */
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-orange-950 dark:to-pink-950 relative overflow-hidden">
      {/* Animated gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-pink-400/10 to-purple-400/10 dark:from-orange-600/5 dark:via-pink-600/5 dark:to-purple-600/5 animate-gradient"></div>

      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
          {/* Page Header with Title and Add Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 dark:from-orange-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent mb-2">
                My Tasks
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Organize and track your daily goals
              </p>
            </div>

            {/* Add Task Button with animated shine effect */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCreateModal}
              className="relative overflow-hidden flex items-center gap-2 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 hover:from-orange-600 hover:via-pink-600 hover:to-rose-600 text-white font-medium px-6 py-3 rounded-xl transition shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
            >
              {/* Animated shine effect */}
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
              <span className="relative z-10 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Task
              </span>
            </motion.button>
          </motion.div>

          {/* Modern Search Bar with Glow Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative group">
              {/* Animated glow effect on focus */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
                animate={isSearchFocused ? { opacity: 0.3 } : {}}
              />

              {/* Search input container - THIS IS THE KEY FIX */}
              <div className="relative flex items-center">
                <div className="absolute left-5 flex items-center gap-2 pointer-events-none z-10">
                  <Search className={`w-5 h-5 transition-colors duration-200 ${isSearchFocused || searchQuery
                    ? 'text-orange-500 dark:text-orange-400'
                    : 'text-gray-400'
                    }`} />
                </div>

                <input
                  type="text"
                  placeholder="Search tasks by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full h-14 pl-14 pr-14 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all outline-none shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 hover:shadow-xl"
                />

                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      onClick={clearSearch}
                      className="absolute right-3 p-1.5 rounded-full bg-gradient-to-r from-orange-100 via-pink-100 to-rose-100 dark:from-orange-900/30 dark:via-pink-900/30 dark:to-rose-900/30 text-orange-600 dark:text-orange-400 hover:from-orange-200 hover:via-pink-200 hover:to-rose-200 dark:hover:from-orange-900/50 dark:hover:via-pink-900/50 dark:hover:to-rose-900/50 transition-all shadow-sm hover:shadow-md"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Status Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 flex flex-wrap gap-3"
          >
            <FilterButton
              active={statusFilter === 'all'}
              onClick={() => setStatusFilter('all')}
              count={taskCounts.all}
            >
              All Tasks
            </FilterButton>
            <FilterButton
              active={statusFilter === 'pending'}
              onClick={() => setStatusFilter('pending')}
              count={taskCounts.pending}
              color="yellow"
            >
              Pending
            </FilterButton>
            <FilterButton
              active={statusFilter === 'in-progress'}
              onClick={() => setStatusFilter('in-progress')}
              count={taskCounts['in-progress']}
              color="blue"
            >
              In Progress
            </FilterButton>
            <FilterButton
              active={statusFilter === 'completed'}
              onClick={() => setStatusFilter('completed')}
              count={taskCounts.completed}
              color="green"
            >
              Completed
            </FilterButton>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <Loader2 className="w-8 h-8 text-orange-600 dark:text-orange-400 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
            </motion.div>
          )}

          {/* Error State - Error message with icon */}
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-900 dark:text-red-300 mb-1">
                  Error Loading Tasks
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredTasks.length === 0 && tasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-block p-6 bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 dark:from-orange-900/20 dark:via-pink-900/20 dark:to-rose-900/20 rounded-2xl mb-6 border border-orange-200 dark:border-orange-800/30"
              >
                <Plus className="w-16 h-16 text-orange-600 dark:text-orange-400" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                Start your productivity journey by creating your first task
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openCreateModal}
                className="relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 hover:from-orange-600 hover:via-pink-600 hover:to-rose-600 text-white font-medium px-8 py-4 rounded-xl transition shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
              >
                {/* Animated shine effect */}
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
                <span className="relative z-10 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create First Task
                </span>
              </motion.button>
            </motion.div>
          )}

          {/* No Results State */}
          {!loading && !error && filteredTasks.length === 0 && tasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="inline-block p-6 bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 dark:from-orange-900/20 dark:via-pink-900/20 dark:to-rose-900/20 rounded-2xl mb-6 border border-orange-200 dark:border-orange-800/30">
                <Search className="w-16 h-16 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                No tasks found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-sm mx-auto">
                No tasks match your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="text-orange-600 dark:text-orange-400 hover:underline font-medium"
              >
                Clear filters
              </button>
            </motion.div>
          )}

          {/* Delete Confirmation Modal */}
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setTaskToDelete(null);
            }}
            onConfirm={confirmDelete}
            taskTitle={taskToDelete?.title}
            isDeleting={isDeleting}
          />

          {/* Task Grid - Smooth layout animations */}
          {!loading && !error && filteredTasks.length > 0 && (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="sync">
                {filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 },
                      layout: { duration: 0.3 }
                    }}
                  >
                    <TaskCard
                      task={task}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>

      {/* Task Creation/Edit Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        task={selectedTask}
      />

      <Footer />
    </div>
  );
}

/**
 * FilterButton Component
 * 
 * @description Reusable button component for status filters with count badge
 */
interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  count: number;
  color?: 'yellow' | 'blue' | 'green';
  children: React.ReactNode;
}

function FilterButton({ active, onClick, count, color, children }: FilterButtonProps) {
  const colorClasses = {
    yellow: active
      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-300 border-yellow-400 dark:border-yellow-600 shadow-yellow-200 dark:shadow-yellow-900/20'
      : 'hover:bg-yellow-50 dark:hover:bg-yellow-900/10 hover:border-yellow-200 dark:hover:border-yellow-800',
    blue: active
      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 border-blue-400 dark:border-blue-600 shadow-blue-200 dark:shadow-blue-900/20'
      : 'hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-200 dark:hover:border-blue-800',
    green: active
      ? 'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-300 border-green-400 dark:border-green-600 shadow-green-200 dark:shadow-green-900/20'
      : 'hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-200 dark:hover:border-green-800',
  };

  const defaultActiveClass = active
    ? 'bg-gradient-to-r from-orange-100 via-pink-100 to-rose-100 dark:from-orange-900/30 dark:via-pink-900/30 dark:to-rose-900/30 text-orange-900 dark:text-orange-300 border-orange-400 dark:border-orange-600 shadow-orange-200 dark:shadow-orange-900/20'
    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600';

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all flex items-center gap-2.5 ${color ? colorClasses[color] : defaultActiveClass
        } ${!active && 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-900/50'
        } ${active && 'shadow-lg'
        }`}
    >
      {children}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${active
          ? 'bg-white/80 dark:bg-black/30'
          : 'bg-gray-200 dark:bg-gray-700'
          }`}
      >
        {count}
      </motion.span>
    </motion.button>
  );
}
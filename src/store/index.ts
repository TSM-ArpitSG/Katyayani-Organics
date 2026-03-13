/**
 * Redux Store Configuration
 * 
 * @author Arpit Singh
 * @description Configures and exports the Redux store with all slices.
 * Provides TypeScript types for type-safe state access and dispatch.
 * 
 * @module store
 */

/**
 * Redux Store Configuration
 * 
 * @author Arpit Singh
 * @description Configures the global Redux Toolkit store. Combines auth and tasks
 * slices into the root reducer and sets up the strict TypeScript types for
 * AppDispatch and RootState.
 */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';

/**
 * Redux store instance
 * 
 * @description
 * Configured with Redux Toolkit's configureStore.
 * Includes all application slices:
 * - auth: Authentication state management
 * - tasks: Task management state
 * 
 * Features automatic Redux DevTools integration and
 * immutability checks in development mode.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});

/**
 * Root state type
 * 
 * @typedef {ReturnType<typeof store.getState>} RootState
 * 
 * @description
 * Inferred TypeScript type representing the complete Redux state tree.
 * Use with useAppSelector for type-safe state access.
 * 
 * @example
 * const user = useAppSelector((state: RootState) => state.auth.user);
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * App dispatch type
 * 
 * @typedef {typeof store.dispatch} AppDispatch
 * 
 * @description
 * TypeScript type for the store's dispatch function.
 * Use with useAppDispatch for type-safe action dispatching.
 * Includes support for async thunks.
 * 
 * @example
 * const dispatch: AppDispatch = useAppDispatch();
 * dispatch(setCredentials({ user, token }));
 */
export type AppDispatch = typeof store.dispatch;
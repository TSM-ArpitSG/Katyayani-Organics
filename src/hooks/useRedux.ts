/**
 * Redux Typed Hooks
 * 
 * @author Arpit Singh
 * @description Type-safe Redux hooks for use throughout the application.
 * Pre-configured with app-specific types to eliminate repetitive type annotations.
 * 
 * @module useRedux
 * @example
 * import { useAppDispatch, useAppSelector } from './hooks/useRedux';
 * 
 * const dispatch = useAppDispatch();
 * const user = useAppSelector((state) => state.auth.user);
 */

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

/**
 * Typed version of useDispatch hook
 * 
 * @returns {AppDispatch} Dispatch function with proper typing for thunks and actions
 * 
 * @description
 * Use this instead of plain `useDispatch` to get proper TypeScript support
 * for dispatching actions and thunks. Automatically infers return types and
 * provides autocompletion for available actions.
 * 
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(login({ user, token }));
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Typed version of useSelector hook
 * 
 * @returns {TypedUseSelectorHook<RootState>} Selector function with proper state typing
 * 
 * @description
 * Use this instead of plain `useSelector` to get proper TypeScript support
 * for selecting state. Provides autocompletion for state properties and
 * ensures type safety when accessing nested state.
 * 
 * @example
 * const user = useAppSelector((state) => state.auth.user);
 * const tasks = useAppSelector((state) => state.tasks.tasks);
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
/**
 * @module hooks/useLogout
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { logout, useLogoutMutation } from '../redux/features/authSlice.js';

/**
 * Shared logout flow: calls `POST /auth/logout` (server clears the cookies
 * and nulls the stored refresh token), resets the local auth state when the
 * call fails, and navigates to `/login`.
 *
 * @returns {() => Promise<void>} The logout handler.
 */
export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation();
    } catch {
      dispatch(logout());
    }
    navigate('/login');
  }, [dispatch, logoutMutation, navigate]);

  return handleLogout;
}

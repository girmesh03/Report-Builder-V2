/**
 * @module redux/features/auth
 */

import { createSlice } from '@reduxjs/toolkit';

import { AUTH_STORAGE_KEY } from '../../utils/constants.js';
import { api } from './api.js';

/**
 * RTK Query auth endpoints (REQ-103): register, login, logout, refresh, and
 * getMe — all cookie-aware through `baseQueryWithReauth` with
 * `credentials: 'include'`. `refresh` powers the proactive session guard
 * (`components/routes/SessionRefresher`); `getMe` revalidates the session on
 * page load.
 */
export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (credentials) => ({ url: '/auth/register', method: 'POST', body: credentials }),
    }),
    login: build.mutation({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
    }),
    logout: build.mutation({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
    refresh: build.mutation({
      query: () => ({ url: '/auth/refresh', method: 'POST' }),
    }),
    getMe: build.query({
      query: () => ({ url: '/auth/me' }),
    }),
  }),
});

/**
 * Reads the persisted user from localStorage without throwing on corrupt
 * JSON (echo of `## Frontend Architecture` §5: `/auth/me` populates Redux +
 * localStorage on full page loads).
 *
 * @returns {object | null} The stored user or null.
 */
function readStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const storedUser = readStoredUser();

/** @type {import('@reduxjs/toolkit').Slice} */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser,
    isAuthenticated: Boolean(storedUser),
    initializing: true,
  },
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.initializing = false;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.initializing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        const user = action.payload.data.user;
        state.user = user;
        state.isAuthenticated = true;
        state.initializing = false;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const user = action.payload.data.user;
        state.user = user;
        state.isAuthenticated = true;
        state.initializing = false;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      })
      .addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
        const user = action.payload.data.user;
        state.user = user;
        state.isAuthenticated = true;
        state.initializing = false;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      })
      .addMatcher(authApi.endpoints.getMe.matchRejected, (state, action) => {
        // Only a definitive auth rejection (401/403) ends the session.
        // Network errors, CORS failures, and 5xx responses are transient —
        // wiping the user on them is what caused the "randomly logged out"
        // reports (review finding; `baseQueryWithReauth` also returns a
        // non-auth error for transient refresh failures).
        const status = action.payload?.status ?? action.meta?.response?.status;
        if (status === 401 || status === 403) {
          state.user = null;
          state.isAuthenticated = false;
          state.initializing = false;
          localStorage.removeItem(AUTH_STORAGE_KEY);
        } else {
          state.initializing = false;
        }
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.initializing = false;
        localStorage.removeItem(AUTH_STORAGE_KEY);
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export const { useGetMeQuery, useLoginMutation, useLogoutMutation, useRefreshMutation, useRegisterMutation } =
  authApi;
export default authSlice.reducer;

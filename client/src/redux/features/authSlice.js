/**
 * @module redux/features/auth
 */

import { createSlice } from '@reduxjs/toolkit';

import { AUTH_STORAGE_KEY } from '../../utils/constants.js';
import { api } from './api.js';

/**
 * RTK Query auth endpoints (REQ-103): register, login, logout, and getMe —
 * all cookie-aware through `baseQueryWithReauth` with `credentials: 'include'`.
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
      .addMatcher(authApi.endpoints.getMe.matchRejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.initializing = false;
        localStorage.removeItem(AUTH_STORAGE_KEY);
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
export const { useGetMeQuery, useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi;
export default authSlice.reducer;

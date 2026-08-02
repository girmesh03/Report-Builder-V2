/**
 * @module main
 */
/* eslint-disable react-refresh/only-export-components */

import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import App from './App.jsx';
import { store } from './redux/app/store.js';

const Landing = lazy(() => import('./pages/Landing.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Reports = lazy(() => import('./pages/Reports.jsx'));
const ReportDetails = lazy(() => import('./pages/ReportDetails.jsx'));
const Branches = lazy(() => import('./pages/Branches.jsx'));
const BranchDetails = lazy(() => import('./pages/BranchDetails.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Assistant = lazy(() => import('./pages/Assistant.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Landing },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'dashboard', Component: Dashboard },
      { path: 'reports', Component: Reports },
      { path: 'reports/:id/details', Component: ReportDetails },
      { path: 'branches', Component: Branches },
      { path: 'branches/:id/details', Component: BranchDetails },
      { path: 'profile', Component: Profile },
      { path: 'assistant', Component: Assistant },
      { path: '*', Component: NotFound },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </Provider>
  </StrictMode>
);

/**
 * @module components/layout/AppToastContainer
 */

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

/**
 * App-wide react-toastify toast container composed in `App.jsx`; success
 * and error toasts fire from the RTK Query `onQueryStarted` error pattern.
 *
 * @returns {JSX.Element} The toast container.
 */
function AppToastContainer() {
  return <ToastContainer />;
}

AppToastContainer.displayName = 'AppToastContainer';

export default AppToastContainer;

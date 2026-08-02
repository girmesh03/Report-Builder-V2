/**
 * @module components/layout/AppErrorBoundary
 */

import { Component } from 'react';

/**
 * Class-component error boundary catching React render errors and rendering
 * a fallback UI (react-error-boundary contract).
 *
 * @extends Component
 */
class AppErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please reload the page.</h1>;
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;

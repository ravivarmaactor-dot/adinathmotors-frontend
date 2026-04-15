import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let message = 'Something went wrong.';
      
      try {
        // Check if it's a Firestore JSON error
        const errObj = JSON.parse(this.state.error?.message || '');
        if (errObj.error && errObj.error.includes('Missing or insufficient permissions')) {
          message = 'You do not have permission to perform this action. Please check your login status or contact the administrator.';
        }
      } catch (e) {
        // Not a JSON error
        if (this.state.error?.message.includes('Missing or insufficient permissions')) {
          message = 'Permission denied. Please ensure you are authorized.';
        }
      }

      return (
        <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-4">Oops!</h2>
          <p className="text-red-700 mb-6">{message}</p>
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

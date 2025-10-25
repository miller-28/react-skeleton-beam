import React from "react";

export class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows fallback
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Optional: report to your logging/monitoring service
    if (this.props.onError) this.props.onError(error, info);
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary] Caught error:", error, info);
  }

  componentDidUpdate(prevProps) {
    // Reset if any resetKey changed
    const { resetKeys } = this.props;
    if (!this.state.hasError) return;

    if (
      resetKeys &&
      prevProps.resetKeys &&
      (resetKeys.length !== prevProps.resetKeys.length ||
        resetKeys.some((k, i) => !Object.is(k, prevProps.resetKeys[i])))
    ) {
      this.reset();
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) this.props.onReset();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const { fallback } = this.props;

    // Custom fallback as element
    if (React.isValidElement(fallback)) return fallback;

    // Custom fallback as render function
    if (typeof fallback === "function") {
      return fallback({ error: this.state.error, reset: this.reset });
    }

    // Default fallback UI
    return (
      <div style={{ padding: 24, maxWidth: 720 }}>
        <h1 style={{ marginBottom: 8 }}>Something went wrong</h1>
        <p style={{ marginTop: 0, opacity: 0.8 }}>
          An unexpected error occurred. You can try to recover.
        </p>
        <pre
          style={{
            background: "#2b2b2b",
            color: "#eee",
            padding: 12,
            borderRadius: 8,
            overflow: "auto",
            maxHeight: 240,
          }}
        >
          {String(this.state.error?.message ?? this.state.error)}
        </pre>
        <button onClick={this.reset} style={{ marginTop: 12 }}>
          Try again
        </button>
      </div>
    );
  }
}
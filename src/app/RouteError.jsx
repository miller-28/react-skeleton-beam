import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function RouteError() {
  
    const error = useRouteError();
  
    if (isRouteErrorResponse(error)) {
        return (
            <div style={{ padding: 24 }}>
                <h1>Oops: {error.status} {error.statusText}</h1>
                <pre>Something went wrong...</pre>
                <pre>{JSON.stringify(error)}</pre>
                <a href="/">Go home</a>
            </div>
        );
    }

    return (
        <div style={{ padding: 24 }}>
            <h1>Unexpected error</h1>
            <pre>{error?.message ?? String(error)}</pre>
            <a href="/">Go home</a>
        </div>
    );
}
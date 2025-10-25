import React from "react";
import "./styles/app.css";
import { createRoot } from "react-dom/client";
import { AppProviders } from "./app/providers.jsx";
import { ErrorBoundary } from "./app/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProviders />
    </ErrorBoundary>
  </React.StrictMode>
);
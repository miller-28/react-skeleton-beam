import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./../i18n/i18n.js";
import { router } from "./routes.jsx";
import { RouterProvider } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: { 
    queries: { 
      staleTime: 30_000, 
      retry: 1, 
      refetchOnWindowFocus: false 
    }
  }
});

export function AppProviders() {
  return ( 
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
);
}

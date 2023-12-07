import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Button, Spinner } from "@nextui-org/react";
import { queryClient } from "@/lib";
import { Provider } from "react-redux";
import { Store } from "@/store";

const ErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size={"lg"}/>
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV && <ReactQueryDevtools/>}
          <Provider store={Store}>
            <BrowserRouter>{children}</BrowserRouter>
          </Provider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

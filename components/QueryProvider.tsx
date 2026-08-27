"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cached data renders immediately on revisit; a stale query just
            // refetches silently in the background instead of showing a loader.
            staleTime: 60 * 1000,
            gcTime: ONE_DAY_MS,
            refetchOnWindowFocus: true,
            retry: 1,
          },
        },
      })
  );

  const [persister] = useState(() =>
    typeof window !== "undefined"
      ? createSyncStoragePersister({ storage: window.localStorage, key: "resto-query-cache" })
      : null
  );

  if (!persister) {
    // SSR pass: no `window`, so render without persistence — the client
    // remounts with the persister on hydration.
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: ONE_DAY_MS }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}

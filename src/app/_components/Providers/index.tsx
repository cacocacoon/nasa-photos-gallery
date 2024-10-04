"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "@/app/_components/GlobalStyle";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}

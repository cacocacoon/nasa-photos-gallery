import { useState } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled, { createGlobalStyle } from "styled-components";
import Navigation from "@/components/Navigation";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: rgb(33, 25, 34);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
    -webkit-font-smoothing: antialiased;

    * {
      box-sizing: border-box;
    }
  }
`;

const Layout = styled.div`
  padding: 16px;
`;

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Navigation />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

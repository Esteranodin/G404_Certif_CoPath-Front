"use client";

// import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "./AuthContext";
import { FavoritesProvider } from "./FavoritesContext";

export function Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));

  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
    // </ThemeProvider>
  );
}
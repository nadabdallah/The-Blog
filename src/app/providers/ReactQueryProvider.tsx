"use client";
import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ReactQueryProviderProps {
  children: ReactNode;
}

export default function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [Client] = useState(()=> new QueryClient());

  return (
    <QueryClientProvider client={Client}>
      {children}
    </QueryClientProvider>
  );
};
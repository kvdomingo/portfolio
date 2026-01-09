import { keepPreviousData, QueryClient } from "@tanstack/react-query";

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        placeholderData: keepPreviousData,
        retry: 3,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return {
    queryClient,
  };
}

import { AppState } from "react-native";
import {
  QueryClient,
  focusManager,
  DefaultOptions,
} from "@tanstack/react-query";

const createQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions,
  });

  return queryClient;
};

AppState.addEventListener("change", (nextAppState) => {
  focusManager.setFocused(nextAppState === "active");
});

// Required reading when choosing options: https://react-query.tanstack.com/guides/important-defaults

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 0, // 👉 Adjust according to your project
    refetchOnWindowFocus: true, // This works with the event listener above
    refetchOnReconnect: false, // This doesn't work by default with React Native
    refetchOnMount: true, // Data will get refetched (with previous data still available) on mount if it's stale
    retryOnMount: true, // Data will get refetched (with hard-loading state) on mount if it errored the last time
    retry: false, // Without this, queries that error would be retried 3 times automatically
  },
  mutations: {
    retry: false, // Without this, mutations that error would be retried 3 times automatically
  },
};

export const queryClient = createQueryClient();

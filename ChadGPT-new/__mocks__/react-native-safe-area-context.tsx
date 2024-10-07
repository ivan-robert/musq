import React from "react";

// eslint-disable-next-line
export const SafeAreaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
export const SafeAreaView = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export const useSafeAreaInsets = () => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

export default {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
};

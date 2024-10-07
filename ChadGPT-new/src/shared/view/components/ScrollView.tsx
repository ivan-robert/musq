import { forwardRef } from "react";
import { ScrollView as RNScrollView, ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ScrollView = forwardRef<RNScrollView, ScrollViewProps>(
  (props, ref) => {
    const { bottom } = useSafeAreaInsets();
    return (
      <RNScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: bottom + 16 }}
        {...props}
        ref={ref}
      />
    );
  }
);

import { forwardRef } from "react";
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const KeyboardAvoidingView = forwardRef<
  RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps
>((props, ref) => {
  const { top } = useSafeAreaInsets();
  return (
    <RNKeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"padding"}
      keyboardVerticalOffset={top}
      {...props}
      ref={ref}
    >
      <>{props.children}</>
    </RNKeyboardAvoidingView>
  );
});

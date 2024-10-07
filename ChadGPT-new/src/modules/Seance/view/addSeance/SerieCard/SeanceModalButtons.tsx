import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { Pressable, ViewStyle } from "react-native";

export const StopButton = ({
  onPress,
  label,
  isChronoRunning = false,
  isDisabled = false,
}: {
  onPress: () => void;
  isChronoRunning?: boolean;
  label?: string;
  isDisabled?: boolean;
}) => {
  const theme = useTheme();
  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => ({
        ...chronoButtonStyle,
        borderColor: isDisabled
          ? theme.colors.grey200
          : pressed
          ? theme.colors.CTA500
          : theme.colors.primary200,
      })}
    >
      {({ pressed }) => (
        <Typography.TextL.regular
          color={
            isDisabled
              ? theme.colors.grey200
              : pressed
              ? theme.colors.CTA500
              : theme.colors.black
          }
        >
          {label !== undefined ? label : isChronoRunning ? "Stop" : "Reprendre"}
        </Typography.TextL.regular>
      )}
    </Pressable>
  );
};

export const SaveButton = ({
  onPress,
  isDisabled,
  label = "Enregistrer",
}: {
  onPress: () => void;
  isDisabled: boolean;
  label?: string;
}) => {
  const theme = useTheme();
  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => ({
        ...chronoButtonStyle,
        backgroundColor: isDisabled
          ? theme.colors.grey200
          : pressed
          ? theme.colors.CTA500
          : theme.colors.primary200,
        borderColor: isDisabled
          ? theme.colors.white
          : pressed
          ? theme.colors.CTA500
          : theme.colors.primary200,
      })}
    >
      {({ pressed }) => (
        <Typography.TextL.regular
          color={pressed ? theme.colors.text500 : theme.colors.text500}
        >
          {label}
        </Typography.TextL.regular>
      )}
    </Pressable>
  );
};

const chronoButtonStyle: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  flexGrow: 1,
};

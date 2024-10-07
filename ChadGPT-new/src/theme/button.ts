import { TextStyle, ViewStyle } from "react-native";
import { hex2rgba } from "../shared/utils/hex2rgba";
import { Color } from "./colors.types";
import { Theme } from "@emotion/react";

export type ButtonState = "rest" | "error" | "pressed" | "disabled";

export type ButtonStyle = Record<
  ButtonState,
  {
    container: ViewStyle;
    text: TextStyle & { color: Color };
  }
>;

export const baseButtonStyle: ViewStyle = {
  borderRadius: 5,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  paddingHorizontal: 16,
  paddingVertical: 8,
  minHeight: 48,
};

const getPrimaryButtonStyle = (theme: Theme): ButtonStyle => ({
  rest: {
    container: {
      ...baseButtonStyle,
      backgroundColor: theme.colors.primary500,
      borderColor: theme.colors.CTA500,
    },
    text: { color: theme.colors.text500 },
  },
  pressed: {
    container: {
      ...baseButtonStyle,
      backgroundColor: theme.colors.primary200,
      borderColor: theme.colors.black,
      borderWidth: 0,
    },
    text: { color: theme.colors.text500 },
  },
  disabled: {
    container: {
      ...baseButtonStyle,
      backgroundColor: theme.colors.grey500,
      borderWidth: 0,
    },
    text: { color: theme.colors.grey300 },
  },
  error: {
    container: {
      ...baseButtonStyle,
      borderColor: theme.colors.statusError,
    },
    text: { color: theme.colors.statusError },
  },
});

const getSecondaryButtonStyle = (theme: Theme): ButtonStyle => ({
  rest: {
    container: {
      ...baseButtonStyle,
      backgroundColor: "transparent",
      borderColor: theme.colors.CTA500,
    },
    text: { color: theme.colors.CTA500 },
  },
  pressed: {
    container: {
      ...baseButtonStyle,
      backgroundColor: "transparent",
      borderColor: theme.colors.CTA300,
    },
    text: { color: theme.colors.CTA300 },
  },
  disabled: {
    container: {
      ...baseButtonStyle,
      borderColor: theme.colors.grey300,
    },
    text: { color: theme.colors.grey300 },
  },
  error: {
    container: {
      ...baseButtonStyle,
      borderColor: theme.colors.statusError,
    },
    text: { color: theme.colors.statusError },
  },
});

const getTertiaryButtonStyle = (theme: Theme): ButtonStyle => ({
  rest: {
    container: {
      ...baseButtonStyle,
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    text: {
      color: theme.colors.text500,
      textDecorationLine: "underline",
    },
  },
  pressed: {
    container: {
      ...baseButtonStyle,
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    text: {
      color: hex2rgba(theme.colors.text500, 0.5),
      textDecorationLine: "underline",
    },
  },
  disabled: {
    container: {
      ...baseButtonStyle,
      backgroundColor: theme.colors.grey200,
    },
    text: { color: theme.colors.grey300 },
  },
  error: {
    container: {
      ...baseButtonStyle,
      borderColor: theme.colors.statusError,
    },
    text: { color: theme.colors.statusError },
  },
});

export const button = {
  primary: getPrimaryButtonStyle,
  secondary: getSecondaryButtonStyle,
  tertiary: getTertiaryButtonStyle,
};

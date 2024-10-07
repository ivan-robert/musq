import { ViewStyle } from "react-native";
import { Color } from "./colors.types";
import {
  BorderState,
  TextInputState,
} from "../shared/view/components/TextInput";
import { Theme } from "@emotion/react";

type CommonColorStyle = {
  errorColor: Color;
  textColor: Color;
};

type ColorStyle = Record<TextInputState, ViewStyle & { color: Color }> &
  CommonColorStyle;

type BorderStyle = Record<BorderState, ViewStyle>;

type TextInputStyle = { contentColors: ColorStyle } & {
  borders: BorderStyle;
};

export const textInput = (theme: Theme): TextInputStyle => ({
  contentColors: {
    enabled: {
      color: theme.colors.text500,
      backgroundColor: theme.colors.white,
    },
    disabled: {
      color: theme.colors.grey200,
      backgroundColor: theme.colors.grey100,
    },
    errorColor: theme.colors.statusError,
    textColor: theme.colors.black,
  },
  borders: {
    focused: {
      borderColor: theme.colors.CTA300,
    },
    error: {
      borderColor: theme.colors.statusError,
    },
    default: {
      borderColor: theme.colors.grey100,
    },
  },
});

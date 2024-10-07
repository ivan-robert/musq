import { darkColors, lightColors } from "./colors";
import { textInput } from "./textInput";
import { fontKeys, typography } from "./typography";

const commonTheme = {
  textInput,
  typography,
  fonts: fontKeys,
};

export const darkTheme = {
  ...commonTheme,
  colors: darkColors,
  id: "dark",
};

export const lightTheme = {
  ...commonTheme,
  colors: lightColors,
  id: "light",
};

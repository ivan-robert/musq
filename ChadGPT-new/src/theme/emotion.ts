import { darkTheme } from "./theme";

export type ThemeInterface = typeof darkTheme;

declare module "@emotion/react" {
  export interface Theme extends ThemeInterface {}
}

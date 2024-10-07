import { LocalStorage } from "#shared/service/storage/Storage.service";
import { ThemeInterface } from "#theme/emotion";
import { darkTheme, lightTheme } from "#theme/theme";
import { PrimitiveAtom, atom } from "jotai";

type ThemeIdentifier = "dark" | "light";

export const colorThemeMap: Record<ThemeIdentifier, ThemeInterface> = {
  dark: darkTheme,
  light: lightTheme,
};

export const getTheme = (themeId: string) => {
  if (themeId in colorThemeMap)
    return colorThemeMap[themeId as ThemeIdentifier];
  return colorThemeMap["dark"];
};

export const getThemeKey = () => "COLOR_THEME";

export const themeAtom: PrimitiveAtom<string> = atom(
  LocalStorage.getStringItem(getThemeKey() as ThemeIdentifier) ?? "dark"
);

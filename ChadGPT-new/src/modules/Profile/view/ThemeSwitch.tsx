import { LocalStorage } from "#shared/service/storage/Storage.service";
import { getThemeKey, themeAtom } from "#shared/store/theme";
import { useTheme } from "@emotion/react";

import { Switch } from "@rneui/base";
import { useAtom } from "jotai";

export const ThemeSwitch: React.FC = () => {
  const [themeId, setTheme] = useAtom(themeAtom);
  const theme = useTheme();
  return (
    <Switch
      value={themeId === "dark"}
      onValueChange={() => {
        const newTheme = themeId === "light" ? "dark" : "light";
        setTheme(newTheme);
        LocalStorage.setStringItem(getThemeKey(), newTheme);
      }}
      color={theme.colors.CTA500}
    />
  );
};

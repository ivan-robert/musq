import { useTheme } from "@emotion/react";
import { button } from "../../../../theme/button";
import { BaseButton, BaseButtonProps } from "./BaseButton";

type ButtonProps = Omit<BaseButtonProps, "style">;

export const Button = {
  Primary: (props: ButtonProps) => {
    const theme = useTheme();
    return <BaseButton style={button.primary(theme)} {...props} />;
  },
  Secondary: (props: ButtonProps) => {
    const theme = useTheme();
    return <BaseButton style={button.secondary(theme)} {...props} />;
  },
  Tertiary: (props: ButtonProps) => {
    const theme = useTheme();
    return <BaseButton style={button.tertiary(theme)} {...props} />;
  },
};

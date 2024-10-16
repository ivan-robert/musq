import { useTheme } from "@emotion/react";
import { Path, Svg, SvgProps } from "react-native-svg";

export const GoBackArrow = (props: SvgProps) => {
  const theme = useTheme();
  return (
    <Svg
      width={props.width ?? 48}
      height={props.width ?? 48}
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        d="M50.2,169.6C97.9,56.3,228.5,3.1,341.8,50.9s166.4,178.3,118.7,291.6S282.2,508.9,168.9,461.1  C86.4,426.4,32.7,345.5,32.7,256C32.7,226.3,38.6,196.9,50.2,169.6z M254.7,448c106,0,192-86,192-192s-86-192-192-192  s-192,86-192,192S148.7,448,254.7,448z M226.7,140.7L111.4,256l115.3,115.3l21.2-21.2L168.7,271h208.2v-30H168.7l79.1-79.1  L226.7,140.7z"
        fill={props.color ?? theme.colors.text500}
      />
    </Svg>
  );
};

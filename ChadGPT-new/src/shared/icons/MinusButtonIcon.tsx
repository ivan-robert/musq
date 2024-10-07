import * as React from "react";
import Svg, { Rect, Circle, SvgProps } from "react-native-svg";
import { darkTheme } from "../../theme/theme";
export const MinusButtonIcon = (props: SvgProps) => (
  <Svg id="Layer_1" viewBox="0 0 32 32" {...props}>
    <Rect
      fill={props.color ?? darkTheme.colors.text500}
      x={10}
      y={15}
      width={12}
      height={2}
    />
    <Circle
      fill="none"
      stroke={props.color ?? "#000000"}
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={16}
      cy={16}
      r={12}
    />
  </Svg>
);

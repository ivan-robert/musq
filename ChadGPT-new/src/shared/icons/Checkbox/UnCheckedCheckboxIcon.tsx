import * as React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";

export const UncheckedCheckbox = (props: SvgProps) => (
  <Svg
    fill="none"
    width={props.width ?? undefined}
    height={props.height ?? undefined}
    viewBox="0 0 24 24"
    {...props}
  >
    <Rect
      x={3}
      y={3}
      width={18}
      height={18}
      rx={3}
      ry={3}
      stroke="#000000"
      strokeWidth={2}
    />
  </Svg>
);

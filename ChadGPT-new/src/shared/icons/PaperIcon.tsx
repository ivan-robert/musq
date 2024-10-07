import * as React from "react";
import { Path, Rect, Svg, SvgProps } from "react-native-svg";
const PaperIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 35 35" fill="none" {...props}>
    <Rect
      x="7.29169"
      y="5.83334"
      width="20.4167"
      height="24.7917"
      strokeWidth={2}
      rx="2"
      stroke={props.color ?? "white"}
    />
    <Path
      strokeWidth={2}
      d="M13.125 13.125H21.875"
      stroke={props.color ?? "white"}
      stroke-linecap="round"
    />
    <Path
      strokeWidth={2}
      d="M13.125 18.9583H21.875"
      stroke={props.color ?? "white"}
      stroke-linecap="round"
    />
    <Path
      strokeWidth={2}
      d="M13.125 24.7917H18.9583"
      stroke={props.color ?? "white"}
      stroke-linecap="round"
    />
  </Svg>
);
export default PaperIcon;

import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const LogoutIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 15 15" fill="none" {...props}>
    <Path
      d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5"
      stroke={props.color ?? "#000000"}
    />
  </Svg>
);

import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const ClockIcon = (props: SvgProps) => (
  <Svg
    fill={props.color ?? "#000000"}
    viewBox="0 0 24 24"
    id="Layer_1"
    data-name="Layer 1"
    {...props}
  >
    <Path d="M15.09814,12.63379,13,11.42285V7a1,1,0,0,0-2,0v5a.99985.99985,0,0,0,.5.86621l2.59814,1.5a1.00016,1.00016,0,1,0,1-1.73242ZM12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z" />
  </Svg>
);

import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CrossIcon = (props: SvgProps) => (
  <Svg
    fill={props.color ?? "#000000"}
    width={props.width ?? 24}
    height={props.width ?? 24}
    viewBox="0 0 24 24"
    id="cross"
    data-name="Flat Color"
    {...props}
  >
    <Path
      id="primary"
      d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
    />
  </Svg>
);
export default CrossIcon;

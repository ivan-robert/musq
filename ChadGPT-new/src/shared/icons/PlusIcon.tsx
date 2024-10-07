import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const PlusIcon = (props: SvgProps) => (
  <Svg fill={props.color ?? "#000000"} viewBox="0 0 24 24" {...props}>
    <Path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
  </Svg>
);


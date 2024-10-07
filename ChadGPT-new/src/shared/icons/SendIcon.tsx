import { Color } from "#theme/colors.types";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const SendIcon = (props: SvgProps & { outlineColor?: Color }) => (
  <Svg
    fill="#000000"
    viewBox="0 0 24 24"
    id="send"
    data-name="Flat Line"
    {...props}
  >
    <Path
      id="secondary"
      d="M5.44,4.15l14.65,7a1,1,0,0,1,0,1.8l-14.65,7A1,1,0,0,1,4.1,18.54l2.72-6.13a1.06,1.06,0,0,0,0-.82L4.1,5.46A1,1,0,0,1,5.44,4.15Z"
      fill={props.color ?? "rgb(44, 169, 188)"}
      strokeWidth={2}
    />
    <Path
      id="primary"
      d="M7,12h4M4.1,5.46l2.72,6.13a1.06,1.06,0,0,1,0,.82L4.1,18.54a1,1,0,0,0,1.34,1.31l14.65-7a1,1,0,0,0,0-1.8L5.44,4.15A1,1,0,0,0,4.1,5.46Z"
      fill="none"
      stroke={props.outlineColor ?? "rgb(0,0,0)"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

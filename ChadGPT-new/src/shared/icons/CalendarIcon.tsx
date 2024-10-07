import { Path, Rect, Svg, SvgProps } from "react-native-svg";

export const CalendarIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Rect
      x="3"
      y="6"
      width="18"
      height="15"
      rx="2"
      stroke={props.color ?? "#FF7C33"}
      strokeWidth="2"
    />
    <Path
      d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z"
      fill={props.color ?? "#FF7C33"}
    />
    <Path
      d="M7 3L7 6"
      stroke={props.color ?? "#FF7C33"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M17 3L17 6"
      stroke={props.color ?? "#FF7C33"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Rect
      x="7"
      y="12"
      width="4"
      height="2"
      rx="0.5"
      fill={props.color ?? "#FF7C33"}
    />
    <Rect
      x="7"
      y="16"
      width="4"
      height="2"
      rx="0.5"
      fill={props.color ?? "#FF7C33"}
    />
    <Rect
      x="13"
      y="12"
      width="4"
      height="2"
      rx="0.5"
      fill={props.color ?? "#FF7C33"}
    />
    <Rect
      x="13"
      y="16"
      width="4"
      height="2"
      rx="0.5"
      fill={props.color ?? "#FF7C33"}
    />
  </Svg>
);

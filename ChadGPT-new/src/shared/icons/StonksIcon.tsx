import { Path, Rect, Svg, SvgProps } from "react-native-svg";

export const StonksIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 35 35" fill="none" {...props}>
    <Rect
      x="8.75"
      y="18.9583"
      width="5.83333"
      height="5.83333"
      rx="2.91667"
      transform="rotate(90 8.75 18.9583)"
      stroke={props.color ?? "white"}
      strokeWidth={1.5}
    />
    <Rect
      x="24.7916"
      y="17.5"
      width="5.83333"
      height="5.83333"
      rx="2.91667"
      transform="rotate(-90 24.7916 17.5)"
      stroke={props.color ?? "white"}
      strokeWidth={1.5}
    />
    <Path
      d="M26.25 16.0417L23.2451 19.0466C21.9117 20.3799 21.2451 21.0466 20.4166 21.0466C19.5882 21.0466 18.9215 20.3799 17.5882 19.0466L15.9534 17.4118C14.6201 16.0784 13.9534 15.4118 13.125 15.4118C12.2965 15.4118 11.6299 16.0784 10.2965 17.4118L7.29163 20.4167"
      stroke={props.color ?? "white"}
      strokeWidth={1.5}
    />
  </Svg>
);

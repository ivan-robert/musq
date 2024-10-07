import { Circle, Path, Svg, SvgProps } from "react-native-svg";

export const SearchIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 20 20" fill="none" {...props}>
    <Circle cx="7.49996" cy="10" r="5.83333" stroke="white" stroke-width="2" />
    <Path
      d="M7.5 7.5C7.1717 7.5 6.84661 7.56466 6.54329 7.6903C6.23998 7.81594 5.96438 8.00009 5.73223 8.23223C5.50009 8.46438 5.31594 8.73998 5.1903 9.04329C5.06466 9.34661 5 9.6717 5 10"
      stroke={props.color ?? "white"}
      stroke-width="2"
      stroke-linecap="round"
    />
    <Path
      d="M15 17.5L12.5 15"
      stroke={props.color ?? "white"}
      stroke-width="2"
      stroke-linecap="round"
    />
  </Svg>
);

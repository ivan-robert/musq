import { Circle, Path, Svg, SvgProps } from "react-native-svg";

export const UserIcon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 30 30" {...props}>
      <Path
        d="M24.6593 25.5589C24.0895 23.9641 22.8341 22.5549 21.0876 21.5499C19.3412 20.5448 17.2013 20 15 20C12.7987 20 10.6588 20.5448 8.91239 21.5498C7.16594 22.5549 5.91049 23.9641 5.34074 25.5589"
        stroke={props.color ?? "black"}
        fill={"none"}
        strokeWidth="2"
        stroke-linecap="round"
      />
      <Circle
        cx="15"
        cy="10"
        r="5"
        stroke={props.color ?? "black"}
        fill={"none"}
        strokeWidth="2"
        stroke-linecap="round"
      />
    </Svg>
  );
};

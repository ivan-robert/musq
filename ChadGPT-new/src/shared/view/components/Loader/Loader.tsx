import { SvgProps } from "react-native-svg";
import { Color } from "../../../../theme/colors.types";
import { DumbbellIcon } from "../../../icons/DumbbellIcon";
import { Typography } from "../Typography/Typography";
import { useLoader } from "./useLoader";
import Animated from "react-native-reanimated";

type LoaderProps = {
  withText?: boolean;
  color?: Color;
} & SvgProps;

export const Loader = ({
  withText = false,
  color,
  ...svgProps
}: LoaderProps) => {
  const { animatedRotation } = useLoader();
  return (
    <>
      <Animated.View
        style={{
          justifyContent: "center",
          alignItems: "center",
          ...animatedRotation,
        }}
      >
        <DumbbellIcon color={color} {...svgProps} />
      </Animated.View>
      {withText && (
        <Typography.TextM.regular>Loading...</Typography.TextM.regular>
      )}
    </>
  );
};

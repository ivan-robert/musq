import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { Pressable, View, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

type ProfileButtonProps = {
  onPress: () => void;
  title: string;
  isDisabled?: boolean;
  leftIcon?: (props: SvgProps) => JSX.Element;
  contentColor?: string;
};

export const ProfileButton = (props: ProfileButtonProps) => {
  const theme = useTheme();
  return (
    <Pressable
      style={({ pressed }) => ({
        ...ProfileButtonContainerStyle,
        backgroundColor: pressed
          ? theme.colors.primary500
          : theme.colors.primary300,
      })}
      onPress={props.onPress}
      disabled={props.isDisabled}
    >
      {props.leftIcon ? (
        props.leftIcon({
          color: props.contentColor ?? theme.colors.text300,
          height: 24,
          width: 24,
        })
      ) : (
        <View style={{ width: 24, height: 24 }} />
      )}
      <Typography.TextM.regular
        color={props.contentColor ?? theme.colors.text500}
      >
        {props.title}
      </Typography.TextM.regular>
    </Pressable>
  );
};

const ProfileButtonContainerStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderBottomWidth: 1,
};

import { Pressable } from "react-native";
import { Typography } from "../Typography/Typography";
import { Loader } from "../Loader/Loader";
import { ButtonState, ButtonStyle } from "../../../../theme/button";
import { Color } from "../../../../theme/colors.types";
import styled from "@emotion/native";

export type BaseButtonProps = {
  style: ButtonStyle;
  text: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  leftIcon?: React.FunctionComponent<{ color: string }>;
  rightIcon?: React.FunctionComponent<{ color: string }>;
  onPress: () => void;
};

export const BaseButton = ({
  style,
  text,
  isDisabled,
  isLoading,
  isError,
  leftIcon,
  rightIcon,
  onPress,
}: BaseButtonProps) => {
  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) =>
        style[getButtonState({ isDisabled, isPressed: pressed, isError })]
          .container
      }
    >
      {({ pressed }) => (
        <BaseButtonContent
          text={text}
          isLoading={isLoading}
          textStyle={
            style[getButtonState({ isDisabled, isPressed: pressed, isError })]
              .text
          }
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        />
      )}
    </Pressable>
  );
};

type BaseButtonContentProps = {
  isLoading?: boolean;
  text: string;
  textStyle: { color: Color };
  leftIcon?: React.FunctionComponent<{ color: string }>;
  rightIcon?: React.FunctionComponent<{ color: string }>;
};

const BaseButtonContent = ({
  isLoading,
  text,
  textStyle,
  leftIcon,
  rightIcon,
}: BaseButtonContentProps) => {
  return isLoading ? (
    <Loader color={textStyle.color} />
  ) : (
    <ButtonRow>
      {leftIcon && (
        <IconContainer>{leftIcon({ color: textStyle.color })}</IconContainer>
      )}
      <TextContainer>
        <Typography.TextL.regular style={textStyle} color={textStyle.color}>
          {text}
        </Typography.TextL.regular>
      </TextContainer>
      {rightIcon && (
        <IconContainer>{rightIcon({ color: textStyle.color })}</IconContainer>
      )}
    </ButtonRow>
  );
};

const getButtonState = ({
  isDisabled,
  isError,
  isPressed,
}: {
  isDisabled?: boolean;
  isPressed: boolean;
  isError?: boolean;
}): ButtonState => {
  if (isDisabled) {
    return "disabled";
  }
  if (isError) {
    return "error";
  }
  if (isPressed) {
    return "pressed";
  }
  return "rest";
};

const ButtonRow = styled.View({
  flexDirection: "row",
  flex: 1,
  gap: 16,
  alignItems: "center",
  justifyContent: "space-between",
});

const IconContainer = styled.View({
  height: "100%",
  aspectRatio: 1,
});

const TextContainer = styled.View({});

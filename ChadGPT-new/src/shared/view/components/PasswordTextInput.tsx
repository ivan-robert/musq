import { useTheme } from "@emotion/react";
import { forwardRef, useState } from "react";
import { Platform, TextInput as RNTextInput, View } from "react-native";
import { textInput } from "../../../theme/textInput";
import { Typography } from "./Typography/Typography";
import { Spacer } from "./Spacer";
import styled from "@emotion/native";
import { EyeIcon } from "../../icons/EyeIcon";
import { CrossedEyeIcon } from "../../icons/CrossedEyeIcon";
import { BorderState, TextInputProps, TextInputState } from "./TextInput";

export const PasswordTextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      isDisabled = false,
      isReadOnly = false,
      errorLabel,
      leftIcon,
      ...textInputProps
    }: TextInputProps,
    ref
  ) => {
    const theme = useTheme();

    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);
    const textInputState: TextInputState = isDisabled ? "disabled" : "enabled";
    const inputAccessibilityProps = Platform.select({
      android: {
        accessibilityLabelledBy: label
          ? getNativeIdFromLabel(label)
          : undefined,
      },
      ios: { accessibilityLabel: label },
    });

    const isError = errorLabel !== undefined;

    return (
      <View>
        {!!label && (
          <View>
            <Typography.TextM.regular
              color={textInput(theme).contentColors[textInputState].color}
              nativeID={getNativeIdFromLabel(label)}
              accessible={false}
            >
              {label}
            </Typography.TextM.regular>
            <Spacer.Vertical gap={4} />
          </View>
        )}
        <InputContainer
          isDisabled={isDisabled}
          isError={isError}
          isFocused={isFocused}
        >
          {leftIcon && <IconBox>{leftIcon}</IconBox>}
          <InputBox
            ref={ref}
            editable={!isDisabled && !isReadOnly}
            secureTextEntry={!showPassword}
            autoComplete="current-password"
            onFocus={onFocus}
            onBlur={onBlur}
            placeholderTextColor={theme.colors.grey200}
            {...inputAccessibilityProps}
            {...textInputProps}
          />

          <ToucheableIconBox onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <CrossedEyeIcon /> : <EyeIcon />}
          </ToucheableIconBox>
        </InputContainer>
        {!!errorLabel && (
          <Typography.TextS.regular
            color={theme.textInput(theme).contentColors.errorColor}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
            accessibilityLabelledBy={
              label ? getNativeIdFromLabel(label) : undefined
            }
          >
            {errorLabel}
          </Typography.TextS.regular>
        )}
      </View>
    );
  }
);

PasswordTextInput.displayName = "TextInput";

const getNativeIdFromLabel = (label: string) => label.replace(/ /g, "-");

const InputBox = styled.TextInput(({ theme }) => ({
  flex: 1,
  color: theme.textInput(theme).contentColors.textColor,
  fontSize: 18,
  paddingVertical: 8,
  paddingHorizontal: 8,
}));

const ToucheableIconBox = styled.TouchableOpacity({
  justifyContent: "center",
  gap: 8,
  width: 30,
  height: 30,
});

const IconBox = styled.View({
  justifyContent: "center",
  gap: 8,
  width: 30,
  height: 30,
});

export const InputContainer = styled.View<{
  isDisabled: boolean;
  isError: boolean;
  isFocused: boolean;
}>(({ theme, isDisabled, isFocused, isError }) => {
  const borderState: BorderState = isError
    ? "error"
    : isFocused
    ? "focused"
    : "default";
  const backgroundState: TextInputState = isDisabled ? "disabled" : "enabled";

  return {
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:
      textInput(theme).contentColors[backgroundState].backgroundColor,
    paddingHorizontal: 8,
    ...textInput(theme).borders[borderState],
  };
});

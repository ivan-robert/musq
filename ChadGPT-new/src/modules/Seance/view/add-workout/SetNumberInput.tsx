import { hex2rgba } from "#shared/utils/hex2rgba";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

type ModalNumberInputProps = TextInputProps & {
  isFocused: boolean;
  isValidated?: boolean;
};

export const SetNumberInput = forwardRef<TextInput, ModalNumberInputProps>(
  ({ isFocused, isValidated, ...textInputProps }, ref) => {
    const theme = useTheme();

    return (
      <InputContainer
        isFocused={isFocused}
        isDisabled={!textInputProps.editable}
        isValidated={isValidated}
      >
        <TextInput
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
          editable={textInputProps.editable}
          keyboardType="numeric"
          placeholderTextColor={hex2rgba(theme.colors.text200, 0.4)}
          ref={ref}
          maxLength={6}
          {...textInputProps}
          style={{
            fontFamily: theme.fonts["Montserrat-Bold"],
            fontSize: 24,
            padding: 8,
            color: theme.colors.text500,
          }}
        />
      </InputContainer>
    );
  }
);

const InputContainer = styled.View<{
  isFocused: boolean;
  isDisabled: boolean;
  isValidated?: boolean;
}>(({ theme, isFocused, isDisabled, isValidated }) => ({
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  minWidth: 70,
  borderWidth: 1,
  borderColor: isDisabled
    ? theme.colors.grey200
    : isValidated
    ? theme.colors.statusSuccess
    : isFocused
    ? theme.colors.CTA500
    : theme.colors.CTA300,
}));

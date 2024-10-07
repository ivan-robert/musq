import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

type ModalNumberInputProps = TextInputProps & { isFocused: boolean };

export const ModalNumberInput = forwardRef<TextInput, ModalNumberInputProps>(
  ({ isFocused, ...textInputProps }, ref) => {
    const theme = useTheme();
    return (
      <InputContainer isFocused={isFocused}>
        <TextInput
          ref={ref}
          maxLength={6}
          {...textInputProps}
          style={{
            fontFamily: theme.fonts["Montserrat-Bold"],
            fontSize: 24,
            padding: 8,
          }}
        />
      </InputContainer>
    );
  }
);

const InputContainer = styled.View<{ isFocused: boolean }>(
  ({ theme, isFocused }) => ({
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    minWidth: 70,
    borderWidth: 1,
    borderColor: isFocused ? theme.colors.CTA500 : theme.colors.grey200,
  })
);

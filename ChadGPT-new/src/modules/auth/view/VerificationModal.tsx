import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import { Modal, Platform, Text } from "react-native";
import { useTimer } from "react-timer-hook";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useEffect, useState } from "react";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";

const CELL_COUNT = 6;

type Props = {
  expiryTimestamp: Date;
  email: string;
  signUp: ReturnType<typeof useSignUp>["signUp"];
};
export const VerificationModal: React.FC<Props> = ({
  expiryTimestamp,
  email,
  signUp,
}) => {
  const theme = useTheme();
  const { totalSeconds, restart } = useTimer({
    expiryTimestamp: expiryTimestamp,
    autoStart: true,
  });
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [clerkErrors, setClerkErrors] = useState<string[]>([]);
  const { isLoaded, setActive } = useSignUp();
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  useEffect(() => {
    setVisible(true);
    restart(expiryTimestamp, true);
    return () => setVisible(false);
  }, [expiryTimestamp, restart]);

  const onPressVerify = async (value: string) => {
    if (!signUp || !isLoaded) {
      return;
    }
    setClerkErrors([]);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: value,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
      }
    } catch (err: unknown) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling

      if (isClerkAPIResponseError(err)) {
        setClerkErrors(err.errors.map((e) => e.longMessage ?? e.message));
      }
    }
  };
  const handleValueChange = (value: string) => {
    setValue(value);
    if (value.length === CELL_COUNT) {
      onPressVerify(value);
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible && totalSeconds > 0}
    >
      <CenterView>
        <Typography.TextL.regular>
          {`Verification email sent to ${email}`}
        </Typography.TextL.regular>
        <Spacer.Vertical gap={8} />

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={handleValueChange}
          cellCount={CELL_COUNT}
          rootStyle={{ marginTop: 20 }}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.OS === "android" ? "sms-otp" : "one-time-code"}
          testID="my-code-input"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[
                {
                  width: 40,
                  height: 40,
                  lineHeight: 38,
                  fontSize: 24,
                  borderWidth: 2,
                  borderColor: "#00000030",
                  textAlign: "center",
                },
                isFocused && {
                  borderColor: "#000",
                },
              ]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <Typography.TextM.regular>
          {`Retry in ${totalSeconds} seconds`}
        </Typography.TextM.regular>
        <Spacer.Vertical gap={26} />
        {clerkErrors.map((error, index) => (
          <Typography.TextM.regular
            key={index}
            color={theme.colors.statusError}
          >
            {error}
          </Typography.TextM.regular>
        ))}
      </CenterView>
    </Modal>
  );
};

const CenterView = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.colors.white,
}));

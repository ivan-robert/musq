import styled from "@emotion/native";

import { useTheme } from "@emotion/react";
import { useCallback, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Typography } from "#shared/view/components/Typography/Typography";
import { Button } from "#shared/view/components/Button/Button";
import { useTranslation } from "react-i18next";

const formatInputTo4Digits = (text: string) => {
  return text.padStart(4, "0");
};

const convertToSeconds = (fourCharTime: string) => {
  return (
    parseInt(fourCharTime.slice(0, 2)) * 60 + parseInt(fourCharTime.slice(2, 4))
  );
};

const checkIdValidTime = (fourCharTime: string) => {
  //Checks that seconds are not above 60
  return (
    fourCharTime.length === 4 &&
    !isNaN(parseInt(fourCharTime)) &&
    parseInt(fourCharTime[2]) < 6
  );
};

type TypeSelectionProps = {
  onSavePress: (timeInSeconds: number) => void;
};

export const TimeSelection = ({ onSavePress }: TypeSelectionProps) => {
  const { t } = useTranslation("workouts");
  const theme = useTheme();

  const timeInputRef = useRef<TextInput>();

  const [selectedTime, setSelectedTime] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleNumberChange = useCallback(
    (newLetter: string, oldTime: string) => {
      if (newLetter === "") {
        setSelectedTime(oldTime.slice(0, -1));
      }
      if (!isNaN(parseInt(newLetter))) {
        if (oldTime.length < 4) {
          setSelectedTime(oldTime + newLetter);
        }
      }
    },
    []
  );

  return (
    <>
      <InvisibleInput
        value="0"
        onChangeText={(text) => {
          //wierd hack to access the pressed key
          const newLetter = text[1] ?? "";
          handleNumberChange(newLetter, selectedTime);
        }}
        ref={(node) => {
          if (node) {
            timeInputRef.current = node;
            if (isFocused) {
              node.focus();
              return;
            }
            node.blur();
          }
        }}
        keyboardType="numeric"
        onSubmitEditing={() => {
          setIsFocused(false);
        }}
      />
      <Typography.TextM.regular
        color={theme.colors.black}
        style={{ flexShrink: 1 }}
      >
        {t("set.enterTime")}
      </Typography.TextM.regular>

      <TouchableOpacity
        onPress={() => {
          setIsFocused(!isFocused);
        }}
      >
        <RowContainer>
          <NumberInputContainer
            label={formatInputTo4Digits(selectedTime).slice(0, 2)}
            isFocused={isFocused}
          />

          <Typography.TitleL.bold color={theme.colors.black}>
            :
          </Typography.TitleL.bold>
          <NumberInputContainer
            label={formatInputTo4Digits(selectedTime).slice(2, 4)}
            isFocused={isFocused}
          />
        </RowContainer>
      </TouchableOpacity>

      <Button.Primary
        text="Enregistrer"
        onPress={() => {
          onSavePress(convertToSeconds(formatInputTo4Digits(selectedTime)));
        }}
        isDisabled={!checkIdValidTime(formatInputTo4Digits(selectedTime))}
      />
    </>
  );
};

type NumberInputContainerProps = {
  label: string;
  isFocused?: boolean;
};

const NumberInputContainer = ({
  isFocused,
  label,
}: NumberInputContainerProps) => {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        padding: 8,
        minWidth: 70,
        borderWidth: 1,
        borderColor: isFocused ? theme.colors.CTA500 : theme.colors.grey200,
      }}
    >
      <Typography.TitleL.bold color={theme.colors.black}>
        {label}
      </Typography.TitleL.bold>
    </View>
  );
};

const RowContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  paddingVertical: 32,
});

const InvisibleInput = styled.TextInput({
  opacity: 0,
  position: "absolute",
  top: 0,
  left: 0,
});

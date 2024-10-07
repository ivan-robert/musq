import { useState } from "react";

import { useTheme } from "@emotion/react";
import { View, ViewStyle } from "react-native";
import { DisplayDropdownPressable } from "#shared/view/components/SingleDropDownPicker";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";

import DateTimePicker from "react-native-modal-datetime-picker";
import { SmallShowArrowIcon } from "#shared/icons/SmallShowArrowIcon";
import { ClockIcon } from "#shared/icons/ClockIcon";
import { CalendarIcon } from "#shared/icons/CalendarIcon";
import { DateTime } from "luxon";

type FakeDropDownProps<T> = {
  value: T;
  label: (value: T) => string;
  onPress: () => void;
  style?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const FakeDropDown = <T,>({
  value,
  label,
  style,
  leftIcon,
  rightIcon,
  onPress,
}: FakeDropDownProps<T>) => {
  const theme = useTheme();
  return (
    <>
      <View>
        <DisplayDropdownPressable onPress={onPress ?? (() => {})} style={style}>
          {leftIcon}
          <Typography.TextM.regular
            color={theme.colors.text500}
            numberOfLines={1}
          >
            {label(value)}
          </Typography.TextM.regular>
          <Spacer.Horizontal gap={8} />
          {rightIcon && <Spacer.Flex />}
          {rightIcon}
        </DisplayDropdownPressable>
      </View>
    </>
  );
};

type FakeDateDropDownProps = {
  value: Date;
  setValue: (date: Date) => void;
  style?: ViewStyle;
};

export const FakeDateDropDown = ({
  setValue,
  value,
  style,
}: FakeDateDropDownProps) => {
  const theme = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      <FakeDropDown
        value={value}
        label={(date) => date.toLocaleDateString()}
        onPress={() => setShowDatePicker(true)}
        style={{ gap: 8, ...style }}
        leftIcon={
          <CalendarIcon width={24} height={24} color={theme.colors.CTA300} />
        }
        rightIcon={
          <SmallShowArrowIcon
            color={theme.colors.text500}
            width={10}
            height={10}
          />
        }
      />
      <DateTimePicker
        backdropStyleIOS={{ backgroundColor: theme.colors.black }}
        mode={"date"}
        isVisible={showDatePicker}
        onCancel={() => {
          setShowDatePicker(false);
        }}
        onConfirm={(selected) => {
          setValue(selected);
          setShowDatePicker(false);
        }}
      />
    </>
  );
};

type FakeTimeDropDownProps = {
  value: string;
  setValue: (date: string) => void;
  style?: ViewStyle;
  minimumDate?: string;
  maximumDate?: string;
};

export const FakeTimeDropDown = ({
  setValue,
  value,
  style,
  minimumDate,
  maximumDate,
}: FakeTimeDropDownProps) => {
  const theme = useTheme();
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <>
      <FakeDropDown
        onPress={() => setShowTimePicker(true)}
        value={value}
        label={(date) =>
          DateTime.fromISO(date).toLocaleString(DateTime.TIME_SIMPLE)
        }
        style={{ justifyContent: "center", gap: 8, ...style }}
        leftIcon={
          <ClockIcon width={24} height={24} color={theme.colors.CTA300} />
        }
      />
      <DateTimePicker
        date={new Date(value)}
        maximumDate={maximumDate ? new Date(maximumDate) : undefined}
        minimumDate={minimumDate ? new Date(minimumDate) : undefined}
        backdropStyleIOS={{ backgroundColor: theme.colors.black }}
        mode={"time"}
        isVisible={showTimePicker}
        onCancel={() => {
          setShowTimePicker(false);
        }}
        onConfirm={(selected) => {
          setValue(selected.toISOString());
          setShowTimePicker(false);
        }}
      />
    </>
  );
};

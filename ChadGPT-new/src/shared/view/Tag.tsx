import CrossIcon from "#shared/icons/CrossIcon";
import { hex2rgba } from "#shared/utils/hex2rgba";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import { Color } from "#theme/colors.types";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { TouchableHighlight, ViewStyle } from "react-native";

type TagProps = {
  label: string;
  onPress: () => void;
};

type DeletableTagProps = TagProps & {
  onCrossPress?: () => void;
  containerStyle?: ViewStyle;
  textColor?: Color;
};

export const DeletableTag = ({
  label,
  onPress,
  onCrossPress,
  containerStyle,
  textColor,
}: DeletableTagProps) => {
  const theme = useTheme();
  return (
    <DeletableTagContainer onPress={onPress} style={containerStyle}>
      <Typography.TextS.regular color={textColor ?? theme.colors.text500}>
        {label}
      </Typography.TextS.regular>
      <Spacer.Horizontal gap={8} />
      {onCrossPress && (
        <TouchableHighlight onPress={onCrossPress}>
          <CrossIcon height={16} width={16} color={theme.colors.text500} />
        </TouchableHighlight>
      )}
    </DeletableTagContainer>
  );
};

type SelectableTagProps = TagProps & {
  isSelected: boolean;
  containerStyle?: { selected: ViewStyle; unselected: ViewStyle };
  textColor?: { selected: Color; unselected: Color };
};

export const SelectableTag = (props: SelectableTagProps) => {
  const theme = useTheme();
  return (
    <SelectableTagContainer
      isToggled={props.isSelected}
      onPress={props.onPress}
      style={
        props.containerStyle &&
        props.containerStyle[props.isSelected ? "selected" : "unselected"]
      }
    >
      <Typography.TextS.regular
        color={
          props.textColor
            ? props.textColor[props.isSelected ? "selected" : "unselected"]
            : props.isSelected
            ? theme.colors.CTA500
            : theme.colors.text200
        }
      >
        {props.label}
      </Typography.TextS.regular>
    </SelectableTagContainer>
  );
};

export const tagContainerStyle: ViewStyle = {
  borderWidth: 1,
  borderRadius: 32,
  paddingHorizontal: 8,
  paddingVertical: 4,
  flexDirection: "row",
  alignItems: "center",
};

const SelectableTagContainer = styled.Pressable<{ isToggled: boolean }>(
  ({ theme, isToggled }) => ({
    ...tagContainerStyle,
    backgroundColor: isToggled
      ? hex2rgba(theme.colors.CTA300, 0.1)
      : theme.colors.neutral,
    borderColor: isToggled ? theme.colors.CTA500 : theme.colors.grey300,
  })
);

const DeletableTagContainer = styled.Pressable(({ theme }) => ({
  ...tagContainerStyle,
  backgroundColor: theme.colors.primary200,
  borderColor: theme.colors.primary200,
}));

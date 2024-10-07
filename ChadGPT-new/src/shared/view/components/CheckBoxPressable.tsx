import { CheckedCheckbox } from "#shared/icons/Checkbox/CheckedCheckboxIcon";
import { UncheckedCheckbox } from "#shared/icons/Checkbox/UnCheckedCheckboxIcon";
import { Color } from "#theme/colors.types";
import { useTheme } from "@emotion/react";
import { Pressable } from "react-native";

type CheckboxPressableProps = {
  size: number;
  onPress: () => void;
  isChecked: boolean;
  color?: Color;
};

export const CheckboxPressable = ({
  size,
  onPress,
  isChecked,
  color,
}: CheckboxPressableProps) => {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress}>
      {isChecked ? (
        <CheckedCheckbox
          height={size}
          width={size}
          color={color ?? theme.colors.black}
        />
      ) : (
        <UncheckedCheckbox
          height={size}
          width={size}
          color={color ?? theme.colors.black}
        />
      )}
    </Pressable>
  );
};

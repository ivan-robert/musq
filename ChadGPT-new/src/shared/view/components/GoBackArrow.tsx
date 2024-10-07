import { useTheme } from "@emotion/react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { Pressable } from "react-native";

export const GoBackArrow = () => {
  const { goBack } = useNavigation();
  const theme = useTheme();
  return (
    <Pressable onPress={goBack}>
      <Icon name="arrow-back" size={32} color={theme.colors.text500} />
    </Pressable>
  );
};

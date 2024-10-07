import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { Pressable } from "react-native";

type PressableMuscleProps = {
  name: string;
  onPress: () => void;
};

export const PressableMuscle = ({ name, onPress }: PressableMuscleProps) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        paddingVertical: 8,
        backgroundColor: pressed
          ? theme.colors.CTA500
          : theme.colors.primary200,
      })}
    >
      <Typography.TextS.regular color={theme.colors.text500}>
        {name}
      </Typography.TextS.regular>
    </Pressable>
  );
};

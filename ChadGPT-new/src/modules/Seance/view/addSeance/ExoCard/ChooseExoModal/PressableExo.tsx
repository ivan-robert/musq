import { Exo } from "#shared/exo/domain/exo.types";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { memo } from "react";
import { Image, Pressable } from "react-native";

const DEFAULT_URL =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.fr%2Fpin%2F305822630948770612%2F&psig=AOvVaw0r8cz8o7PyeFUa55MQYC-x&ust=1710093444544000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOj8i9Tg54QDFQAAAAAdAAAAABAK";

type PressableExoProps = {
  exo: Exo;
  onPress: () => void;
};

const PressableExoComponent = ({ exo, onPress }: PressableExoProps) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: "center",
        borderRadius: 4,
        paddingVertical: 8,
        borderColor: pressed ? theme.colors.CTA500 : theme.colors.primary200,
        borderWidth: 1,
        flexDirection: "row",
      })}
    >
      <Image
        source={{ uri: exo.imageURL ?? DEFAULT_URL }}
        height={100}
        width={100}
      />
      <Spacer.Horizontal gap={16} />
      <Typography.TextS.regular
        color={theme.colors.black}
        style={{ flexShrink: 1 }}
      >
        {exo.exoName}
      </Typography.TextS.regular>
    </Pressable>
  );
};

export const PressableExo = memo(PressableExoComponent);

import { Exo, ExoType } from "#shared/exo/domain/exo.types";
import { ArrowIcon } from "#shared/icons/ArrowIcon";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { Image, ImageSourcePropType } from "react-native";

type Props = {
  exo: Exo;
  onPress: () => void;
};

const exoIconMap: Record<ExoType, ImageSourcePropType> = {
  poids: require("#assets/in-app-icons/dumbbels.png"),
  reps: require("#assets/in-app-icons/scale.png"),
  temps: require("#assets/in-app-icons/watch.png"),
};

export const PopularExoCard: React.FC<Props> = ({ exo, onPress }) => {
  return (
    <Container onPress={onPress}>
      <ExoContainer>
        <Image source={exoIconMap[exo.exoType]} />
        <Spacer.Horizontal gap={8} />
        <Typography.TextM.bold style={{ flexShrink: 1 }} numberOfLines={1}>
          {exo.exoName}
        </Typography.TextM.bold>
        <Spacer.Flex />
        <ArrowIcon height={16} width={16} />
      </ExoContainer>
    </Container>
  );
};

const Container = styled.Pressable(({ theme }) => ({
  backgroundColor: theme.colors.white,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: theme.colors.text500,
}));

const ExoContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 8,
  paddingHorizontal: 16,
});

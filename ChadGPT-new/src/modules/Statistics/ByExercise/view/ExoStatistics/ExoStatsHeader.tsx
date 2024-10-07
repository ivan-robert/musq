import { ChooseExoModal } from "#modules/Seance/view/addSeance/ExoCard/ChooseExoModal/ChooseExoModal";
import { Exo } from "#shared/exo/domain/exo.types";
import { ShowArrowIcon } from "#shared/icons/ShowArrowIcon";
import { SmallShowArrowIcon } from "#shared/icons/SmallShowArrowIcon";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, Pressable, View } from "react-native";

const WINDOW_WIDTH = Dimensions.get("window").width;
const IMAGE_SIZE = 100;
const HEADER_PADDING = 16;

type Props = {
  exo: Exo;
  onExoChange: (exo: Exo) => void;
  onGoBackPress: () => void;
};
export const ExoStatsHeader: React.FC<Props> = ({
  exo,
  onExoChange,
  onGoBackPress,
}) => {
  const theme = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation(["statistics"]);
  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderColor: theme.colors.text500,
        borderWidth: 1,
      }}
    >
      <Container>
        <SimpleRow
          style={{ maxWidth: WINDOW_WIDTH - IMAGE_SIZE - 2 * HEADER_PADDING }}
        >
          <Pressable
            onPress={onGoBackPress}
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: theme.colors.grey200,
              borderRadius: 8,
            }}
          >
            <ShowArrowIcon
              color={theme.colors.black}
              height={48}
              width={24}
              style={{
                transform: [{ rotate: "180deg" }],
                alignSelf: "flex-start",
              }}
            />
          </Pressable>
          <Spacer.Horizontal gap={4} />
          <TitleContainer>
            <Typography.TitleL.bold style={{ flexShrink: 1 }}>
              {exo.exoName}
            </Typography.TitleL.bold>
            <Pressable
              onPress={() => {
                setIsModalVisible(true);
              }}
            >
              <Typography.TextL.regular>
                {t("exerciseStats.chooseAnother")}
              </Typography.TextL.regular>
              <SimpleRow>
                <Typography.TextL.regular>
                  {t("exerciseStats.exercise")}
                </Typography.TextL.regular>
                <SmallShowArrowIcon
                  color={theme.colors.black}
                  height={8}
                  width={8}
                />
              </SimpleRow>
            </Pressable>
          </TitleContainer>
        </SimpleRow>
        <Image
          source={{ uri: exo.imageURL }}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
          style={{ borderWidth: 1, borderRadius: 8 }}
        />
        <ChooseExoModal
          onExoPress={onExoChange}
          isModalVisible={isModalVisible}
          closeModal={() => {
            setIsModalVisible(false);
          }}
        />
      </Container>
    </View>
  );
};

const Container = styled.View({
  flexDirection: "row",
  alignItems: "flex-start",
  padding: HEADER_PADDING,
});

const SimpleRow = styled.View({
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
});

const TitleContainer = styled.View({
  flexShrink: 1,
  flex: 1,
});

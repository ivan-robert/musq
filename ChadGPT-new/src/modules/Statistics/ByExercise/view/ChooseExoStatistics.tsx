import { ChooseExoModal } from "#modules/Seance/view/addSeance/ExoCard/ChooseExoModal/ChooseExoModal";
import { PopularExoCard } from "#modules/Statistics/ByExercise/view/PopularExosList/PopularExoCard";
import { usePopularExos } from "#modules/Statistics/ByExercise/view/PopularExosList/usePopularExos";
import { ProgressionNavigatorStackParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Progression/ProgressionNavigator.types";
import { useOfficialExosContext } from "#shared/exo/view/OfficialExos.context";
import { SearchIcon } from "#shared/icons/SearchIcon";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

export const ChooseExoStatistics: React.FC = () => {
  const theme = useTheme();
  const [isExoModalVisible, setIsExoModalVisible] = useState(false);
  const { navigate } =
    useNavigation<NavigationProp<ProgressionNavigatorStackParamList>>();
  const exos = useOfficialExosContext();
  const { data: popularExosIds } = usePopularExos();
  const { t } = useTranslation("statistics");

  return (
    <Container>
      <TitleContainer>
        <Trans
          ns="statistics"
          i18nKey="common.statsByExercise"
          parent={Typography.TitleM.bold}
          components={{
            white: <Typography.TitleM.bold color={theme.colors.text500} />,
            orange: <Typography.TitleM.bold color={theme.colors.CTA300} />,
          }}
        />
      </TitleContainer>

      <Spacer.Vertical gap={16} />

      <View style={{ gap: 8 }}>
        {popularExosIds.map((exoId) => {
          return (
            <PopularExoCard
              key={exoId}
              exo={exos[exoId]}
              onPress={() => {
                navigate("ExoStats", { exoId });
              }}
            />
          );
        })}
      </View>

      <Spacer.Vertical gap={16} />

      <Pressable
        style={{ alignSelf: "center" }}
        onPress={() => {
          setIsExoModalVisible(true);
        }}
      >
        <Row>
          <Typography.TextL.regular color={theme.colors.text500}>
            {t("common.chooseExercise")}
          </Typography.TextL.regular>
          <Spacer.Horizontal gap={8} />
          <SearchIcon height={20} width={20} />
        </Row>
        <TextUnderliner />
      </Pressable>
      <ChooseExoModal
        isModalVisible={isExoModalVisible}
        closeModal={() => {
          setIsExoModalVisible(false);
        }}
        onExoPress={(exo) => {
          navigate("ExoStats", { exoId: exo.exoId });
        }}
      />
    </Container>
  );
};

const Container = styled.View({
  flex: 1,
  paddingHorizontal: 16,
});

const TextUnderliner = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.text500,
  marginVertical: 16,
}));

const Row = styled.View({
  flexDirection: "row",
  alignItems: "center",
});

const TitleContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
});

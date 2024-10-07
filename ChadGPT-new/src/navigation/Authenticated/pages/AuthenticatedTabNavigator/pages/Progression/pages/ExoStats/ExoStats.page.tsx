import { ExoStatistics } from "#modules/Statistics/ByExercise/view/ExoStatistics/ExoStatistics";
import { ExoStatsHeader } from "#modules/Statistics/ByExercise/view/ExoStatistics/ExoStatsHeader";
import { ProgressionNavigatorStackParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Progression/ProgressionNavigator.types";
import { useOfficialExosContext } from "#shared/exo/view/OfficialExos.context";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { useTheme } from "@emotion/react";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

export const ExoStatsPage = () => {
  const { params } =
    useRoute<RouteProp<ProgressionNavigatorStackParamList, "ExoStats">>();
  const { goBack, navigate } =
    useNavigation<NavigationProp<ProgressionNavigatorStackParamList>>();
  const exos = useOfficialExosContext();
  const theme = useTheme();
  const exo = exos[params.exoId];

  return (
    <PageTemplate topInsetColor={theme.colors.white} type="tab">
      <ExoStatsHeader
        onGoBackPress={goBack}
        exo={exo}
        onExoChange={(exercise) => {
          navigate("ExoStats", { exoId: exercise.exoId });
        }}
      />
      <ExoStatistics exoId={params.exoId} />
    </PageTemplate>
  );
};

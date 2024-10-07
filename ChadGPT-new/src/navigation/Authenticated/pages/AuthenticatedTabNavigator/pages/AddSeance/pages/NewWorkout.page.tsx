import { NewWorkout } from "#modules/Seance/view/add-workout/NewWorkout";
import { AddSeanceNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/AddSeanceNavigator.types";
import { useOngoingWorkout } from "#shared/utils/useOngoingWorkout";
import { NewWorkoutPageHeader } from "#shared/view/components/NewWorkoutPageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { useTheme } from "@emotion/react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export const NewWorkoutPage: React.FC = () => {
  const { t } = useTranslation("workouts");
  const theme = useTheme();
  const { params } =
    useRoute<RouteProp<AddSeanceNavigatorParamList, "new-workout">>();

  const { retrieveCurrentTemplate } = useOngoingWorkout();

  const workout_template = retrieveCurrentTemplate();

  const exercisesIds = params?.exosIdsForRedirect;

  return (
    <PageTemplate
      type="page"
      topInsetColor={theme.colors.primary500}
      bottomInsetColor={theme.colors.neutral}
    >
      <NewWorkoutPageHeader title={t("newAddWorkout.newWorkout")} />
      <NewWorkout
        redirectExosIds={exercisesIds}
        templateUsed={workout_template ?? undefined}
      />
    </PageTemplate>
  );
};

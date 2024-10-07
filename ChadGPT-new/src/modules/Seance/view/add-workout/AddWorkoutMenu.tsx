import { AddSeanceNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/AddSeanceNavigator.types";
import { useOngoingWorkout } from "#shared/utils/useOngoingWorkout";
import { PageHeader } from "#shared/view/components/PageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

export const AddWorkoutMenu: React.FC = () => {
  const { t } = useTranslation("workouts");
  const theme = useTheme();
  const { navigate, goBack } =
    useNavigation<NavigationProp<AddSeanceNavigatorParamList>>();
  const { removeOngoingWorkout } = useOngoingWorkout();
  return (
    <PageTemplate>
      <PageHeader
        headerText={t("newAddWorkout.workoutCreation")}
        onCrossIconPress={goBack}
      />
      <Spacer.Vertical gap={16} />
      <Pressable
        onPress={() => {
          navigate("browse");
        }}
      >
        {({ pressed }) => (
          <CreationChip
            style={
              pressed ? { backgroundColor: theme.colors.primary200 } : undefined
            }
          >
            <Typography.TitleL.regular color={theme.colors.text300}>
              {t("newAddWorkout.browseWorkouts")}
            </Typography.TitleL.regular>
          </CreationChip>
        )}
      </Pressable>
      <Spacer.Vertical gap={16} />
      <Pressable
        onPress={() => {
          removeOngoingWorkout();
          navigate("new-workout");
        }}
      >
        {({ pressed }) => (
          <CreationChip
            style={
              pressed ? { backgroundColor: theme.colors.primary200 } : undefined
            }
          >
            <Typography.TitleL.regular color={theme.colors.text300}>
              {t("newAddWorkout.createFromScratch")}
            </Typography.TitleL.regular>
          </CreationChip>
        )}
      </Pressable>
    </PageTemplate>
  );
};

const CreationChip = styled.View(({ theme }) => ({
  alignItems: "center",
  borderRadius: 8,
  flexDirection: "row",
  paddingHorizontal: 16,
  paddingVertical: 48,
  gap: 8,
  backgroundColor: theme.colors.primary500,
}));

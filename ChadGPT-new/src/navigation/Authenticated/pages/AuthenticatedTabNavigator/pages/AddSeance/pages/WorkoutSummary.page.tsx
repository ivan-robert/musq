import { Workout, workoutSchema } from "#modules/Seance/domain/seance.types";
import {
  WorkoutFullForm,
  workoutWithMetaFormSchema,
} from "#modules/Seance/domain/workoutFullForm.schema";
import { getSmartTargets } from "#modules/Seance/utils/get-smart-targets";
import { AdditionalInfoForm } from "#modules/Seance/view/add-workout/AdditionalInfoForm";
import { usePostWorkout } from "#modules/Seance/view/add-workout/usePostWorkout";
import { WorkoutSummary } from "#modules/Seance/view/add-workout/WorkoutSummary";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { useSalles } from "#shared/salle/view/useSalles";
import { ToastService } from "#shared/service/Toast.service";
import { useOngoingWorkout } from "#shared/utils/useOngoingWorkout";
import { Button } from "#shared/view/components/Button/Button";
import { ConfirmationModal } from "#shared/view/components/ConfirmationModal";
import { NewWorkoutPageHeader } from "#shared/view/components/NewWorkoutPageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { ScrollView } from "#shared/view/components/ScrollView";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export const WorkoutSummaryPage: React.FC = () => {
  const theme = useTheme();
  const { removeOngoingWorkout } = useOngoingWorkout();
  const { t } = useTranslation("workouts");
  const { retrieveOngoingWorkout } = useOngoingWorkout();
  const workout = retrieveOngoingWorkout();
  const { data: salles } = useSalles();
  if (!workout || !salles.length) return null;
  const castedWorkout: Workout = {
    ...workout,
    endDate: new Date().toISOString(),
    salle: salles[0],
  };
  const { success } = workoutSchema.safeParse(castedWorkout);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();

  const workoutFullForm = useForm<WorkoutFullForm>({
    resolver: zodResolver(workoutWithMetaFormSchema),
    defaultValues: {
      description: "",
      images: [],
      title: "",
      workout: { ...castedWorkout, types: getSmartTargets(castedWorkout) },
    },
  });

  const { mutate, isPending } = usePostWorkout();

  if (!success) {
    ToastService.show({
      type: "error",
      title: t("addWorkout.errorWithWorkout"),
      message: t("addWorkout.contactSupport"),
    });
  }

  return (
    <PageTemplate topInsetColor={theme.colors.primary500}>
      <NewWorkoutPageHeader title="Workout summary" />
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        <Spacer.Vertical gap={16} />
        <AdditionalInfoForm
          control={workoutFullForm.control}
          images={workoutFullForm.watch("images")}
        />
        <Spacer.Vertical gap={16} />
        <View style={{ paddingHorizontal: 16 }}>
          <Typography.TextL.bold color={theme.colors.text500}>
            Workout summary
          </Typography.TextL.bold>
          <Spacer.Vertical gap={16} />
          <WorkoutSummary workout={castedWorkout} />
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <View style={{ flex: 1 }}>
          <Button.Secondary
            onPress={() => {
              setIsModalVisible(true);
            }}
            text="Ignore"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button.Primary
            onPress={() => {
              mutate(workoutFullForm.getValues());
            }}
            text="Confirm"
            isLoading={isPending}
          />
        </View>
      </View>
      <Spacer.Vertical gap={16} />
      <ConfirmationModal
        cancelLabel="Back to summary"
        confirmLabel="Yes"
        description="All the data concerning this workout will be lost"
        isVisble={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        onConfirm={() => {
          setIsModalVisible(false);
          removeOngoingWorkout();
          navigate("AuthenticatedTabNavigator");
        }}
        title="Are you sure?"
        isNegative
      />
    </PageTemplate>
  );
};

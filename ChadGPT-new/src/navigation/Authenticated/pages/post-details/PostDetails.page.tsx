import styled from "@emotion/native";
import { useTheme } from "@emotion/react";

import { View } from "react-native";

import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { useDeleteSeance } from "#modules/Seance/view/useDeleteSeance";
import { ConfirmationModal } from "#shared/view/components/ConfirmationModal";
import { useState } from "react";
import { ClockIcon } from "#shared/icons/ClockIcon";
import { ArrowIcon } from "#shared/icons/ArrowIcon";
import { useTranslation } from "react-i18next";
import { useUserContext } from "#modules/auth/context/User.context";

import { DateTime } from "luxon";
import { WorkoutSummary } from "#modules/Seance/view/add-workout/WorkoutSummary";
import { ScrollView } from "#shared/view/components/ScrollView";
import { CopyWorkoutButton } from "#modules/Seance/view/workout-templates/CopyWorkoutButton";
import { PageHeader } from "#shared/view/components/PageHeader";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Typography } from "#shared/view/components/Typography/Typography";
import { Spacer } from "#shared/view/components/Spacer";
import { useFetchPost } from "#modules/social/view/useFetchPosts";

export const PostDetailsPage: React.FC = () => {
  const { params } =
    useRoute<RouteProp<RootStackNavigatorParamList, "post-details">>();
  const { postId } = params;
  const theme = useTheme();
  const { t } = useTranslation("workouts");
  const { data: post } = useFetchPost(postId);
  const { deleteSeance } = useDeleteSeance();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const chosenSeance = post.workout;
  const { user } = useUserContext();
  const { goBack } = useNavigation();

  return (
    <PageTemplate>
      <ConfirmationModal
        onCancel={() => setShowConfirmationModal(false)}
        cancelLabel={t("newAddWorkout.cancel")}
        isNegative
        confirmLabel={t("workout.delete")}
        title={t("workout.deleteWorkout")}
        description={t("workout.confirmDelete")}
        isVisble={showConfirmationModal}
        onConfirm={() => {
          deleteSeance(chosenSeance.id!);
          goBack();
        }}
      />
      <PageHeader headerText={post.title} onGoBackPress={goBack} />
      <Separator />
      <ContentContainer>
        <ScrollView contentContainerStyle={{ paddingTop: 32 }}>
          <View style={{ alignItems: "flex-end" }}>
            <CopyWorkoutButton workout={chosenSeance} />
          </View>
          {!!chosenSeance.types.length && (
            <Typography.TextL.regular color={theme.colors.text500}>
              {t("workout.targets", {
                targets: `${chosenSeance.types.join(", ")}`,
              })}
            </Typography.TextL.regular>
          )}

          <HourRow>
            <HourItemContainer>
              <ClockIcon color={theme.colors.text500} height={24} width={24} />
              <Typography.TextL.regular color={theme.colors.text500}>
                {DateTime.fromISO(chosenSeance.startDate).toLocaleString({
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography.TextL.regular>
            </HourItemContainer>
            <Spacer.Horizontal gap={16} />
            <ArrowIcon height={16} width={16} color={theme.colors.text500} />
            <Spacer.Horizontal gap={16} />
            <HourItemContainer>
              <ClockIcon color={theme.colors.text500} height={24} width={24} />
              <Typography.TextL.regular color={theme.colors.text500}>
                {DateTime.fromISO(chosenSeance.endDate).toLocaleString({
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography.TextL.regular>
            </HourItemContainer>
          </HourRow>
          <WorkoutSummary workout={chosenSeance} />
        </ScrollView>
        {chosenSeance.userId === user.id && (
          <DeleteSeanceButton
            onPress={() => {
              setShowConfirmationModal(true);
            }}
          >
            <Typography.TextL.regular color={theme.colors.statusError}>
              {t("workout.deleteWorkout")}
            </Typography.TextL.regular>
          </DeleteSeanceButton>
        )}
      </ContentContainer>
      <Spacer.Vertical gap={16} />
    </PageTemplate>
  );
};

const DeleteSeanceButton = styled.Pressable(({ theme }) => ({
  backgroundColor: theme.colors.white,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: theme.colors.redDelete,
}));

const Separator = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.grey300,
}));

const ContentContainer = styled.View({
  gap: 16,
  paddingHorizontal: 16,
  flex: 1,
});

const HourRow = styled.View({
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
});

const HourItemContainer = styled.View({
  flexDirection: "row",
  paddingVertical: 8,
  flex: 1,
  paddingHorizontal: 16,
  gap: 16,
  alignItems: "center",
  justifyContent: "center",
});

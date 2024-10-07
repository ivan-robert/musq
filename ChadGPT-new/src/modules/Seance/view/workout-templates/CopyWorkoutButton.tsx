import { Workout } from "#modules/Seance/domain/seance.types";
import { ChooseFolderModal } from "#modules/Seance/view/workout-templates/ChooseFolderModal";
import { useCopyWorkout } from "#modules/Seance/view/workout-templates/useCopyWorkout";
import { useWorkoutPosession } from "#modules/Seance/view/workout-templates/useWorkoutPosession";
import { Loader } from "#shared/view/components/Loader/Loader";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

type Props = {
  workout: Workout;
};
export const CopyWorkoutButton: React.FC<Props> = ({ workout }) => {
  const { t } = useTranslation("workouts");
  const theme = useTheme();
  const { data, isPending, isError } = useWorkoutPosession(workout.id!);
  const [isChoosingFolder, setIsChoosingFolder] = useState(false);
  const { mutate: copyWorkout } = useCopyWorkout();

  const isPossessed = !!data && data.is_possessed;

  const getStatusColor = (pressed: boolean) =>
    isPossessed
      ? theme.colors.secondary300
      : isError
      ? theme.colors.statusError
      : pressed
      ? theme.colors.CTA300
      : theme.colors.CTA500;

  return (
    <>
      <Pressable
        style={{ alignItems: "center" }}
        disabled={isPossessed || isPending}
        onPress={() => {
          setIsChoosingFolder(true);
        }}
      >
        {({ pressed }) => (
          <View
            style={{
              borderRadius: 32,
              borderColor: getStatusColor(pressed),
              borderWidth: 1,
              backgroundColor: theme.colors.primary800,
              paddingVertical: 8,
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!isPending && (
              <Typography.TextM.regular
                style={{ lineHeight: 18 }}
                color={getStatusColor(pressed)}
              >
                {isPossessed
                  ? t("newAddWorkout.registered")
                  : t("newAddWorkout.copyWorkout")}
              </Typography.TextM.regular>
            )}

            {isPending && (
              <View style={{ height: 18, width: 18 }}>
                <Loader height={18} width={18} color={theme.colors.CTA500} />
              </View>
            )}
          </View>
        )}
      </Pressable>
      <ChooseFolderModal
        isModalVisible={isChoosingFolder}
        onFolderSelection={(folder, name) => {
          copyWorkout({ workout, folder, fileName: name });
        }}
        closeModal={() => {
          setIsChoosingFolder(false);
        }}
      />
    </>
  );
};

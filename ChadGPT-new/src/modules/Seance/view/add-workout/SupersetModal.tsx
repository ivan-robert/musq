import { ChooseExoModal } from "#modules/Seance/view/addSeance/ExoCard/ChooseExoModal/ChooseExoModal";
import { SeanceFormModal } from "#modules/Seance/view/addSeance/SeanceFormModal";
import { Exo } from "#shared/exo/domain/exo.types";
import CrossIcon from "#shared/icons/CrossIcon";
import { PlusIcon } from "#shared/icons/PlusIcon";
import { ScrollView } from "#shared/view/components/ScrollView";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Button } from "@rneui/base";
import { useCallback, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { useTranslation } from "react-i18next"; // Import useTranslation

const ModalHeight = Dimensions.get("window").height * 0.5;

type Props = {
  isVisble: boolean;
  closeModal: () => void;
  onConfirm: (exos: Exo[]) => void;
};

export const SupersetModal: React.FC<Props> = ({
  closeModal,
  isVisble,
  onConfirm,
}) => {
  const theme = useTheme();
  const { t } = useTranslation("workouts"); // Initialize t with 'workouts' namespace
  const [exercises, setExercises] = useState<Exo[]>([]);

  const removeExo = (id: string) => {
    setExercises((prev) => prev.filter((exo) => exo.exoId !== id));
  };

  const [isChoosingExercise, setIsChoosingExercise] = useState(false);

  const validateExercises = useCallback(() => {
    onConfirm(exercises);
    closeModal();
    setExercises([]);
  }, [closeModal, exercises, onConfirm]);

  return (
    <>
      <SeanceFormModal
        style={{ height: ModalHeight }}
        title={t("supersetModal.title")}
        isModalVisible={isVisble}
        closeModal={closeModal}
      >
        <ContentContainer>
          <Typography.TextL.regular color={theme.colors.black}>
            {t("supersetModal.chooseExercises")}
          </Typography.TextL.regular>
        </ContentContainer>
        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={() => {
              setIsChoosingExercise(true);
            }}
          >
            {({ pressed }) => (
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 10000000,
                  padding: 16,
                  alignItems: "center",
                  borderColor: pressed
                    ? theme.colors.CTA300
                    : theme.colors.CTA500,
                  borderWidth: 1,
                }}
              >
                <PlusIcon height={32} width={32} color={theme.colors.black} />
              </View>
            )}
          </Pressable>
        </View>
        <Spacer.Vertical gap={16} />
        {exercises.length ? (
          <ScrollView contentContainerStyle={{ gap: 4, padding: 8 }}>
            {exercises.map((exo, index) => {
              return (
                <ExoChipContainer key={exo.exoId + index}>
                  <Typography.TextS.regular>
                    {t("supersetModal.setLabel", {
                      number: index + 1,
                      exercise: exo.exoName,
                    })}
                  </Typography.TextS.regular>
                  <Spacer.Flex />
                  <Pressable
                    onPress={() => {
                      removeExo(exo.exoId);
                    }}
                  >
                    <CrossIcon />
                  </Pressable>
                </ExoChipContainer>
              );
            })}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography.TextL.regular color={theme.colors.black}>
              {t("supersetModal.noExerciseAdded")}
            </Typography.TextL.regular>
          </View>
        )}
        <BottomButtonContainer>
          <Spacer.Flex />
          <Button
            disabled={!exercises.length}
            onPress={validateExercises}
            color={theme.colors.CTA500}
          >
            <Typography.TextL.regular color={theme.colors.white}>
              {t("supersetModal.addSuperset")}
            </Typography.TextL.regular>
          </Button>
        </BottomButtonContainer>
        <ChooseExoModal
          isModalVisible={isChoosingExercise}
          closeModal={() => setIsChoosingExercise(false)}
          onExoPress={(exo) => {
            setExercises([...exercises, exo]);
          }}
        />
      </SeanceFormModal>
    </>
  );
};

const ExoChipContainer = styled.View(({ theme }) => ({
  borderRadius: 8,
  flexDirection: "row",
  padding: 16,
  borderColor: theme.colors.primary200,
  borderWidth: 1,
}));

const BottomButtonContainer = styled.View({
  flexDirection: "row",
  padding: 16,
});

const ContentContainer = styled.View({
  padding: 8,
  gap: 8,
});

import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { SaveButton } from "#modules/Seance/view/addSeance/SerieCard/SeanceModalButtons";
import { CheckboxPressable } from "#shared/view/components/CheckBoxPressable";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalNumberInput } from "#shared/view/components/ModalNumberInput";
import { useTranslation } from "react-i18next";
import { RepSet } from "#modules/Seance/domain/serie.types";
import { Typography } from "#shared/view/components/Typography/Typography";
import { SeanceFormModal } from "#modules/Seance/view/addSeance/SeanceFormModal";

type RepSetModalProps = {
  isModalVisible: boolean;
  closeModal: () => void;
  onConfirm: (set: RepSet) => void;
  initialSet?: RepSet;
  rest?: () => void;
};

const repsContentSchema = z.object({
  reps: z.string().min(1),
  echec: z.boolean(),
});

type RepsFormContent = z.infer<typeof repsContentSchema>;

export const RepSetModal = ({
  closeModal,
  isModalVisible,
  onConfirm,
  initialSet,
  rest,
}: RepSetModalProps) => {
  const { t } = useTranslation("workouts");

  const theme = useTheme();
  const poidsInputRef = useRef<TextInput>(null);

  const initialValue = initialSet
    ? {
        echec: initialSet.echec,
        reps: initialSet.reps.toString(),
      }
    : {
        echec: false,
        reps: "",
      };

  const repsSetForm = useForm<RepsFormContent>({
    resolver: zodResolver(repsContentSchema),
    defaultValues: initialValue,
    reValidateMode: "onChange",
  });

  const [isRepsFocused, setIsRepsFocused] = useState(false);

  return (
    <SeanceFormModal
      title={t("newAddWorkout.modals.exercise")}
      closeModal={() => {
        repsSetForm.reset();
        closeModal();
      }}
      isModalVisible={isModalVisible}
    >
      <ContentContainer>
        <Typography.TextL.bold color={theme.colors.black}>
          {t("set.howDidItGo")}
        </Typography.TextL.bold>
        <CenteredView>
          <RowContainer>
            <Controller
              control={repsSetForm.control}
              name="reps"
              render={({ field: { onChange, value } }) => (
                <ModalNumberInput
                  isFocused={isRepsFocused}
                  onFocus={() => setIsRepsFocused(true)}
                  onBlur={() => setIsRepsFocused(false)}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  autoFocus
                  onSubmitEditing={() => poidsInputRef.current?.focus()}
                  keyboardType="numeric"
                />
              )}
            />

            <Typography.TitleL.bold color={theme.colors.black}>
              {t("newAddWorkout.modals.reps")}
            </Typography.TitleL.bold>
          </RowContainer>
        </CenteredView>

        <RowContainer>
          <Controller
            control={repsSetForm.control}
            name="echec"
            render={({ field: { onChange, value } }) => (
              <CheckboxPressable
                isChecked={value}
                size={32}
                onPress={() => {
                  onChange(!value);
                }}
              />
            )}
          />
          <Typography.TextL.regular color={theme.colors.black}>
            {t("set.didYouAchieveFailure")}
          </Typography.TextL.regular>
        </RowContainer>
        {initialSet ? (
          <RowContainer>
            <SaveButton
              isDisabled={
                !repsSetForm.formState.isValid ||
                isNaN(Number(repsSetForm.watch().reps))
              }
              label="save"
              onPress={() => {
                onConfirm({
                  echec: repsSetForm.watch().echec,
                  reps: Number(repsSetForm.watch().reps),
                  id: "",
                  perfId: "",
                  repos: initialSet.repos,
                  type: "REPS",
                });
                closeModal();
              }}
            />
          </RowContainer>
        ) : (
          <RowContainer>
            <SaveButton
              isDisabled={
                !repsSetForm.formState.isValid ||
                isNaN(Number(repsSetForm.watch().reps))
              }
              label={t("newAddWorkout.saveAndClose")}
              onPress={() => {
                onConfirm({
                  echec: repsSetForm.watch().echec,
                  reps: Number(repsSetForm.watch().reps),
                  id: "",
                  perfId: "",
                  repos: 0,
                  type: "REPS",
                });
                closeModal();
              }}
            />
            {!!rest && (
              <SaveButton
                isDisabled={
                  !repsSetForm.formState.isValid ||
                  isNaN(Number(repsSetForm.watch().reps))
                }
                label={t("newAddWorkout.rest")}
                onPress={() => {
                  onConfirm({
                    echec: repsSetForm.watch().echec,
                    reps: Number(repsSetForm.watch().reps),
                    id: "",
                    perfId: "",
                    repos: 0,
                    type: "REPS",
                  });
                  closeModal();
                  rest();
                }}
              />
            )}
          </RowContainer>
        )}
      </ContentContainer>
    </SeanceFormModal>
  );
};

const ContentContainer = styled.View({ gap: 16, padding: 16 });

const CenteredView = styled.View({
  justifyContent: "center",
  alignItems: "center",
});

const RowContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
});

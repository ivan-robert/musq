import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { SaveButton } from "#modules/Seance/view/addSeance/SerieCard/SeanceModalButtons";
import CrossIcon from "#shared/icons/CrossIcon";
import { CheckboxPressable } from "#shared/view/components/CheckBoxPressable";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalNumberInput } from "#shared/view/components/ModalNumberInput";
import { useTranslation } from "react-i18next";
import { WeightSet } from "#modules/Seance/domain/serie.types";
import { Typography } from "#shared/view/components/Typography/Typography";
import { SeanceFormModal } from "#modules/Seance/view/addSeance/SeanceFormModal";

export type SerieCardModalProps = {
  isModalVisible: boolean;
  closeModal: () => void;
  onConfirm: (set: WeightSet) => void;
  initialSet?: WeightSet;
  allowWarmup?: boolean;
  hideRest?: boolean;
  rest: () => void;
};

const seriePoidsFormContentSchema = z.object({
  poids: z.string().min(1),
  reps: z.string().min(1),
  echec: z.boolean(),
  isWarmup: z.boolean(),
});

type SeriePoidsFormContent = z.infer<typeof seriePoidsFormContentSchema>;

export const WeightSetModal = ({
  closeModal,
  isModalVisible,
  onConfirm,
  initialSet,
  hideRest,
  allowWarmup,
  rest,
}: SerieCardModalProps) => {
  const { t } = useTranslation("workouts");

  const theme = useTheme();
  const poidsInputRef = useRef<TextInput>(null);

  const initialValue = initialSet
    ? {
        echec: initialSet.echec,
        poids: initialSet.poids.toString(),
        reps: initialSet.reps.toString(),
        isWarmup: initialSet.isWarmup,
      }
    : {
        echec: false,
        poids: "",
        reps: "",
        isWarmup: false,
      };

  const poidsSerieForm = useForm<SeriePoidsFormContent>({
    resolver: zodResolver(seriePoidsFormContentSchema),
    defaultValues: initialValue,
    reValidateMode: "onChange",
  });

  const [isRepsFocused, setIsRepsFocused] = useState(false);
  const [isPoidsFocused, setIsPoidsFocused] = useState(false);

  return (
    <SeanceFormModal
      title="Exercise"
      closeModal={() => {
        poidsSerieForm.reset();
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
              control={poidsSerieForm.control}
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

            <CrossIcon width={16} height={16} />

            <Controller
              control={poidsSerieForm.control}
              name="poids"
              render={({ field: { onChange, value } }) => (
                <ModalNumberInput
                  ref={poidsInputRef}
                  isFocused={isPoidsFocused}
                  onFocus={() => setIsPoidsFocused(true)}
                  onBlur={() => setIsPoidsFocused(false)}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  keyboardType="numeric"
                />
              )}
            />
            <Typography.TitleL.bold color={theme.colors.black}>
              kg
            </Typography.TitleL.bold>
          </RowContainer>
        </CenteredView>

        {allowWarmup && (
          <RowContainer>
            <Controller
              control={poidsSerieForm.control}
              name="isWarmup"
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
              {t("set.isWarmup")}
            </Typography.TextL.regular>
          </RowContainer>
        )}

        <RowContainer>
          <Controller
            control={poidsSerieForm.control}
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
                !poidsSerieForm.formState.isValid ||
                isNaN(Number(poidsSerieForm.watch().poids)) ||
                isNaN(Number(poidsSerieForm.watch().reps))
              }
              label={t("newAddWorkout.save")}
              onPress={() => {
                onConfirm({
                  echec: poidsSerieForm.watch().echec,
                  poids: Number(poidsSerieForm.watch().poids),
                  reps: Number(poidsSerieForm.watch().reps),
                  isWarmup: poidsSerieForm.watch().isWarmup,
                  id: "",
                  perfId: "",
                  repos: initialSet.repos,
                  type: "POIDS",
                });
                closeModal();
              }}
            />
          </RowContainer>
        ) : (
          <RowContainer>
            <SaveButton
              isDisabled={
                !poidsSerieForm.formState.isValid ||
                isNaN(Number(poidsSerieForm.watch().poids)) ||
                isNaN(Number(poidsSerieForm.watch().reps))
              }
              label={t("newAddWorkout.saveAndClose")}
              onPress={() => {
                onConfirm({
                  echec: poidsSerieForm.watch().echec,
                  poids: Number(poidsSerieForm.watch().poids),
                  reps: Number(poidsSerieForm.watch().reps),
                  id: "",
                  perfId: "",
                  repos: 0,
                  type: "POIDS",
                  isWarmup: poidsSerieForm.watch().isWarmup,
                });
                closeModal();
              }}
            />
            {!hideRest && (
              <SaveButton
                isDisabled={
                  !poidsSerieForm.formState.isValid ||
                  isNaN(Number(poidsSerieForm.watch().poids)) ||
                  isNaN(Number(poidsSerieForm.watch().reps))
                }
                label={t("newAddWorkout.rest")}
                onPress={() => {
                  onConfirm({
                    echec: poidsSerieForm.watch().echec,
                    poids: Number(poidsSerieForm.watch().poids),
                    reps: Number(poidsSerieForm.watch().reps),
                    isWarmup: poidsSerieForm.watch().isWarmup,
                    id: "",
                    perfId: "",
                    repos: 0,
                    type: "POIDS",
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

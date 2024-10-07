import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Dropset } from "#modules/Seance/domain/serie.types";
import { Typography } from "#shared/view/components/Typography/Typography";
import { SeanceFormModal } from "#modules/Seance/view/addSeance/SeanceFormModal";
import { ModalNumberInput } from "#shared/view/components/ModalNumberInput";
import { forwardRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon, Slider } from "@rneui/base";
import { Spacer } from "#shared/view/components/Spacer";

import {
  SaveButton,
  StopButton,
} from "#modules/Seance/view/addSeance/SerieCard/SeanceModalButtons";
import { TextInputProps } from "#shared/view/components/TextInput";
import { ShowArrowIcon } from "#shared/icons/ShowArrowIcon";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

export type DropsetModalProps = {
  isModalVisible: boolean;
  closeModal: () => void;
  onConfirm: (set: Dropset) => void;
  hideRest?: boolean;
  rest: (set: Dropset) => void;
};

const dropsetContentSchema = z.object({
  sets: z.array(
    z.object({ poids: z.number().min(1), reps: z.number().min(1) })
  ),
  maxWeight: z.number().min(1),
});

type DropsetContent = z.infer<typeof dropsetContentSchema>;

export const DropsetModal: React.FC<DropsetModalProps> = ({
  closeModal,
  isModalVisible,
  onConfirm,
  rest,
  hideRest,
}) => {
  const { t } = useTranslation("workouts");

  const theme = useTheme();
  const [isBigWeightFocused, setIsBigWeightFocused] = useState(false);
  const [isRepsInputFocused, setIsRepsInputFocused] = useState(false);

  const { top, bottom } = useSafeAreaInsets();
  const form = useForm<DropsetContent>({
    resolver: zodResolver(dropsetContentSchema),
    defaultValues: { maxWeight: 10, sets: [] },
  });
  const [currentWeight, setCurrentWeight] = useState(10);
  const [currentReps, setCurrentReps] = useState(10);
  const [swipeValue, setSwipeValue] = useState(0);
  const getWeight = (weight: string) => {
    return isNaN(Number(weight)) ? 1 : Number(weight);
  };
  const addSet = (reps: number) => {
    const weight = currentWeight;
    const newSet = { poids: weight, reps: reps };
    form.setValue("sets", [...form.getValues("sets"), newSet]);
  };

  const removeSet = (index: number) => {
    const newSets = form.getValues("sets").filter((_, i) => i !== index);
    form.setValue("sets", newSets);
  };

  const editMaxWeight = (weight: string) => {
    form.setValue("maxWeight", getWeight(weight));
    const newWeight = Number(weight);
    if (!isNaN(newWeight)) {
      setCurrentWeight(Number(form.getValues("maxWeight")));
    }
  };

  const areNumbersValid =
    !isNaN(+currentWeight) && !isNaN(+currentReps) && currentReps > 0;

  const builtDropset: Dropset = {
    type: "DROPSET",
    id: "",
    sets: form.watch("sets").map((set) => ({
      poids: Number(set.poids),
      reps: Number(set.reps),
    })),
    perfId: "",
    repos: 0,
  };

  return (
    <SeanceFormModal
      title="Dropset"
      closeModal={() => {
        closeModal();
      }}
      isModalVisible={isModalVisible}
      style={{
        width: "100%",
        marginTop: top,
        marginBottom: bottom,
        height: "100%",
      }}
    >
      <ContentContainer>
        <Typography.TextL.bold color={theme.colors.black}>
          {t("set.howDidItGo")}
        </Typography.TextL.bold>
        <CenteredView>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Typography.TextL.regular color={theme.colors.black}>
              {t("newAddWorkout.modals.startingWeight")}
            </Typography.TextL.regular>
            <Controller
              control={form.control}
              name="maxWeight"
              render={({ field: { value } }) => (
                <ModalNumberInput
                  value={value.toString()}
                  onChangeText={editMaxWeight}
                  keyboardType="numeric"
                  isFocused={isBigWeightFocused}
                  onFocus={() => {
                    setIsBigWeightFocused(true);
                  }}
                  onBlur={() => {
                    setIsBigWeightFocused(false);
                  }}
                />
              )}
            />
            <Typography.TextL.regular color={theme.colors.black}>
              kg
            </Typography.TextL.regular>
          </View>
        </CenteredView>
        <SectionContainer>
          <Typography.TextL.bold color={theme.colors.black}>
            {t("newAddWorkout.modals.subsets")}
          </Typography.TextL.bold>
          {builtDropset.sets.length === 0 && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography.TextM.regular>
                {t("newAddWorkout.modals.noSetsYet")}
              </Typography.TextM.regular>
            </View>
          )}
          <Spacer.Vertical gap={8} />
          <ScrollView contentContainerStyle={{ gap: 8 }}>
            {builtDropset.sets.map((set, index) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.colors.grey200,
                  paddingHorizontal: 8,
                  padding: 16,
                }}
              >
                <Typography.TextL.regular color={theme.colors.black}>
                  {t("newAddWorkout.setIndex", { index: index + 1 })}
                  {t("newAddWorkout.weightSetDisplay", {
                    reps: set.reps,
                    weight: set.poids,
                  })}
                </Typography.TextL.regular>
                <Spacer.Flex />
                <TouchableOpacity
                  onPress={() => {
                    removeSet(index);
                  }}
                >
                  <Icon
                    name="close"
                    size={24}
                    color={theme.colors.black}
                    onPress={() => {
                      removeSet(index);
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </SectionContainer>
        <View style={{ height: 1, backgroundColor: theme.colors.black }} />
        <SectionContainer>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 1 }}>
              <SliderContainer>
                <Slider
                  disabled={form.watch("maxWeight") === 0}
                  value={currentWeight}
                  allowTouchTrack
                  onValueChange={setCurrentWeight}
                  maximumValue={
                    isNaN(Number(form.watch("maxWeight")))
                      ? 10
                      : Number(form.watch("maxWeight"))
                  }
                  minimumValue={0}
                  step={0.5}
                  orientation="vertical"
                  thumbStyle={{
                    height: 20,
                    width: 16,
                    backgroundColor: "transparent",
                  }}
                  trackStyle={{
                    width: 10,
                    borderRadius: 16,
                  }}
                  maximumTrackTintColor={theme.colors.CTA300}
                  minimumTrackTintColor={theme.colors.secondary200}
                  thumbProps={{
                    children: (
                      <Icon
                        name="fitness-center"
                        size={20}
                        reverse
                        containerStyle={{ bottom: 20, right: 20 }}
                        color={theme.colors.CTA500}
                      />
                    ),
                  }}
                />
              </SliderContainer>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography.TitleM.bold color={theme.colors.black}>
                {currentWeight}kg
              </Typography.TitleM.bold>
              <Spacer.Vertical gap={16} />
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <RepInput
                  keyboardType="numeric"
                  onFocus={() => {
                    setIsRepsInputFocused(true);
                  }}
                  onBlur={() => {
                    setIsRepsInputFocused(false);
                  }}
                  onSwipe={setSwipeValue}
                  onRelease={() => {
                    setCurrentReps(currentReps + swipeValue);
                    setSwipeValue(0);
                  }}
                  value={(currentReps + swipeValue).toString()}
                  isFocused={isRepsInputFocused}
                  onChangeText={(reps) => {
                    if (isNaN(Number(reps))) {
                      return setCurrentReps(0);
                    }
                    setCurrentReps(Number(reps));
                  }}
                />
                <Spacer.Horizontal gap={8} />
                <Typography.TextL.bold color={theme.colors.black}>
                  {t("newAddWorkout.modals.reps")}
                </Typography.TextL.bold>
              </View>
              <Spacer.Vertical gap={16} />
              <Pressable
                onPress={() => {
                  addSet(currentReps);
                }}
                disabled={!areNumbersValid}
              >
                {({ pressed }) => {
                  const isDisabled = !areNumbersValid;
                  return (
                    <View
                      style={{
                        borderColor: isDisabled
                          ? theme.colors.grey200
                          : pressed
                          ? theme.colors.CTA300
                          : theme.colors.CTA500,
                        borderWidth: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 32,
                        borderRadius: 10000000,
                      }}
                    >
                      <Typography.TextL.bold
                        color={
                          isDisabled
                            ? theme.colors.grey200
                            : theme.colors.CTA500
                        }
                      >
                        {t("newAddWorkout.modals.addSet")}
                      </Typography.TextL.bold>
                    </View>
                  );
                }}
              </Pressable>
            </View>
          </View>
        </SectionContainer>
        <ActionsContainer>
          <View style={{ flex: 1 }}>
            <StopButton
              isDisabled={form.watch("sets").length === 0}
              label="save and close"
              onPress={() => {
                onConfirm(builtDropset);
                form.reset();
                closeModal();
              }}
            />
          </View>
          {!hideRest && (
            <View style={{ flex: 1 }}>
              <SaveButton
                label="rest"
                onPress={() => {
                  rest(builtDropset);
                  closeModal();
                  form.reset();
                }}
                isDisabled={form.watch("sets").length === 0}
              />
            </View>
          )}
        </ActionsContainer>
      </ContentContainer>
    </SeanceFormModal>
  );
};

type RepInputProps = TextInputProps & {
  isFocused: boolean;
  onRelease: () => void;
  onSwipe: (value: number) => void;
};

const RepInput = forwardRef<TextInput, RepInputProps>(
  ({ isFocused, onRelease, onSwipe, ...textInputProps }, ref) => {
    const theme = useTheme();
    const incrementValue = () => {
      const newValue = isNaN(Number(textInputProps.value))
        ? 0
        : Number(textInputProps.value);
      return textInputProps.onChangeText?.((newValue + 1).toString());
    };
    const decrementValue = () => {
      const newValue = isNaN(Number(textInputProps.value))
        ? 1
        : Math.max(1, Number(textInputProps.value));
      return textInputProps.onChangeText?.((newValue - 1).toString());
    };
    return (
      <GestureHandlerRootView style={{ flexDirection: "row" }}>
        <PanGestureHandler
          onHandlerStateChange={onRelease}
          onGestureEvent={(event) => {
            const height = event.nativeEvent.translationY;
            const diff = Math.floor(-height / 25);
            onSwipe(diff);
          }}
        >
          <InputContainer isFocused={isFocused}>
            <TextInput
              ref={ref}
              maxLength={6}
              {...textInputProps}
              value={textInputProps.value ?? "0"}
              style={{
                fontFamily: theme.fonts["Montserrat-Bold"],
                fontSize: 24,
                padding: 8,
              }}
            />
            <View>
              <Pressable onPress={incrementValue}>
                <ShowArrowIcon
                  height={24}
                  width={24}
                  transform={[{ rotate: "-90deg" }]}
                />
              </Pressable>
              <Pressable onPress={decrementValue}>
                <ShowArrowIcon
                  height={24}
                  width={24}
                  transform={[{ rotate: "90deg" }]}
                />
              </Pressable>
            </View>
          </InputContainer>
        </PanGestureHandler>
      </GestureHandlerRootView>
    );
  }
);

const InputContainer = styled.View<{ isFocused: boolean }>(
  ({ theme, isFocused }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    minWidth: 70,
    borderWidth: 1,
    borderColor: isFocused ? theme.colors.CTA500 : theme.colors.grey200,
  })
);

const ContentContainer = styled.View({ gap: 16, padding: 16, flex: 1 });

const CenteredView = styled.View({
  justifyContent: "center",
  alignItems: "center",
});

const SectionContainer = styled.View({ flex: 1 });

const SliderContainer = styled.View({
  padding: 20,
  flex: 1,
  flexDirection: "row",
  height: 500,
  justifyContent: "center",
  alignItems: "stretch",
});

const ActionsContainer = styled.View({
  flexDirection: "row",
  gap: 8,
  alignItems: "center",
});

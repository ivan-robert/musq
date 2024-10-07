import { Circuit } from "#modules/Seance/domain/perf.types";
import { CircuitSet } from "#modules/Seance/domain/serie.types";
import { CircuitSetModal } from "#modules/Seance/view/add-workout/CircuitSetModal";
import { TimeSelectionModal } from "#modules/Seance/view/add-workout/TimeSelectionModal";
import { AddSeanceNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/AddSeanceNavigator.types";
import { Exo } from "#shared/exo/domain/exo.types";
import { workoutControlAtom } from "#shared/store/ongoingWorkout";
import { circuitSetAtom } from "#shared/store/perf.store";
import { Button } from "#shared/view/components/Button/Button";
import { ScrollView } from "#shared/view/components/ScrollView";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { useAtom } from "jotai";
import { Fragment, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Pressable, TouchableOpacity, View } from "react-native";

type Props = {
  exercises: Exo[];
  initialPerf: Circuit | null;
};
export const EnterSuperset: React.FC<Props> = ({ exercises, initialPerf }) => {
  const { t } = useTranslation("workouts");
  const [circuit, setCircuit] = useAtom(circuitSetAtom);
  const theme = useTheme();

  const { navigate } =
    useNavigation<NavigationProp<AddSeanceNavigatorParamList>>();

  useEffect(() => {
    if (initialPerf) return setCircuit(initialPerf);
    if (!circuit) {
      setCircuit({
        exos: exercises,
        series: [],
        perfType: "CIRCUIT",
        perfId: "",
        restTime: 30,
      });
    }
  }, [circuit, exercises, initialPerf, setCircuit]);
  const [isEnteringSet, setIsEnteringSet] = useState(false);
  const [isDropsetting, setIsDropsetting] = useState(false);
  const [isEditingRest, setIsEditingRest] = useState(false);
  const [selectedExoIndex, setSelectedExoIndex] = useState(0);
  const [control] = useAtom(workoutControlAtom);

  const selectedExo = exercises[selectedExoIndex];

  const goToNextExercise = () => {
    if (selectedExoIndex === exercises.length - 1)
      return setSelectedExoIndex(0);
    setSelectedExoIndex(selectedExoIndex + 1);
  };

  const deleteCircuit = (index: number) => {
    setCircuit({
      ...circuit!,
      series: circuit!.series.filter((_, i) => i !== index),
    });
  };

  const addSet = (set: CircuitSet) => {
    const isFirstExercise = selectedExoIndex === 0;

    if (isFirstExercise) {
      setCircuit({
        ...circuit!,
        series: [...circuit!.series, { rest: 0, subsets: [set] }],
      });
      goToNextExercise();
      return;
    }

    const perfToMutate = [...circuit!.series];
    if (perfToMutate.length !== 0) {
      perfToMutate[perfToMutate.length - 1].subsets.push(set);
    } else {
      perfToMutate.push({ rest: 0, subsets: [set] });
    }

    setCircuit({
      ...circuit!,
      series: perfToMutate,
    });
    goToNextExercise();
  };

  const editRestTime = (rest: number) => {
    setCircuit({ ...circuit!, restTime: rest });
  };

  if (!circuit) return null;

  const canSave = !!circuit.series.length && selectedExoIndex === 0;

  return (
    <Container>
      <View style={{ flexWrap: "wrap", flexDirection: "row", gap: 8 }}>
        {exercises.map((exo, index) => (
          <Pressable
            key={exo.exoId}
            onPress={() => setSelectedExoIndex(index)}
            style={{
              maxHeight: 200,
              padding: 8,
              borderRadius: 16,
              flexDirection: "row",
              backgroundColor:
                selectedExo?.exoId === exo.exoId
                  ? theme.colors.CTA300
                  : theme.colors.grey200,
            }}
          >
            <Typography.TextS.regular color={theme.colors.black}>
              {exo.exoName}
            </Typography.TextS.regular>
          </Pressable>
        ))}
      </View>
      <Spacer.Vertical gap={4} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography.TextS.regular color={theme.colors.text300}>
          {t("newAddWorkout.restBetweenSupersets", { rest: circuit.restTime })}
        </Typography.TextS.regular>
        <Spacer.Horizontal gap={16} />
        <Button.Tertiary onPress={() => setIsEditingRest(true)} text="Edit" />
      </View>
      {!!circuit.series.length && (
        <ScrollView>
          {circuit.series.map((circuit, i) => (
            <Fragment key={i}>
              <CircuitContainer key={i}>
                <CircuitHeaderContainer>
                  <Typography.TextL.bold color={theme.colors.text300}>
                    Circuit {i + 1}
                  </Typography.TextL.bold>
                  <TouchableOpacity onPress={() => deleteCircuit(i)}>
                    <Icon
                      size={24}
                      color={theme.colors.redDelete}
                      name="delete"
                    />
                  </TouchableOpacity>
                </CircuitHeaderContainer>
                {circuit.subsets.map((set, j) => (
                  <Fragment key={j}>
                    {set.set.type === "POIDS" && (
                      <Typography.TextM.regular color={theme.colors.text300}>
                        <Typography.TextM.bold color={theme.colors.text300}>
                          {set.exercise.exoName}:{" "}
                        </Typography.TextM.bold>
                        <Typography.TextM.regular color={theme.colors.text300}>
                          {set.set.reps}x{set.set.poids}kg
                        </Typography.TextM.regular>
                      </Typography.TextM.regular>
                    )}
                    {set.set.type === "REPS" && (
                      <Typography.TextM.regular color={theme.colors.text300}>
                        <Typography.TextM.bold color={theme.colors.text300}>
                          {set.exercise.exoName}:{" "}
                        </Typography.TextM.bold>
                        <Typography.TextM.regular color={theme.colors.text300}>
                          {set.set.reps} reps
                        </Typography.TextM.regular>
                      </Typography.TextM.regular>
                    )}
                    {set.set.type === "TEMPS" && (
                      <Typography.TextM.regular color={theme.colors.text300}>
                        <Typography.TextM.bold color={theme.colors.text300}>
                          {set.exercise.exoName}:{" "}
                        </Typography.TextM.bold>
                        <Typography.TextM.regular color={theme.colors.text300}>
                          {set.set.temps} s
                        </Typography.TextM.regular>
                      </Typography.TextM.regular>
                    )}
                    {set.set.type === "DROPSET" && (
                      <View>
                        <Typography.TextM.bold color={theme.colors.text500}>
                          {set.exercise.exoName}: dropset
                        </Typography.TextM.bold>
                        {set.set.sets.map((subset, i) => {
                          return (
                            <View style={{ flexDirection: "row" }} key={i}>
                              <Spacer.Horizontal gap={8} />
                              <Typography.TextL.regular
                                color={theme.colors.text500}
                              >
                                {i + 1}: {subset.reps} x {subset.poids} kg
                              </Typography.TextL.regular>
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </Fragment>
                ))}
              </CircuitContainer>
              {!!circuit.rest && (
                <RestContainer>
                  <Typography.TextS.regular color={theme.colors.text500}>
                    {t("newAddWorkout.restTime")}
                  </Typography.TextS.regular>
                  <Spacer.Horizontal gap={16} />
                  <Typography.TextS.bold color={theme.colors.text500}>
                    {circuit.rest}s
                  </Typography.TextS.bold>
                </RestContainer>
              )}
            </Fragment>
          ))}
        </ScrollView>
      )}
      {!circuit.series.length && (
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Typography.TextL.regular color={theme.colors.text300}>
            {t("newAddWorkout.noPerf")}
          </Typography.TextL.regular>
        </View>
      )}
      <View style={{ padding: 8 }}>
        {selectedExo.exoType === "poids" ? (
          <ActionsContainer>
            <Pressable
              onPress={() => {
                setIsDropsetting(true);
                setIsEnteringSet(true);
              }}
            >
              {({ pressed }) => (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: pressed
                      ? theme.colors.CTA300
                      : theme.colors.CTA500,
                    borderRadius: 16,
                    padding: 16,
                  }}
                >
                  <Typography.TitleL.regular
                    color={pressed ? theme.colors.CTA300 : theme.colors.CTA500}
                  >
                    {t("newAddWorkout.addDropset")}
                  </Typography.TitleL.regular>
                </View>
              )}
            </Pressable>
            <Pressable
              onPress={() => {
                setIsDropsetting(false);
                setIsEnteringSet(true);
              }}
            >
              {({ pressed }) => (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: pressed
                      ? theme.colors.CTA300
                      : theme.colors.CTA500,
                    borderRadius: 16,
                    padding: 16,
                  }}
                >
                  <Typography.TitleL.regular
                    color={pressed ? theme.colors.CTA300 : theme.colors.CTA500}
                  >
                    {t("newAddWorkout.addSet")}
                  </Typography.TitleL.regular>
                </View>
              )}
            </Pressable>
          </ActionsContainer>
        ) : (
          <Pressable onPress={() => setIsEnteringSet(true)}>
            {({ pressed }) => (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: pressed
                    ? theme.colors.CTA300
                    : theme.colors.CTA500,
                  borderRadius: 16,
                  padding: 16,
                  alignItems: "center",
                }}
              >
                <Typography.TitleL.regular
                  color={pressed ? theme.colors.CTA300 : theme.colors.CTA500}
                >
                  {t("newAddWorkout.enterSet")}
                </Typography.TitleL.regular>
              </View>
            )}
          </Pressable>
        )}
        <Spacer.Vertical gap={16} />
        {!!control && (
          <Controller
            control={control}
            name="perfs"
            render={({ field: { value, onChange } }) => {
              return (
                <Pressable
                  onPress={() => {
                    onChange([...value, circuit]);
                    setCircuit(null);
                    navigate("new-workout");
                  }}
                  disabled={!canSave}
                >
                  {({ pressed }) => (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: !canSave
                          ? theme.colors.grey200
                          : pressed
                          ? theme.colors.CTA300
                          : theme.colors.CTA500,
                        borderRadius: 16,
                        padding: 16,
                        alignItems: "center",
                      }}
                    >
                      <Typography.TitleL.regular
                        color={
                          !canSave
                            ? theme.colors.grey200
                            : pressed
                            ? theme.colors.CTA300
                            : theme.colors.CTA500
                        }
                      >
                        {t("newAddWorkout.savePerf")}
                      </Typography.TitleL.regular>
                    </View>
                  )}
                </Pressable>
              );
            }}
          />
        )}
      </View>
      <Spacer.Vertical gap={16} />

      <CircuitSetModal
        hideRest={selectedExoIndex !== exercises.length - 1}
        isVisible={isEnteringSet}
        closeModal={() => {
          setIsEnteringSet(false);
        }}
        exercise={selectedExo}
        isDropsetting={isDropsetting}
        onAdd={addSet}
      />
      <TimeSelectionModal
        title="Change rest time"
        closeModal={() => {
          setIsEditingRest(false);
        }}
        isModalVisible={isEditingRest}
        onSavePress={editRestTime}
      />
    </Container>
  );
};

const ActionsContainer = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 16,
});

const CircuitContainer = styled.View(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  borderWidth: 1,
  backgroundColor: theme.colors.primary300,
}));

const CircuitHeaderContainer = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 16,
  alignItems: "center",
});

const Container = styled.View({ flex: 1 });

const RestContainer = styled.View(({ theme }) => ({
  gap: 4,
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "center",
  borderTopColor: theme.colors.text500,
  padding: 16,
}));

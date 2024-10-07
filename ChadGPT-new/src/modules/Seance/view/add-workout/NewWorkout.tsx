import {
  PreparedWorkout,
  Workout,
  workoutSchema,
} from "#modules/Seance/domain/seance.types";
import { SupersetModal } from "#modules/Seance/view/add-workout/SupersetModal";
import { ChooseExoModal } from "#modules/Seance/view/addSeance/ExoCard/ChooseExoModal/ChooseExoModal";
import { AddSeanceNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/AddSeanceNavigator.types";
import { Spacer } from "#shared/view/components/Spacer";
import { Button as MyButton } from "#shared/view/components/Button/Button";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSetAtom } from "jotai";
import styled from "@emotion/native";
import { View } from "react-native";
import { LocalStorage } from "#shared/service/storage/Storage.service";
import { WorkoutSummary } from "#modules/Seance/view/add-workout/WorkoutSummary";
import { ScrollView } from "#shared/view/components/ScrollView";
import { useUserContext } from "#modules/auth/context/User.context";
import { useOngoingWorkout } from "#shared/utils/useOngoingWorkout";
import { workoutAtom, workoutControlAtom } from "#shared/store/ongoingWorkout";
import { TodoClassicPerf } from "#modules/Seance/view/add-workout/TodoClassicPerf";
import { TodoCircuit } from "#modules/Seance/view/add-workout/TodoCircuit";
import { Circuit } from "#modules/Seance/domain/perf.types";
import { useTranslation } from "react-i18next";

type Props = {
  redirectExosIds?: string;
  templateUsed?: PreparedWorkout;
};

export const NewWorkout: React.FC<Props> = ({
  redirectExosIds,
  templateUsed,
}) => {
  const { t } = useTranslation("workouts");
  const theme = useTheme();
  const { user } = useUserContext();
  const { retrieveOngoingWorkout, saveOngoingWorkout } = useOngoingWorkout();
  const workout = retrieveOngoingWorkout();
  const setControl = useSetAtom(workoutControlAtom);

  const form = useForm<Workout>({
    resolver: zodResolver(workoutSchema),
    defaultValues: workout || {
      startDate: DateTime.now().toISO(),
      perfs: [],
      types: [],
      userId: user.id,
      template_id: templateUsed?.id ?? undefined,
    },
  });
  const setWorkoutInfo = useSetAtom(workoutAtom);
  const [isChoosingExercise, setIsChoosingExercise] = useState(false);
  const [isAddingSuperset, setIsAddingSuperset] = useState(false);

  useEffect(() => {
    setControl(form.control);
  }, [form.control, setControl]);

  const { navigate } =
    useNavigation<NavigationProp<AddSeanceNavigatorParamList>>();

  const saveWorkout = useCallback(() => {
    saveOngoingWorkout(form.getValues());
  }, [form, saveOngoingWorkout]);

  useEffect(() => {
    setWorkoutInfo({ isOngoing: true });
    const autosaveInterval = setInterval(() => {
      if (
        JSON.stringify(form.getValues()) !==
        LocalStorage.getStringItem("workout")
      ) {
        saveWorkout();
      }
    }, 3000);
    return () => {
      clearInterval(autosaveInterval);
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (redirectExosIds) {
      navigate("enter-perf", { exercises: redirectExosIds });
    }
  });

  return (
    <>
      <Container>
        {!form.watch("perfs").length && !templateUsed ? (
          <EmptyWorkoutPlaceholder
            addExercise={() => {
              setIsChoosingExercise(true);
            }}
            addSuperset={() => {
              setIsAddingSuperset(true);
            }}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              {!!templateUsed &&
                templateUsed.content.map((perf, i) => {
                  return (
                    <View key={JSON.stringify(perf) + i}>
                      {perf.perfType === "CLASSIC" && (
                        <Controller
                          control={form.control}
                          name={"perfs"}
                          render={({ field: { onChange, value } }) => {
                            const isStrictlyFuture = value.length < i;
                            const previousPerf = value[i - 1];
                            const isClassicPreviousFinished =
                              i === 0 ||
                              previousPerf?.series?.length ===
                                templateUsed.content[i - 1].series.length;

                            const isCircuitPreviousFinished =
                              i === 0 ||
                              previousPerf?.perfType !== "CIRCUIT" ||
                              previousPerf.series[
                                previousPerf.series.length - 1
                              ].subsets.length === previousPerf.exos.length;

                            return (
                              <TodoClassicPerf
                                index={i}
                                perfs={value}
                                isValidated={
                                  value.length > i &&
                                  value[i].series.length >=
                                    templateUsed.content[i].series.length
                                }
                                isDisabled={
                                  isStrictlyFuture ||
                                  !isClassicPreviousFinished ||
                                  !isCircuitPreviousFinished
                                }
                                perfTemplate={perf}
                                savePerf={(perf) => {
                                  if (value.length === i) {
                                    return onChange([...value, perf]);
                                  }

                                  return onChange(
                                    value.map((v, index) => {
                                      if (index === i) {
                                        return perf;
                                      }
                                      return v;
                                    })
                                  );
                                }}
                              />
                            );
                          }}
                        />
                      )}
                      {perf.perfType === "CIRCUIT" && (
                        <Controller
                          control={form.control}
                          name={"perfs"}
                          render={({ field: { onChange, value } }) => {
                            if (
                              value?.[i] !== undefined &&
                              value[i].perfType !== "CIRCUIT"
                            ) {
                              return (
                                <Typography.TextM.regular
                                  color={theme.colors.text500}
                                >
                                  Something is shit
                                </Typography.TextM.regular>
                              );
                            }

                            return (
                              <TodoCircuit
                                isDisabled={
                                  i !== 0 &&
                                  (value.length < i ||
                                    value?.[i - 1]?.series?.length <
                                      perf.series.length)
                                }
                                template={perf}
                                savedPerf={(value?.[i] as Circuit) ?? null}
                                saveCircuit={(perf) => {
                                  if (value.length === i) {
                                    return onChange([...value, perf]);
                                  }

                                  return onChange(
                                    value.map((v, index) => {
                                      if (index === i) {
                                        return perf;
                                      }
                                      return v;
                                    })
                                  );
                                }}
                              />
                            );
                          }}
                        />
                      )}
                    </View>
                  );
                })}
              <Spacer.Vertical gap={16} />
              <Typography.TitleM.bold color={theme.colors.text200}>
                {t("newAddWorkout.workoutSummary")}
              </Typography.TitleM.bold>
              <WorkoutSummary workout={form.watch()} />
            </ScrollView>
          </View>
        )}

        <Spacer.Vertical gap={16} />
        {!templateUsed && (
          <View style={{ flexDirection: "row", gap: 16 }}>
            <View style={{ flex: 1 }}>
              <MyButton.Secondary
                onPress={() => {
                  setIsAddingSuperset(true);
                }}
                text={t("newAddWorkout.modals.superset").toUpperCase()}
              />
            </View>
            <View style={{ flex: 1 }}>
              <MyButton.Secondary
                onPress={() => {
                  setIsChoosingExercise(true);
                }}
                text={t("newAddWorkout.modals.exercise").toUpperCase()}
              />
            </View>
          </View>
        )}

        <Spacer.Vertical gap={16} />

        <MyButton.Primary
          isDisabled={form.watch("perfs").length === 0}
          onPress={() => {
            saveWorkout();
            navigate("workout-summary");
          }}
          text={t("newAddWorkout.endWorkout")}
        />
      </Container>
      <ChooseExoModal
        isModalVisible={isChoosingExercise}
        closeModal={() => {
          setIsChoosingExercise(false);
        }}
        onExoPress={(exo) => {
          navigate("enter-perf", { exercises: exo.exoId });
        }}
      />
      <SupersetModal
        onConfirm={(exos) => {
          navigate("enter-perf", {
            exercises: exos.map((exo) => exo.exoId).join(","),
          });
        }}
        isVisble={isAddingSuperset}
        closeModal={() => {
          setIsAddingSuperset(false);
        }}
      />
    </>
  );
};

type PlaceholderProps = {
  addExercise: () => void;
  addSuperset: () => void;
};

const EmptyWorkoutPlaceholder: React.FC<PlaceholderProps> = ({
  addExercise,
  addSuperset,
}) => {
  const { t } = useTranslation("workouts");
  const theme = useTheme();
  return (
    <CenteredContainer>
      <Typography.TitleM.regular
        color={theme.colors.text500}
        style={{ textAlign: "center" }}
      >
        {t("newAddWorkout.startByAdding")}
      </Typography.TitleM.regular>
      <Spacer.Vertical gap={16} />
      <Button radius={32} color={theme.colors.CTA500} onPress={addExercise}>
        <Typography.TextM.regular color={theme.colors.white}>
          {t("newAddWorkout.addExercises")}
        </Typography.TextM.regular>
      </Button>
      <Spacer.Vertical gap={16} />
      <Button radius={32} color={theme.colors.CTA500} onPress={addSuperset}>
        <Typography.TextM.regular color={theme.colors.white}>
          {t("newAddWorkout.addSuperset")}
        </Typography.TextM.regular>
      </Button>
    </CenteredContainer>
  );
};

const CenteredContainer = styled.View({
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
});

const Container = styled.View({
  flex: 1,
  padding: 16,
});

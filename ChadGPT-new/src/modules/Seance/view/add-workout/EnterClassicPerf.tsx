import { Serie } from "#modules/Seance/domain/serie.types";
import {
  ClassicSetHeader,
  ClassicSetItem,
} from "#modules/Seance/view/add-workout/ClassicSetItem";
import { DropsetModal } from "#modules/Seance/view/add-workout/DropsetModal";
import { RepSetModal } from "#modules/Seance/view/add-workout/RepsSetModal";
import { TimeSelectionModal } from "#modules/Seance/view/add-workout/TimeSelectionModal";
import { TimeSetModal } from "#modules/Seance/view/add-workout/TimeSetModal";
import { useRestTimer } from "#modules/Seance/view/add-workout/useRestTimer";
import { WeightSetModal } from "#modules/Seance/view/add-workout/WeightSetModal";
import { AddSeanceNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/AddSeanceNavigator.types";
import { Exo } from "#shared/exo/domain/exo.types";
import { workoutControlAtom } from "#shared/store/ongoingWorkout";
import { classicPerfAtom } from "#shared/store/perf.store";
import { Button } from "#shared/view/components/Button/Button";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

type Props = {
  exercise: Exo;
};
export const EnterClassicPerf: React.FC<Props> = ({ exercise }) => {
  const { t } = useTranslation("workouts");
  const [perf, setPerf] = useAtom(classicPerfAtom);
  const theme = useTheme();

  const { navigate } =
    useNavigation<NavigationProp<AddSeanceNavigatorParamList>>();

  const [isEnteringSet, setIsEnteringSet] = useState(false);
  const [isDropsetting, setIsDropsetting] = useState(false);
  const [isEditingRest, setIsEditingRest] = useState(false);
  const [control] = useAtom(workoutControlAtom);
  const { startResting } = useRestTimer();

  const latestPerfRef = useRef(perf);

  useEffect(() => {
    if (!perf) {
      setPerf({
        exo: exercise,
        series: [],
        perfType: "CLASSIC",
        perfId: "",
        rest: 30,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- very ugly way of handling this, but if it depends on perf, it will always reset it
  }, [exercise]);
  useEffect(() => {
    latestPerfRef.current = perf;
  }, [perf]);
  const editSet: (set: Serie, index: number) => void = useCallback(
    (set, index) => {
      setPerf({
        ...perf!,
        series: perf!.series.map((s, i) => (i === index ? set : s)),
      });
    },
    [perf, setPerf]
  );

  const deleteSet: (index: number) => void = useCallback(
    (index) => {
      setPerf({
        ...perf!,
        series: perf!.series.filter((_, i) => i !== index),
      });
    },
    [perf, setPerf]
  );

  const editRestTime = (rest: number) => {
    setPerf({ ...perf!, rest });
  };

  const confirmClassicRest = (time: number) => {
    const castedPerf = latestPerfRef.current!;
    const mutableSets = [...castedPerf.series];
    mutableSets[mutableSets.length - 1].repos = time;

    setPerf({
      ...castedPerf,
      series: mutableSets,
    });
  };

  if (!perf) return null;

  return (
    <Container>
      <Typography.TextL.regular
        color={theme.colors.text500}
        style={{ alignSelf: "center" }}
      >
        {exercise.exoName.toLocaleUpperCase()}
      </Typography.TextL.regular>
      <Spacer.Vertical gap={4} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography.TextS.regular color={theme.colors.text300}>
          {t("newAddWorkout.restBetweenSets", { rest: perf.rest })}
        </Typography.TextS.regular>
        <Spacer.Horizontal gap={16} />
        <Button.Tertiary onPress={() => setIsEditingRest(true)} text="Edit" />
      </View>

      {!!perf.series.length && (
        <TableContainer>
          <TableContentContainer>
            <ClassicSetHeader exoType={exercise.exoType} />
            {perf.series.map((set, index) => {
              return (
                <ClassicSetItem
                  displayRest={!!set.repos}
                  set={set}
                  index={index + 1}
                  key={index}
                  onDelete={() => {
                    deleteSet(index);
                  }}
                  onEdit={(set) => {
                    editSet(set, index);
                  }}
                />
              );
            })}
          </TableContentContainer>
        </TableContainer>
      )}
      {!perf.series.length && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Typography.TextL.regular color={theme.colors.text300}>
            {t("newAddWorkout.noPerformanceYet")}
          </Typography.TextL.regular>
        </View>
      )}
      <View style={{ padding: 8 }}>
        {perf.exo.exoType === "poids" ? (
          <ActionsContainer>
            <Pressable
              onPress={() => {
                setIsDropsetting(true);
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
                    onChange([...value, perf]);
                    navigate("new-workout");
                    setPerf(null);
                  }}
                  disabled={!perf.series.length}
                >
                  {({ pressed }) => (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: !perf.series.length
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
                          !perf.series.length
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

      {exercise.exoType === "poids" && (
        <WeightSetModal
          rest={() => {
            startResting({
              timeInSeconds: perf.rest ?? 30,
              onConfirm: confirmClassicRest,
            });
          }}
          allowWarmup={
            perf.series.length === 0 ||
            (perf.series[perf.series.length - 1].type === "POIDS" &&
              // @ts-expect-error -- new inference due to array filter
              perf.series[perf.series.length - 1].isWarmup)
          }
          closeModal={() => {
            setIsEnteringSet(false);
          }}
          isModalVisible={isEnteringSet}
          onConfirm={(set) => {
            setPerf({ ...perf, series: [...perf.series, set] });
          }}
        />
      )}
      {exercise.exoType === "poids" && (
        <DropsetModal
          rest={() => {
            startResting({
              timeInSeconds: perf.rest ?? 30,
              onConfirm: confirmClassicRest,
            });
          }}
          closeModal={() => {
            setIsDropsetting(false);
          }}
          isModalVisible={isDropsetting}
          onConfirm={(set) => {
            setPerf({ ...perf, series: [...perf.series, set] });
          }}
        />
      )}
      {exercise.exoType === "reps" && (
        <RepSetModal
          rest={() => {
            startResting({
              timeInSeconds: perf.rest ?? 30,
              onConfirm: confirmClassicRest,
            });
          }}
          closeModal={() => {
            setIsEnteringSet(false);
          }}
          isModalVisible={isEnteringSet}
          onConfirm={(set) => {
            setPerf({ ...perf, series: [...perf.series, set] });
          }}
        />
      )}
      {exercise.exoType === "temps" && (
        <TimeSetModal
          rest={() => {
            startResting({
              timeInSeconds: perf.rest ?? 30,
              onConfirm: confirmClassicRest,
            });
          }}
          title="Enter time"
          closeModal={() => {
            setIsEnteringSet(false);
          }}
          isModalVisible={isEnteringSet}
          onConfirm={(set) => {
            setPerf({ ...perf, series: [...perf.series, set] });
          }}
        />
      )}
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

const TableContainer = styled.ScrollView({
  flex: 1,
  padding: 8,
});

const TableContentContainer = styled.View(({ theme }) => ({
  borderRadius: 16,
  borderWidth: 1,
  borderColor: theme.colors.text500,
}));

const ActionsContainer = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 16,
});

const Container = styled.View({ flex: 1 });

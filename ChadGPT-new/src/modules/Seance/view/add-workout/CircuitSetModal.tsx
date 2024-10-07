import { CircuitSet } from "#modules/Seance/domain/serie.types";
import { DropsetModal } from "#modules/Seance/view/add-workout/DropsetModal";
import { RepSetModal } from "#modules/Seance/view/add-workout/RepsSetModal";
import { TimeSetModal } from "#modules/Seance/view/add-workout/TimeSetModal";
import { useRestTimer } from "#modules/Seance/view/add-workout/useRestTimer";
import { WeightSetModal } from "#modules/Seance/view/add-workout/WeightSetModal";
import { Exo } from "#shared/exo/domain/exo.types";
import { circuitSetAtom } from "#shared/store/perf.store";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import React from "react";

type Props = {
  isVisible: boolean;
  closeModal: () => void;
  onAdd: (set: CircuitSet) => void;
  exercise: Exo;
  isDropsetting: boolean;
  hideRest?: boolean;
};

export const CircuitSetModal: React.FC<Props> = React.memo(
  ({ closeModal, exercise, isVisible, onAdd, isDropsetting, hideRest }) => {
    const [perf, setCircuit] = useAtom(circuitSetAtom);
    const latestPerfRef = useRef(perf);
    const { startResting } = useRestTimer();
    useEffect(() => {
      latestPerfRef.current = perf;
    }, [perf]);

    const confirmCircuitRest = (time: number) => {
      const castedCircuit = latestPerfRef.current!;
      const mutableSets = [...castedCircuit.series];
      mutableSets[mutableSets.length - 1].rest = time;

      setCircuit({
        ...castedCircuit,
        series: mutableSets,
      });
    };

    if (!perf) return null;

    return (
      <>
        {exercise.exoType === "poids" && (
          <WeightSetModal
            hideRest={hideRest}
            allowWarmup={false}
            closeModal={closeModal}
            isModalVisible={isVisible && !isDropsetting}
            onConfirm={(set) => {
              onAdd({ exercise, set });
            }}
            rest={() => {
              startResting({
                timeInSeconds: perf.restTime,
                onConfirm: confirmCircuitRest,
              });
            }}
          />
        )}
        {exercise.exoType === "poids" && (
          <DropsetModal
            hideRest={hideRest}
            rest={() => {
              startResting({
                timeInSeconds: perf.restTime,
                onConfirm: confirmCircuitRest,
              });
            }}
            closeModal={closeModal}
            isModalVisible={isDropsetting && isVisible}
            onConfirm={(set) => {
              onAdd({ exercise, set });
            }}
          />
        )}
        {exercise.exoType === "reps" && (
          <RepSetModal
            closeModal={closeModal}
            isModalVisible={isVisible}
            onConfirm={(set) => {
              onAdd({ exercise, set });
            }}
            rest={
              hideRest
                ? undefined
                : () => {
                    startResting({
                      timeInSeconds: perf.restTime,
                      onConfirm: confirmCircuitRest,
                    });
                  }
            }
          />
        )}
        {exercise.exoType === "temps" && (
          <TimeSetModal
            hideRest={hideRest}
            title="Enter time"
            closeModal={closeModal}
            isModalVisible={isVisible}
            onConfirm={(set) => {
              onAdd({ exercise, set });
            }}
            rest={() => {
              startResting({
                timeInSeconds: perf.restTime,
                onConfirm: confirmCircuitRest,
              });
            }}
          />
        )}
      </>
    );
  }
);

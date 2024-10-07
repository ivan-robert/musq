import { Workout } from "#modules/Seance/domain/seance.types";
import { RepSet, TimeSet, WeightSet } from "#modules/Seance/domain/serie.types";
import {
  ClassicRepsItem,
  ClassicTimeItem,
  ClassicWeightItem,
} from "#modules/Seance/view/add-workout/ClassicExerciseItem";
import { SupersetItem } from "#modules/Seance/view/add-workout/SupersetItem";
import { Fragment } from "react";
import { View } from "react-native";

type Props = {
  workout: Workout;
};
export const WorkoutSummary: React.FC<Props> = ({ workout }) => {
  return (
    <View style={{ padding: 8, gap: 8 }}>
      {workout.perfs.map((perf, index) => {
        return (
          <Fragment key={index}>
            {perf.perfType === "CLASSIC" && (
              <Fragment>
                {perf.exo.exoType === "poids" && (
                  <ClassicWeightItem
                    key={perf.exo.exoName + index.toString()}
                    exercise={perf.exo}
                    sets={perf.series as WeightSet[]}
                  />
                )}
                {perf.exo.exoType === "reps" && (
                  <ClassicRepsItem
                    key={perf.exo.exoName + index.toString()}
                    exercise={perf.exo}
                    sets={perf.series as RepSet[]}
                  />
                )}
                {perf.exo.exoType === "temps" && (
                  <ClassicTimeItem
                    key={perf.exo.exoName + index.toString()}
                    exercise={perf.exo}
                    sets={perf.series as TimeSet[]}
                  />
                )}
              </Fragment>
            )}
            {perf.perfType === "CIRCUIT" && (
              <SupersetItem key={index} perf={perf} />
            )}
          </Fragment>
        );
      })}
    </View>
  );
};

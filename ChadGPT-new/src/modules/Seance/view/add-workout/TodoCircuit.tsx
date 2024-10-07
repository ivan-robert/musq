import { Circuit, CircuitTemplate } from "#modules/Seance/domain/perf.types";
import { Serie } from "#modules/Seance/domain/serie.types";
import { getEnhancedColors } from "#modules/Seance/utils/getEnhancedColors";
import { TodoClassicSetItem } from "#modules/Seance/view/add-workout/TodoClassicSetItem";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

type Props = {
  template: CircuitTemplate;
  savedPerf: Circuit | null;
  saveCircuit: (perf: Circuit) => void;
  isDisabled?: boolean;
};
export const TodoCircuit: React.FC<Props> = ({
  template,
  savedPerf,
  saveCircuit,
  isDisabled,
}) => {
  const theme = useTheme();
  const form = useForm<Circuit>({
    defaultValues: {
      exos: template.exos,
      perfId: "",
      perfType: "CIRCUIT",
      restTime: template.rest,
      series: savedPerf ? savedPerf.series : [],
    },
  });

  return (
    <Controller
      control={form.control}
      name="series"
      render={({ field: { value, onChange } }) => {
        return (
          <TableContainer>
            {template.series.map((circuit, index) => {
              const isCircuitValidated =
                savedPerf?.series[index]?.subsets.length ===
                circuit.subsets.length;

              const isDisabledBySets = !savedPerf?.series
                ? index !== 0
                : savedPerf.series[savedPerf.series.length - 1].subsets
                    .length !== savedPerf.exos.length
                ? savedPerf.series.length < index + 1
                : savedPerf.series.length < index;

              const isCircuitDisabled = isDisabled || isDisabledBySets;

              const enhancedColors = getEnhancedColors(
                theme.colors,
                isCircuitValidated ? "validated" : "neutral"
              );
              return (
                <CircuitContainer
                  style={{ borderColor: enhancedColors.text500 }}
                >
                  <View style={{ alignItems: "center", padding: 8 }}>
                    <Typography.TextL.bold color={enhancedColors.text300}>
                      Circuit {index + 1}
                    </Typography.TextL.bold>
                  </View>
                  {circuit.subsets.map((subset, j) => {
                    const addSetToSubset = (set: Serie) => {
                      if (j === 0) {
                        onChange([
                          ...value,
                          {
                            rest: 0,
                            subsets: [{ exercise: subset.exercise, set }],
                          },
                        ]);

                        return saveCircuit(form.getValues());
                      }
                      const newValue = [...value];
                      if (j === template.exos.length - 1) {
                        newValue[newValue.length - 1].rest = set.repos;
                      }
                      newValue[newValue.length - 1].subsets.push({
                        exercise: subset.exercise,
                        set,
                      });
                      onChange(newValue);
                      return saveCircuit(form.getValues());
                    };

                    const editSetInSubset = (set: Serie) => {
                      const newValue = [...value];
                      newValue[index].subsets[j].set = set;
                      if (j === template.exos.length - 1) {
                        newValue[index].rest = set.repos;
                      }

                      onChange(newValue);
                      return saveCircuit(form.getValues());
                    };

                    const handleSetSave = (set: Serie) => {
                      const newValue = [...value];
                      if (newValue?.[index]?.subsets[j]?.set) {
                        return editSetInSubset(set);
                      }
                      return addSetToSubset(set);
                    };

                    const correspondingSavedSubsets =
                      savedPerf?.series[index]?.subsets;

                    const isSetDisabled = !correspondingSavedSubsets
                      ? j !== 0
                      : correspondingSavedSubsets.length < j;

                    return (
                      <TodoClassicSetItem
                        completedSet={
                          (savedPerf?.series[index]?.subsets[j]
                            ?.set as Serie) ?? null
                        }
                        index={j + 1}
                        isDisabled={isCircuitDisabled || isSetDisabled}
                        isPerfValidated={isCircuitValidated}
                        onSaveSet={handleSetSave}
                        restTime={
                          j === template.exos.length - 1 ? template.rest : 0
                        }
                        setTemplate={subset.set}
                        key={j}
                        circuitExercise={subset.exercise}
                      />
                    );
                  })}
                </CircuitContainer>
              );
            })}
          </TableContainer>
        );
      }}
    />
  );
};

const TableContainer = styled.View(({ theme }) => ({
  borderColor: theme.colors.text500,
  borderWidth: 1,
  padding: 8,
  gap: 16,
  borderRadius: 16,
}));

const CircuitContainer = styled.View(({ theme }) => ({
  borderColor: theme.colors.text500,
  borderWidth: 1,
  borderRadius: 16,
}));

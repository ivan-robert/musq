import {
  PreparedSet,
  Serie,
  serieSchema,
} from "#modules/Seance/domain/serie.types";
import { getEnhancedColors } from "#modules/Seance/utils/getEnhancedColors";
import { DropsetModal } from "#modules/Seance/view/add-workout/DropsetModal";
import { SetNumberInput } from "#modules/Seance/view/add-workout/SetNumberInput";
import { TimeSetModal } from "#modules/Seance/view/add-workout/TimeSetModal";
import { useRestTimer } from "#modules/Seance/view/add-workout/useRestTimer";
import { Exo, ExoType } from "#shared/exo/domain/exo.types";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { z } from "zod";

type Props = {
  setTemplate: PreparedSet;
  restTime: number;
  index: number;
  isDisabled: boolean;
  onSaveSet: (set: Serie) => void;
  isPerfValidated: boolean;
  completedSet: Serie | null;
  circuitExercise?: Exo;
};
export const TodoClassicSetItem: React.FC<Props> = React.memo(
  ({
    restTime,
    isDisabled,
    setTemplate,
    index,
    isPerfValidated,
    onSaveSet,
    completedSet,
    circuitExercise,
  }) => {
    const isValidated = !!completedSet;
    const theme = useTheme();
    const enhancedColors = getEnhancedColors(
      theme.colors,
      isDisabled ? "disabled" : isValidated ? "validated" : "neutral"
    );
    const [isTiming, setIsTiming] = useState(false);

    const getWarmupValue = () => {
      if (setTemplate.type !== "POIDS") return undefined;
      return setTemplate.isWarmup ? true : false;
    };

    const form = useForm<z.infer<typeof serieSchema>>({
      defaultValues: {
        type: setTemplate.type,
        repos: 0,
        id: "",
        perfId: "",
        isWarmup: getWarmupValue(),
        echec: false,
        sets: [],
      },
      resolver: zodResolver(serieSchema),
    });

    const formValue = useRef(form.getValues());
    const formValueState = form.watch();

    useEffect(() => {
      formValue.current = formValueState;
    }, [formValueState]);

    const convertSet = (set: Serie): Serie => {
      if (set.type === "TEMPS") {
        return {
          id: "",
          perfId: "",
          repos: +set.repos,
          type: set.type,
          temps: +set.temps,
        };
      }
      if (set.type === "POIDS") {
        return {
          id: "",
          perfId: "",
          repos: +set.repos,
          type: set.type,
          poids: +set.poids,
          echec: set.echec,
          isWarmup: set.isWarmup,
          reps: +set.reps,
        };
      }
      if (set.type === "DROPSET") {
        return {
          id: "",
          perfId: "",
          repos: +set.repos,
          type: set.type,
          sets: set.sets.map((subset) => ({
            poids: +subset.poids,
            reps: +subset.reps,
          })),
        };
      }
      return {
        id: "",
        perfId: "",
        repos: +set.repos,
        type: set.type,
        reps: +set.reps,
        echec: set.echec,
      };
    };

    const convertFormValues = (key: "poids" | "reps" | "temps") => {
      const numberValue = +form.getValues(key);

      if (isNaN(numberValue)) {
        return form.resetField(key);
      }

      form.setValue(key, numberValue);
    };

    const [isDropsetting, setIsDropsetting] = useState(false);
    const [isWeightFocused, setIsWeightFocused] = useState(false);
    const [isRepsFocused, setIsRepsFocused] = useState(false);

    const { startResting } = useRestTimer();

    const time = form.watch("temps");

    return (
      <>
        <HorizontalSeparator
          style={{
            backgroundColor: isPerfValidated
              ? theme.colors.statusSuccess
              : theme.colors.text500,
          }}
        />
        {setTemplate.type === "DROPSET" && (
          <ColumnsContainer>
            <SectionContainer>
              <Typography.TextL.bold color={enhancedColors.text500}>
                {index}
              </Typography.TextL.bold>
            </SectionContainer>
            <VerticalSeparator
              style={{
                backgroundColor: isPerfValidated
                  ? theme.colors.statusSuccess
                  : theme.colors.text500,
              }}
            />
            <SectionContainer style={{ flex: 4 }}>
              <TouchableOpacity
                disabled={isDisabled}
                onPress={() => {
                  setIsDropsetting(true);
                }}
                style={{
                  borderRadius: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  padding: 8,
                  paddingVertical: 4,
                }}
              >
                <Icon
                  size={24}
                  name={isValidated ? "edit" : "play-arrow"}
                  color={enhancedColors.CTA500}
                />
                <Typography.TextM.bold color={enhancedColors.CTA500}>
                  {isValidated ? "edit dropset" : "start dropset"}
                </Typography.TextM.bold>
              </TouchableOpacity>
            </SectionContainer>
          </ColumnsContainer>
        )}

        {setTemplate.type !== "DROPSET" && (
          <ColumnsContainer>
            <SectionContainer>
              <Typography.TextL.bold color={enhancedColors.text500}>
                {setTemplate.type === "POIDS" && setTemplate.isWarmup
                  ? "w-u-"
                  : ""}
                {index}
              </Typography.TextL.bold>
            </SectionContainer>
            <VerticalSeparator
              style={{
                backgroundColor: isPerfValidated
                  ? theme.colors.statusSuccess
                  : theme.colors.text500,
              }}
            />
            {setTemplate.type !== "TEMPS" && (
              <SectionContainer
                style={
                  !!circuitExercise && setTemplate.type === "REPS"
                    ? { flex: 2 }
                    : undefined
                }
              >
                <Controller
                  control={form.control}
                  name="reps"
                  render={({ field: { onChange, value } }) => (
                    <SetNumberInput
                      value={value?.toString()}
                      isValidated={isValidated}
                      editable={!isDisabled}
                      isFocused={isRepsFocused}
                      onFocus={() => {
                        setIsRepsFocused(true);
                      }}
                      onChangeText={onChange}
                      placeholder={
                        completedSet?.type === "POIDS" ||
                        completedSet?.type === "REPS"
                          ? completedSet.reps.toString()
                          : setTemplate.reps?.toString()
                      }
                      onBlur={() => {
                        setIsRepsFocused(false);
                        convertFormValues("reps");
                      }}
                    />
                  )}
                />
              </SectionContainer>
            )}
            {setTemplate.type === "TEMPS" && (
              <SectionContainer
                style={circuitExercise ? { flex: 4 } : undefined}
              >
                {!time && (
                  <TouchableOpacity
                    disabled={isDisabled}
                    onPress={() => {
                      setIsTiming(true);
                    }}
                  >
                    <Icon
                      name="timer"
                      size={24}
                      color={enhancedColors.CTA500}
                    />
                  </TouchableOpacity>
                )}
                {time && (
                  <TouchableOpacity
                    disabled={isDisabled}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onPress={() => {
                      setIsTiming(true);
                    }}
                  >
                    <Icon name="edit" size={24} color={enhancedColors.CTA500} />
                    <Typography.TextM.bold color={enhancedColors.CTA500}>
                      {time}
                    </Typography.TextM.bold>
                  </TouchableOpacity>
                )}
              </SectionContainer>
            )}
            {setTemplate.type === "POIDS" && (
              <>
                <VerticalSeparator
                  style={{
                    backgroundColor: isPerfValidated
                      ? theme.colors.statusSuccess
                      : theme.colors.text500,
                  }}
                />
                <SectionContainer>
                  <Controller
                    control={form.control}
                    name="poids"
                    render={({ field: { onChange, value } }) => (
                      <SetNumberInput
                        editable={!isDisabled}
                        isFocused={isWeightFocused}
                        onFocus={() => {
                          setIsWeightFocused(true);
                        }}
                        value={value?.toString()}
                        placeholder={
                          completedSet?.type === "POIDS"
                            ? completedSet.poids.toString()
                            : undefined
                        }
                        onChangeText={onChange}
                        isValidated={isValidated}
                        onBlur={() => {
                          setIsWeightFocused(false);
                          convertFormValues("poids");
                        }}
                      />
                    )}
                  />
                </SectionContainer>
              </>
            )}
            {setTemplate.type !== "TEMPS" && (
              <>
                <VerticalSeparator
                  style={{
                    backgroundColor: isPerfValidated
                      ? theme.colors.statusSuccess
                      : theme.colors.text500,
                  }}
                />
                <SectionContainer style={{ justifyContent: "center" }}>
                  {setTemplate.echec ? (
                    <Controller
                      control={form.control}
                      name="echec"
                      render={({ field: { onChange, value } }) => (
                        <TouchableOpacity onPress={() => onChange(!value)}>
                          <Icon
                            name={value ? "check" : "clear"}
                            color={
                              value
                                ? theme.colors.statusSuccess
                                : enhancedColors.text500
                            }
                          />
                        </TouchableOpacity>
                      )}
                    />
                  ) : (
                    <Typography.TextS.regular
                      color={enhancedColors.text500}
                      style={{ margin: 4, textAlign: "center" }}
                    >
                      Not needed
                    </Typography.TextS.regular>
                  )}
                </SectionContainer>
              </>
            )}
            <VerticalSeparator
              style={{
                backgroundColor: isPerfValidated
                  ? theme.colors.statusSuccess
                  : theme.colors.text500,
              }}
            />
            {setTemplate.type !== "TEMPS" && (
              <ActionsContainer>
                <TouchableOpacity
                  onPress={() => {
                    const formValues = form.getValues();
                    convertFormValues("reps");
                    convertFormValues("poids");
                    if (restTime === 0) {
                      return onSaveSet(convertSet(formValues));
                    }
                    startResting({
                      timeInSeconds: restTime,
                      onConfirm: (time) => {
                        form.handleSubmit(() => {
                          onSaveSet(convertSet({ ...formValues, repos: time }));
                        })();
                      },
                    });
                  }}
                >
                  <Icon color={enhancedColors.text500} name="check" />
                </TouchableOpacity>
              </ActionsContainer>
            )}
          </ColumnsContainer>
        )}
        {!!restTime && (
          <>
            <HorizontalSeparator
              style={{
                backgroundColor: isPerfValidated
                  ? theme.colors.statusSuccess
                  : theme.colors.text500,
              }}
            />
            <View style={{ alignItems: "center", padding: 4 }}>
              <Typography.TextM.regular color={enhancedColors.text500}>
                rest: {restTime}s
              </Typography.TextM.regular>
            </View>
          </>
        )}
        {setTemplate.type === "DROPSET" && (
          <DropsetModal
            closeModal={() => {
              setIsDropsetting(false);
            }}
            isModalVisible={isDropsetting}
            onConfirm={(set) => {
              if (!set.sets.length) return;
              form.setValue("sets", set.sets);
              onSaveSet(set);
            }}
            hideRest={!restTime}
            rest={(set) => {
              startResting({
                timeInSeconds: restTime,
                onConfirm: (time) => {
                  form.setValue("repos", time);
                  form.handleSubmit(() => {
                    onSaveSet(convertSet({ ...set, repos: time }));
                  })();
                },
              });
            }}
          />
        )}

        {setTemplate.type === "TEMPS" && (
          <Controller
            control={form.control}
            name="temps"
            render={({ field: { onChange } }) => (
              <TimeSetModal
                closeModal={() => setIsTiming(false)}
                isModalVisible={isTiming}
                onConfirm={(set) => {
                  onChange(set.temps);
                  form.handleSubmit(() => {
                    onSaveSet(
                      convertSet({
                        ...form.getValues(),
                        repos: completedSet?.repos ?? 0,
                      })
                    );
                  })();
                }}
                hideRest={!restTime || isValidated}
                rest={(set) => {
                  onChange(set.temps);
                  startResting({
                    timeInSeconds: restTime,
                    onConfirm: (time) => {
                      const formValues = form.getValues();
                      convertFormValues("temps");
                      form.handleSubmit(() => {
                        onSaveSet(convertSet({ ...formValues, repos: time }));
                      })();
                    },
                  });
                }}
                title="Chrono"
              />
            )}
          />
        )}
      </>
    );
  }
);

type ClassicSetHeaderProps = {
  exoType: ExoType;
  isValidated?: boolean;
};

export const ClassicSetHeader: React.FC<ClassicSetHeaderProps> = ({
  exoType,
  isValidated,
}) => {
  const theme = useTheme();
  const enhancedColors = getEnhancedColors(
    theme.colors,
    isValidated ? "validated" : "neutral"
  );
  return (
    <ColumnsContainer>
      <HeaderTextContainer>
        <Typography.TextM.bold color={enhancedColors.text500}>
          Set
        </Typography.TextM.bold>
      </HeaderTextContainer>
      <VerticalSeparator style={{ backgroundColor: enhancedColors.text500 }} />
      {exoType === "temps" && (
        <HeaderTextContainer>
          <Typography.TextM.bold color={enhancedColors.text500}>
            Time
          </Typography.TextM.bold>
        </HeaderTextContainer>
      )}
      {exoType !== "temps" && (
        <HeaderTextContainer>
          <Typography.TextM.bold color={enhancedColors.text500}>
            Reps
          </Typography.TextM.bold>
        </HeaderTextContainer>
      )}
      {exoType === "poids" && (
        <>
          <VerticalSeparator
            style={{ backgroundColor: enhancedColors.text500 }}
          />
          <HeaderTextContainer>
            <Typography.TextM.bold color={enhancedColors.text500}>
              Weight
            </Typography.TextM.bold>
          </HeaderTextContainer>
        </>
      )}
      {exoType !== "temps" && (
        <>
          <VerticalSeparator
            style={{ backgroundColor: enhancedColors.text500 }}
          />
          <HeaderTextContainer>
            <Typography.TextM.bold color={enhancedColors.text500}>
              To failure?
            </Typography.TextM.bold>
          </HeaderTextContainer>
        </>
      )}
      {exoType !== "temps" && (
        <>
          <VerticalSeparator
            style={{ backgroundColor: enhancedColors.text500 }}
          />
          <ActionsContainer />
        </>
      )}
    </ColumnsContainer>
  );
};

const ColumnsContainer = styled.View({
  flexDirection: "row",
});

const SectionContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  paddingVertical: 8,
});

const ActionsContainer = styled.View({
  flexDirection: "row",
  gap: 8,
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
});

const VerticalSeparator = styled.View(({ theme }) => ({
  width: 1,
  backgroundColor: theme.colors.text500,
}));

const HeaderTextContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
});

const HorizontalSeparator = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.text500,
}));

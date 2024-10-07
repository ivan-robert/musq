import {
  Dropset,
  RepSet,
  TimeSet,
  WeightSet,
} from "#modules/Seance/domain/serie.types";
import { Exo } from "#shared/exo/domain/exo.types";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type ClassicWeightItemProps = {
  exercise: Exo;
  sets: (WeightSet | Dropset)[];
};

export const ClassicWeightItem: React.FC<ClassicWeightItemProps> = ({
  exercise,
  sets,
}) => {
  const { t } = useTranslation("workouts");
  const theme = useTheme();
  return (
    <TableContainer>
      <View style={{ flexDirection: "row" }}>
        <Typography.TextL.bold color={theme.colors.text300}>
          {exercise.exoName}
        </Typography.TextL.bold>
      </View>
      <Spacer.Vertical gap={8} />
      {sets.map((set, index) => {
        if (set.type === "POIDS")
          return (
            <View style={{ flexDirection: "row" }}>
              <Typography.TextM.regular color={theme.colors.text500}>
                {t("newAddWorkout.setIndex", { index: index + 1 })} {set.reps} x{" "}
                {set.poids} kg{" "}
                {set.isWarmup && `(${t("newAddWorkout.warmup")})`}
                {set.echec && `(${t("newAddWorkout.failure")})`}
              </Typography.TextM.regular>
              <Spacer.Flex />
              {!!set.repos && (
                <Typography.TextL.regular color={theme.colors.text500}>
                  {t("newAddWorkout.restDisplay", { time: set.repos })}
                </Typography.TextL.regular>
              )}
            </View>
          );
        if (set.type === "DROPSET") {
          return (
            <View>
              <View style={{ flexDirection: "row" }}>
                <Typography.TextM.regular color={theme.colors.text300}>
                  {t("newAddWorkout.setIndex", { index: index + 1 })}
                </Typography.TextM.regular>
                <Spacer.Flex />
                {!!set.repos && (
                  <Typography.TextL.regular color={theme.colors.text500}>
                    {t("newAddWorkout.restDisplay", { time: set.repos })}
                  </Typography.TextL.regular>
                )}
              </View>
              <Spacer.Vertical gap={4} />
              {set.sets.map((subset, i) => {
                return (
                  <View style={{ flexDirection: "row" }} key={i}>
                    <Spacer.Horizontal gap={8} />
                    <Typography.TextM.regular color={theme.colors.text500}>
                      {i + 1}: {subset.reps} x {subset.poids} kg
                    </Typography.TextM.regular>
                  </View>
                );
              })}
            </View>
          );
        }
      })}
    </TableContainer>
  );
};

type ClassicRepsItemProps = {
  exercise: Exo;
  sets: RepSet[];
};

export const ClassicRepsItem: React.FC<ClassicRepsItemProps> = ({
  exercise,
  sets,
}) => {
  const theme = useTheme();
  const { t } = useTranslation("workouts");
  return (
    <TableContainer>
      <View style={{ flexDirection: "row" }}>
        <Typography.TextL.bold color={theme.colors.text300}>
          {exercise.exoName}
        </Typography.TextL.bold>
      </View>
      <Spacer.Vertical gap={8} />
      {sets.map((set, index) => {
        return (
          <View style={{ flexDirection: "row" }}>
            <Text>
              <Typography.TextM.regular color={theme.colors.text300}>
                {t("newAddWorkout.setIndex", { index: index + 1 })}
              </Typography.TextM.regular>
              <Typography.TextM.regular color={theme.colors.text500}>
                {set.reps} {t("newAddWorkout.modals.reps")}{" "}
                {set.echec && `(${t("newAddWorkout.failure")})`}
              </Typography.TextM.regular>
            </Text>
            <Spacer.Flex />
            {!!set.repos && (
              <Typography.TextL.regular color={theme.colors.text500}>
                {t("newAddWorkout.restDisplay", { time: set.repos })}
              </Typography.TextL.regular>
            )}
          </View>
        );
      })}
    </TableContainer>
  );
};

type ClassicTimeItemProps = {
  exercise: Exo;
  sets: TimeSet[];
};

export const ClassicTimeItem: React.FC<ClassicTimeItemProps> = ({
  exercise,
  sets,
}) => {
  const theme = useTheme();
  const { t } = useTranslation("workouts");
  return (
    <TableContainer>
      <View style={{ flexDirection: "row" }}>
        <Typography.TextL.bold color={theme.colors.text300}>
          {exercise.exoName}
        </Typography.TextL.bold>
      </View>
      <Spacer.Vertical gap={8} />
      {sets.map((set, index) => {
        return (
          <View style={{ flexDirection: "row" }}>
            <Typography.TextL.regular color={theme.colors.text500}>
              {t("newAddWorkout.setIndex", { index: index + 1 })}
              {set.temps}s
            </Typography.TextL.regular>
            <Spacer.Flex />
            {!!set.repos && (
              <Typography.TextL.regular color={theme.colors.text500}>
                {t("newAddWorkout.restDisplay", { time: set.repos })}
              </Typography.TextL.regular>
            )}
          </View>
        );
      })}
    </TableContainer>
  );
};

const TableContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.primary500,
  borderRadius: 16,
  padding: 16,
}));

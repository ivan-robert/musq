import { Circuit } from "#modules/Seance/domain/perf.types";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Fragment } from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next"; // Import useTranslation

type Props = {
  perf: Circuit;
};

export const SupersetItem: React.FC<Props> = ({ perf }) => {
  const theme = useTheme();
  const { t } = useTranslation("workouts"); // Initialize t with 'workouts' namespace

  return (
    <SupersetContainer>
      <Typography.TitleM.bold color={theme.colors.text300}>
        {t("supersetItem.superset")}
      </Typography.TitleM.bold>
      <Typography.TextS.regular color={theme.colors.text300}>
        {perf.exos.map((exo) => exo.exoName).join(" - ")}
      </Typography.TextS.regular>

      <Spacer.Vertical gap={16} />

      {perf.series.map((circuit, i) => (
        <View key={i}>
          <View style={{ alignItems: "center" }}>
            <Typography.TextL.bold color={theme.colors.text300}>
              {t("supersetItem.circuit", { number: i + 1 })}
            </Typography.TextL.bold>
          </View>
          <Spacer.Vertical gap={4} />
          {circuit.subsets.map((set, j) => (
            <Fragment key={j}>
              {set.set.type === "DROPSET" ? (
                <>
                  <Typography.TextM.regular color={theme.colors.text300}>
                    {t("supersetItem.exerciseDropset", {
                      exercise: set.exercise.exoName,
                    })}
                  </Typography.TextM.regular>
                  <DropsetContainer>
                    {set.set.sets.map((dropset, k) => (
                      <Fragment key={k}>
                        <Typography.TextM.regular color={theme.colors.text500}>
                          {t("supersetItem.setDetails", {
                            number: k + 1,
                            reps: dropset.reps,
                            poids: dropset.poids,
                          })}
                        </Typography.TextM.regular>
                      </Fragment>
                    ))}
                  </DropsetContainer>
                </>
              ) : (
                <Text>
                  {set.set.type === "REPS" && (
                    <Typography.TextM.regular color={theme.colors.text300}>
                      {t("supersetItem.exerciseReps", {
                        exercise: set.exercise.exoName,
                        reps: set.set.reps,
                      })}
                    </Typography.TextM.regular>
                  )}
                  {set.set.type === "TEMPS" && (
                    <Typography.TextM.regular color={theme.colors.text300}>
                      {t("supersetItem.exerciseTime", {
                        exercise: set.exercise.exoName,
                        temps: set.set.temps,
                      })}
                    </Typography.TextM.regular>
                  )}
                  {set.set.type === "POIDS" && (
                    <Typography.TextM.regular color={theme.colors.text300}>
                      {t("supersetItem.exerciseWeight", {
                        exercise: set.exercise.exoName,
                        reps: set.set.reps,
                        poids: set.set.poids,
                      })}
                    </Typography.TextM.regular>
                  )}
                </Text>
              )}
            </Fragment>
          ))}
          <Spacer.Vertical gap={16} />
          {!!circuit.rest && (
            <RestContainer>
              <Typography.TextM.regular color={theme.colors.text300}>
                {t("supersetItem.restTime", { rest: circuit.rest })}
              </Typography.TextM.regular>
            </RestContainer>
          )}
          <Spacer.Vertical gap={16} />
        </View>
      ))}
    </SupersetContainer>
  );
};

const SupersetContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.primary500,
  borderRadius: 10,
  padding: 16,
}));

const DropsetContainer = styled.View({
  padding: 8,
  gap: 4,
});

const RestContainer = styled.View({
  padding: 8,
  flexDirection: "row",
  alignItems: "center",
});

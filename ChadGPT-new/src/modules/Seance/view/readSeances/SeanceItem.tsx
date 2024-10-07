import styled from "@emotion/native";
import { Typography } from "../../../../shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { ShowArrowIcon } from "../../../../shared/icons/ShowArrowIcon";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { useTranslation } from "react-i18next";
import { Workout } from "#modules/Seance/domain/seance.types";
import { DateTime } from "luxon";

type SeanceItemProps = {
  seance: Workout;
  isHighlighted?: boolean;
};

export const SeanceItem = ({ seance, isHighlighted }: SeanceItemProps) => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  const theme = useTheme();
  const { t } = useTranslation("workouts");

  return (
    <SeanceItemContainer
      onPress={() => navigate("SeanceDetails", { seanceId: seance.id! })}
      isHighlighted={isHighlighted}
    >
      <ContentView>
        <Typography.TextL.regular color={theme.colors.text500}>
          {t("workout.workoutFromThe")}{" "}
          {`${DateTime.fromISO(seance.startDate).toLocaleString()}`}
        </Typography.TextL.regular>
        <Typography.TextL.regular color={theme.colors.text300}>
          {t("workout.targets", {
            targets: `${seance.types.join(", ")}`,
          })}
        </Typography.TextL.regular>
        <Typography.TextM.regular color={theme.colors.text200}>
          {t("workout.numberOfExercises", { count: seance.perfs.length })}
        </Typography.TextM.regular>
      </ContentView>
      <ArrowView>
        <ShowArrowIcon
          color={isHighlighted ? theme.colors.CTA500 : theme.colors.grey300}
        />
      </ArrowView>
    </SeanceItemContainer>
  );
};

const SeanceItemContainer = styled.Pressable<{ isHighlighted?: boolean }>(
  ({ theme, isHighlighted }) => ({
    backgroundColor: theme.colors.primary300,
    padding: 16,
    borderRadius: 8,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: isHighlighted ? theme.colors.CTA500 : "transparent",
  })
);

const ContentView = styled.View({ flex: 1 });

const ArrowView = styled.View({ width: 24, height: 24 });

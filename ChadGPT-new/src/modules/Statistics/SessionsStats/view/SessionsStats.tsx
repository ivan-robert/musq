import { adaptRepartitionToPoints } from "#modules/Statistics/SessionsStats/utils/adaptRepartitionToPoints";
import { useSessionsStats } from "#modules/Statistics/SessionsStats/view/useSessionsStats";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { RadarChart } from "#shared/view/components/RadarChart/RadarChart";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

type Props = {
  referenceDate: DateTime;
};

export const SessionsStats: React.FC<Props> = ({ referenceDate }) => {
  const { t } = useTranslation("statistics");
  const startOfMonth = referenceDate.startOf("month");
  const endOfMonth = referenceDate.endOf("month");
  const { data: monthStats } = useSessionsStats(
    startOfMonth.toJSDate(),
    endOfMonth.toJSDate()
  );
  const theme = useTheme();

  if (!monthStats) {
    return null;
  }

  const monthStatsData = adaptRepartitionToPoints(monthStats.muscle_repartion);

  const numberOfHours = Math.floor(monthStats.total_training_time / 3600);
  const numberOfMinutes = Math.floor(
    (monthStats.total_training_time % 3600) / 60
  );

  const averageNumberOfHours = Math.floor(
    monthStats.average_training_time / 3600
  );
  const averageNumberOfMinutes = Math.floor(
    (monthStats.average_training_time % 3600) / 60
  );

  if (monthStats.total_training_time === 0) {
    return (
      <NoStatsPlaceHolder
        isCurrentMonth={DateTime.now().startOf("month").equals(startOfMonth)}
      />
    );
  }

  return (
    <Container contentContainerStyle={{ paddingBottom: 24, paddingTop: 16 }}>
      <ChartContainer>
        <Typography.TitleL.bold color={theme.colors.text500}>
          {t("monthRecap.muscleRepartition")}
        </Typography.TitleL.bold>
        <RadarChart data={monthStatsData} />
      </ChartContainer>
      <Separator />
      <StatsSectionContainer>
        <Typography.TitleL.bold color={theme.colors.text500}>
          {t("monthRecap.thisMonth")}
        </Typography.TitleL.bold>

        <Spacer.Vertical gap={16} />
        <StatContainer>
          <Typography.HeadlineL.bold color={theme.colors.text500}>
            {monthStats.number_of_sessions}
          </Typography.HeadlineL.bold>
          <Typography.TextL.regular color={theme.colors.text500}>
            {t("monthRecap.workouts")}
          </Typography.TextL.regular>
        </StatContainer>

        <Typography.TextS.regular color={theme.colors.text500}>
          {t("monthRecap.withTotal")}
        </Typography.TextS.regular>

        <StatContainer>
          {numberOfHours > 0 && (
            <>
              <Typography.HeadlineL.bold color={theme.colors.text500}>
                {numberOfHours}
              </Typography.HeadlineL.bold>
              <Typography.TextL.bold color={theme.colors.text500}>
                h
              </Typography.TextL.bold>
            </>
          )}
          {(!!numberOfMinutes || !numberOfHours) && (
            <>
              <Typography.HeadlineL.bold color={theme.colors.text500}>
                {numberOfMinutes}
              </Typography.HeadlineL.bold>
              <Typography.TextL.bold color={theme.colors.text500}>
                min
              </Typography.TextL.bold>
            </>
          )}
          <Typography.TextL.regular color={theme.colors.text500}>
            {t("monthRecap.ofTraining")}
          </Typography.TextL.regular>
        </StatContainer>

        <Typography.TextS.regular color={theme.colors.text500}>
          {t("monthRecap.soOnAverage")}
        </Typography.TextS.regular>

        <StatContainer>
          {(!!numberOfMinutes || !numberOfHours) && (
            <>
              <Typography.HeadlineL.bold color={theme.colors.text500}>
                {averageNumberOfHours}
              </Typography.HeadlineL.bold>
              <Typography.TextL.bold color={theme.colors.text500}>
                h
              </Typography.TextL.bold>
            </>
          )}
          {averageNumberOfMinutes > 0 && (
            <>
              <Typography.HeadlineL.bold color={theme.colors.text500}>
                {averageNumberOfMinutes}
              </Typography.HeadlineL.bold>
              <Typography.TextL.bold color={theme.colors.text500}>
                min
              </Typography.TextL.bold>
            </>
          )}
          <Typography.TextL.regular color={theme.colors.text500}>
            {t("monthRecap.perWorkout")}
          </Typography.TextL.regular>
        </StatContainer>
      </StatsSectionContainer>
    </Container>
  );
};

type PlaceHolderProps = {
  isCurrentMonth: boolean;
};

const NoStatsPlaceHolder = ({ isCurrentMonth }: PlaceHolderProps) => {
  const { t } = useTranslation("statistics");
  const theme = useTheme();
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();

  return (
    <CenteredView>
      <Typography.TextL.regular color={theme.colors.text500}>
        {t("monthRecap.youHaveNotTrained")}
      </Typography.TextL.regular>
      <Spacer.Vertical gap={16} />
      {isCurrentMonth && (
        <Button
          onPress={() => navigate("AddSeancePage")}
          radius={16}
          color={theme.colors.CTA500}
        >
          <Typography.TextS.regular color={theme.colors.text500}>
            {t("monthRecap.startWorkout")}
          </Typography.TextS.regular>
        </Button>
      )}
    </CenteredView>
  );
};

const ChartContainer = styled.View({
  alignItems: "center",
  justifyContent: "center",
  marginVertical: 16,
});

const CenteredView = styled.View({
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
});

const Separator = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.grey100,
}));

const Container = styled.ScrollView({
  flex: 1,
});

const StatContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
});

const StatsSectionContainer = styled.View({
  flex: 1,
  padding: 16,
  alignItems: "center",
});

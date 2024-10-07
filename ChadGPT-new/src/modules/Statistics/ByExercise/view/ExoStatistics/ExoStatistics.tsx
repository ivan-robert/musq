import { useExoStats } from "#modules/Statistics/ByExercise/view/ExoStatistics/useExoStats";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";

import { ExoCardsSection } from "#modules/Statistics/ByExercise/view/ExoStatistics/ExoCardsSection";
import { useOfficialExosContext } from "#shared/exo/view/OfficialExos.context";
import {
  TimeFrame,
  computeTimeFrame,
} from "#modules/Statistics/ByExercise/utils/computeTimeFrame";
import { Switch } from "@rneui/base";
import { useTranslation } from "react-i18next";
import { NewPerfBarChart } from "#modules/Statistics/ByExercise/view/ExoStatistics/PerfBarChart/NewPerfBarChart";
import { adaptPoint } from "#modules/Statistics/ByExercise/utils/adaptPoint";
import { featureFlags } from "#app/featureFlags";
import { ScrollView } from "#shared/view/components/ScrollView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
  exoId: string;
};

export const ExoStatistics: React.FC<Props> = ({ exoId }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("week");
  const { startDate, endDate } = computeTimeFrame(timeFrame, new Date());
  const {
    data: exoStats,
    refetch,
    isPending,
    isRefetching,
  } = useExoStats(exoId, startDate, endDate);
  const exos = useOfficialExosContext();
  const { t } = useTranslation("statistics");
  const [showIntensity, setShowIntensity] = useState<boolean>(false);
  const [showFailures, setShowFailures] = useState<boolean>(false);
  const { bottom } = useSafeAreaInsets();
  const height = useBottomTabBarHeight();

  const theme = useTheme();

  useEffect(() => {
    refetch();
  }, [timeFrame, refetch]);

  if (exoStats === "NO_DATA") {
    return (
      <View style={{ padding: 12, flex: 1 }}>
        <TimeFrameSelector
          timeFrame={timeFrame}
          onTimeFramePress={setTimeFrame}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Typography.TitleM.regular color={theme.colors.text500}>
            {t("exerciseStats.noData")}
          </Typography.TitleM.regular>
        </View>
      </View>
    );
  }

  return (
    <Container contentContainerStyle={{ paddingBottom: height + bottom }}>
      <ChartSectionContainer>
        <TimeFrameSelector
          timeFrame={timeFrame}
          onTimeFramePress={setTimeFrame}
        />
        <Spacer.Vertical gap={16} />
        <NewPerfBarChart
          showIntensity={showIntensity}
          timeserie={exoStats.timeserie.map(adaptPoint)}
          exo={exos[exoId]}
          showFailures={showFailures}
          isLoading={isPending || isRefetching}
        />
        <Spacer.Vertical gap={8} />
        <SwitchRowContainer>
          {featureFlags.showIntensity && (
            <>
              <SwitchContainer>
                <Switch
                  thumbColor={theme.colors.grey200}
                  color={theme.colors.CTA300}
                  value={showIntensity}
                  onChange={(event) => {
                    setShowIntensity(event.nativeEvent.value);
                  }}
                />
                <Typography.TextS.regular
                  color={theme.colors.text500}
                  style={{ flexShrink: 1 }}
                >
                  {t("exerciseStats.displayIntensity")}
                </Typography.TextS.regular>
              </SwitchContainer>
              <Spacer.Horizontal gap={16} />
            </>
          )}
          {exos[exoId].exoType !== "temps" ? (
            <SwitchContainer>
              <Switch
                thumbColor={theme.colors.grey200}
                color={theme.colors.CTA300}
                value={showFailures}
                onChange={(event) => {
                  setShowFailures(event.nativeEvent.value);
                }}
              />
              <Typography.TextS.regular
                color={theme.colors.text500}
                style={{ flexShrink: 1 }}
              >
                {t("exerciseStats.displayFailures")}
              </Typography.TextS.regular>
            </SwitchContainer>
          ) : null}
        </SwitchRowContainer>
      </ChartSectionContainer>

      <Typography.TitleM.bold
        color={theme.colors.text500}
        style={{ paddingHorizontal: 16 }}
      >
        {t("exerciseStats.statisticsForThisTimeframe")}
      </Typography.TitleM.bold>
      <Spacer.Vertical gap={8} />
      <ExoCardsSection stats={exoStats} />
    </Container>
  );
};

const TimeFrameSelector = ({
  timeFrame,
  onTimeFramePress,
}: {
  timeFrame: TimeFrame;
  onTimeFramePress: (timeFrame: TimeFrame) => void;
}) => {
  const { t } = useTranslation("statistics");
  const theme = useTheme();
  return (
    <TimeframeRow>
      <TimeFrameButton
        isSelected={timeFrame === "week"}
        onPress={() => {
          onTimeFramePress("week");
        }}
      >
        <Typography.TextS.regular color={theme.colors.black}>
          {t("exerciseStats.oneWeek")}
        </Typography.TextS.regular>
      </TimeFrameButton>
      <TimeFrameButton
        isSelected={timeFrame === "month"}
        onPress={() => {
          onTimeFramePress("month");
        }}
      >
        <Typography.TextS.regular color={theme.colors.black}>
          {t("exerciseStats.oneMonth")}
        </Typography.TextS.regular>
      </TimeFrameButton>
      <TimeFrameButton
        isSelected={timeFrame === "year"}
        onPress={() => {
          onTimeFramePress("year");
        }}
      >
        <Typography.TextS.regular color={theme.colors.black}>
          {t("exerciseStats.oneYear")}
        </Typography.TextS.regular>
      </TimeFrameButton>
    </TimeframeRow>
  );
};

const Container = styled(ScrollView)({
  flexGrow: 1,
});

const ChartSectionContainer = styled.View({
  padding: 12,
  height: SCREEN_WIDTH * 0.8,
});

const TimeframeRow = styled.View({
  flexDirection: "row",
  gap: 16,
});

const TimeFrameButton = styled.Pressable<{ isSelected: boolean }>(
  ({ theme, isSelected }) => ({
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    backgroundColor: isSelected ? theme.colors.CTA300 : theme.colors.grey300,
    alignItems: "center",
  })
);

const SwitchRowContainer = styled.View({
  flexDirection: "row",
  gap: 32,
});

const SwitchContainer = styled.View({
  flexDirection: "row",
  gap: 8,
  alignItems: "center",
  flex: 1,
});

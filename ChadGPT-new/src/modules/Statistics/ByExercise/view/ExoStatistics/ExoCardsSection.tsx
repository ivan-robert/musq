import { ExoStats } from "#modules/Statistics/ByExercise/domain/exostats.types";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { View, ViewStyle } from "react-native";
import { LinearGradient, Path, Rect, Stop, Svg } from "react-native-svg";

type Props = {
  stats: ExoStats;
};

export const ExoCardsSection: React.FC<Props> = ({ stats }) => {
  const theme = useTheme();
  const { t } = useTranslation("statistics");
  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 16,
          padding: 16,
          justifyContent: "space-evenly",
        }}
      >
        <XLStatCard
          title={t("exerciseStats.totalVolume")}
          value={`${stats.stats.total_volume.value} ${stats.stats.total_volume.unit}`}
          containerStyle={{
            backgroundColor: theme.colors.CTA300,
            padding: 0,
          }}
        />
        <StatCard
          title={t("exerciseStats.PR")}
          value={`${stats.stats.pr.value} ${stats.stats.pr.unit}`}
        />
        <StatCard
          title={t("exerciseStats.averageIntensity")}
          value={`${stats.stats.average_intensity}%`}
          containerStyle={{ flex: 1 }}
        />
        <StatCard
          containerStyle={{ flex: 1 }}
          title={t("exerciseStats.averageRest")}
          value={`${stats.stats.average_rest_time} s`}
        />
        <StatCard
          containerStyle={{ flex: 1 }}
          title={t("exerciseStats.numberOfFailures")}
          value={`${stats.stats.number_of_failures}`}
        />

        <StatCard
          title={t("exerciseStats.numberOfNewPRs")}
          value={`${stats.stats.number_of_new_pr}`}
        />
      </View>
    </Container>
  );
};

const StatCard = ({
  title,
  value,
  containerStyle,
}: {
  title: string;
  value: string;
  containerStyle?: ViewStyle;
}) => {
  const theme = useTheme();
  return (
    <StatsCardContainer
      style={{
        ...containerStyle,
        minWidth: 100,
      }}
    >
      <Typography.TextM.regular color={theme.colors.grey300}>
        {title}
      </Typography.TextM.regular>
      <Spacer.Vertical gap={4} />
      <Typography.TitleM.bold color={theme.colors.black}>
        {value}
      </Typography.TitleM.bold>
    </StatsCardContainer>
  );
};

const XLStatCard = ({
  title,
  value,
  containerStyle,
}: {
  title: string;
  value: string;
  containerStyle?: ViewStyle;
}) => {
  const theme = useTheme();
  return (
    <StatsCardContainer style={{ ...containerStyle, overflow: "hidden" }}>
      <Svg style={{ position: "absolute" }}>
        <LinearGradient id="gradCard" x1="0" y1="0" x2="100%" y2="100%">
          <Stop offset="0" stopColor={theme.colors.white} stopOpacity="1" />
          <Stop offset="0.5" stopColor={theme.colors.CTA300} stopOpacity="1" />
        </LinearGradient>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#gradCard)"
          fillOpacity={1}
          rx={12}
        />
        <Path
          d="M 0 100 L 3 97 L 6 94 L 10 91 L 15 87 L 20 84 L 24 82 L 26 78 L 30 75 L 34 70 L 39 67 L 43 64 L 45 58 L 48 53 L 52 48 L 60 40 L 64 31 L 73 25 L 80 13 L 94 6 L 100 0"
          stroke={theme.colors.primary200}
          strokeWidth={2}
          strokeOpacity={0.5}
          fill={"none"}
        />
      </Svg>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 32,
        }}
      >
        <Typography.TextL.regular color={theme.colors.black}>
          {title}
        </Typography.TextL.regular>
        <Spacer.Vertical gap={4} />
        <Typography.HeadlineL.bold color={theme.colors.black}>
          {value}
        </Typography.HeadlineL.bold>
      </View>
    </StatsCardContainer>
  );
};

const StatsCardContainer = styled.View(({ theme }) => ({
  padding: 16,
  borderRadius: 12,
  backgroundColor: theme.colors.white,
  justifyContent: "center",
  alignItems: "center",
}));

const Container = styled.View({});

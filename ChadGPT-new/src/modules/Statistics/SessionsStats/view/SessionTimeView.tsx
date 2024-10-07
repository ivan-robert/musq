import { CARD_WIDTH } from "#modules/Statistics/SessionsStats/utils/constants";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export const SessionTimeView = ({
  totalTime,
  previousTotalTime,
}: {
  totalTime: number;
  previousTotalTime: number;
}) => {
  const { t } = useTranslation("statistics");
  const theme = useTheme();
  const unit = totalTime >= 3600 ? "h" : totalTime >= 60 ? "min" : "s";
  const time =
    unit === "h"
      ? Math.floor(totalTime / 3600)
      : unit === "min"
      ? Math.floor(totalTime / 60)
      : Math.floor(totalTime);
  const previousTime =
    unit === "h"
      ? Math.floor(previousTotalTime / 3600)
      : unit === "min"
      ? Math.floor(previousTotalTime / 60)
      : Math.floor(previousTotalTime);

  return (
    <MuscleNumberView>
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Typography.HeadlineXL.bold
          color={theme.colors.black}
          style={{ fontSize: 70, lineHeight: 70 }}
        >
          {time}
        </Typography.HeadlineXL.bold>
        <Typography.TitleL.regular color={theme.colors.black}>
          {unit}
        </Typography.TitleL.regular>
      </View>
      <Spacer.Horizontal gap={16} />
      <View style={{ flex: 1 }}>
        <View style={{ marginRight: 24 }}>
          <Typography.TitleM.bold style={{ flexShrink: 1 }}>
            {t("monthRecap.spentTraining")}
          </Typography.TitleM.bold>
          <Spacer.Vertical gap={4} />
          <ShortSeparator />
          <Spacer.Vertical gap={4} />
          <LineContainer>
            <Typography.TextS.regular
              color={
                totalTime > previousTotalTime
                  ? "green"
                  : totalTime === previousTotalTime
                  ? theme.colors.grey300
                  : theme.colors.redDelete
              }
            >
              {`${totalTime >= previousTotalTime ? "+" : ""}${
                time - previousTime
              } `}
            </Typography.TextS.regular>
            <Typography.TextS.regular
              color={theme.colors.grey300}
              style={{ flexShrink: 1 }}
            >
              {t("monthRecap.sinceLastMonth")}
            </Typography.TextS.regular>
          </LineContainer>
        </View>
      </View>
    </MuscleNumberView>
  );
};

const MuscleNumberView = styled.View({
  flexDirection: "row",
  alignItems: "center",
  width: CARD_WIDTH,
});

const ShortSeparator = styled.View(({ theme }) => ({
  height: 1,
  width: 48,
  backgroundColor: theme.colors.primary200,
}));

const LineContainer = styled.View({
  flexDirection: "row",
  alignItems: "flex-start",
});

import { CARD_WIDTH } from "#modules/Statistics/SessionsStats/utils/constants";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export const WorkedMusclesView = ({
  numberOfMuscles,
  previousNumber,
}: {
  numberOfMuscles: number;
  previousNumber: number;
}) => {
  const theme = useTheme();
  const { t } = useTranslation("statistics");
  return (
    <MuscleNumberView>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Typography.HeadlineXL.bold
          color={theme.colors.black}
          style={{ fontSize: 110, lineHeight: 110 * 1.2 }}
        >
          {numberOfMuscles}
        </Typography.HeadlineXL.bold>
      </View>
      <Spacer.Horizontal gap={16} />
      <View style={{ flex: 1 }}>
        <View style={{ marginRight: 24 }}>
          <Typography.TitleM.bold>
            {t("monthRecap.trainedMuscles")}
          </Typography.TitleM.bold>
          <Spacer.Vertical gap={4} />
          <ShortSeparator />
          <Spacer.Vertical gap={4} />
          <LineContainer>
            <Typography.TextS.regular
              color={
                numberOfMuscles > previousNumber
                  ? "green"
                  : numberOfMuscles === previousNumber
                  ? theme.colors.grey300
                  : theme.colors.redDelete
              }
            >
              {`${numberOfMuscles >= previousNumber ? "+" : ""}${
                numberOfMuscles - previousNumber
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

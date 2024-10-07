import {
  CARD_WIDTH,
  HORIZONTAL_PADDING,
} from "#modules/Statistics/SessionsStats/utils/constants";
import { SessionTimeView } from "#modules/Statistics/SessionsStats/view/SessionTimeView";
import { WorkedMusclesView } from "#modules/Statistics/SessionsStats/view/WorkedMusclesCard";
import { useSessionStatsCarousel } from "#modules/Statistics/SessionsStats/view/useSessionsStatsCarousel";
import { ProgressionNavigatorStackParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Progression/ProgressionNavigator.types";
import { ArrowIcon } from "#shared/icons/ArrowIcon";
import { Loader } from "#shared/view/components/Loader/Loader";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Fragment } from "react";
import { Trans } from "react-i18next";
import { Image, ScrollView, Text, View } from "react-native";

export const GlobalStatsCarousel = () => {
  const theme = useTheme();
  const { isLoading, pageIndex, setPageIndex, stats } =
    useSessionStatsCarousel();

  if (isLoading) {
    return (
      <FrameContainer>
        <CarouselHeader />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
          }}
        >
          <Loader color={theme.colors.black} />
        </View>
      </FrameContainer>
    );
  }

  return (
    <FrameContainer>
      <CarouselHeader />
      <Separator />
      <ScrollView
        onMomentumScrollEnd={(e) => {
          const xPos = e.nativeEvent.contentOffset.x;
          setPageIndex(Math.round(xPos / CARD_WIDTH));
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%" }}
        pagingEnabled
      >
        <WorkedMusclesView
          numberOfMuscles={stats.numberOfMuscles}
          previousNumber={stats.previousNumber}
        />
        <SessionTimeView
          previousTotalTime={stats.previousMonthStats?.total_training_time ?? 0}
          totalTime={stats.monthStats?.total_training_time ?? 0}
        />
      </ScrollView>
      <View style={{ alignItems: "center" }}>
        <PageIndicator index={pageIndex} pages={[0, 1]} />
      </View>
    </FrameContainer>
  );
};

const CarouselHeader = () => {
  const { navigate } =
    useNavigation<NavigationProp<ProgressionNavigatorStackParamList>>();
  return (
    <HeaderContainer
      onPress={() => {
        navigate("MonthRecap");
      }}
    >
      <Text>
        <Trans
          ns="statistics"
          i18nKey={"common.monthRecap"}
          parent={Typography.TextL.regular}
          components={{
            bold: <Typography.TextL.bold />,
          }}
        />
      </Text>
      <Spacer.Horizontal gap={4} />
      <Image source={require("#assets/in-app-icons/watch.png")} />
      <Spacer.Flex />
      <ArrowIcon height={16} width={16} />
    </HeaderContainer>
  );
};

const PageIndicator = ({
  index,
  pages,
}: {
  index: number;
  pages: number[];
}) => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "row", width: "20%" }}>
      {pages.map((_, i) => (
        <Fragment key={i}>
          <Spacer.Flex />
          <View
            style={{
              height: 3,
              flex: 7,
              backgroundColor:
                index === i ? theme.colors.black : theme.colors.grey200,
            }}
          />
          <Spacer.Flex />
        </Fragment>
      ))}
    </View>
  );
};

const FrameContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.white,
  borderRadius: 8,
  marginHorizontal: HORIZONTAL_PADDING,
  paddingBottom: 8,
  borderColor: theme.colors.text500,
  borderWidth: 1,
}));

const Separator = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.grey300,
}));

const HeaderContainer = styled.Pressable({
  flexDirection: "row",
  alignItems: "center",
  padding: 16,
  paddingVertical: 8,
});

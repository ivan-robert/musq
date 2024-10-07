// Import statements
import React, { useEffect, useState } from "react";
import { Dimensions, Modal, TouchableOpacity, View } from "react-native";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/base";
import { useAtom } from "jotai";
import { DateTime } from "luxon";
import { useTimer } from "react-timer-hook";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Svg, Circle } from "react-native-svg";

import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { restTimerAtom } from "#shared/store/restTimer";
import { ConfirmationModal } from "#shared/view/components/ConfirmationModal";
import { NewWorkoutPageHeader } from "#shared/view/components/NewWorkoutPageHeader";
import { useTranslation } from "react-i18next";

// Main component
export const IndependantRest: React.FC = React.memo(() => {
  const [timerData, setTimerData] = useAtom(restTimerAtom);
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();

  const confirmRest = (time: number) => {
    setTimerData((prev) => ({ ...prev, isRestOpen: false }));
    timerData.onConfirm(time);
  };

  return (
    <Modal animationType="slide" visible={timerData.isRestOpen}>
      <View style={{ height: top, backgroundColor: theme.colors.primary500 }} />
      <Rest
        timeInSeconds={timerData.expiryTimestamp.diffNow().as("seconds")}
        onConfirm={confirmRest}
      />
      <View style={{ height: bottom, backgroundColor: theme.colors.neutral }} />
    </Modal>
  );
});

type Props = {
  timeInSeconds: number;
  onConfirm: (time: number) => void;
};

const CIRCLE_SIZE = Dimensions.get("window").width * 0.8;

const Rest: React.FC<Props> = ({ timeInSeconds, onConfirm }) => {
  const { totalSeconds } = useTimer({
    expiryTimestamp: DateTime.now().plus({ seconds: timeInSeconds }).toJSDate(),
    autoStart: true,
  });
  const { t } = useTranslation("workouts");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [timerData, setTimerData] = useAtom(restTimerAtom);
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();

  const theme = useTheme();

  const progress = useSharedValue(totalSeconds / timerData.initialTime);

  // SVG circle parameters
  const size = CIRCLE_SIZE; // Diameter of the circle
  const strokeWidth = 10; // Width of the circle stroke
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Animate progress 0 over the duration of the timer
  useEffect(() => {
    progress.value = withTiming(0, {
      duration: timeInSeconds * 1000,
      easing: Easing.linear,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle timer completion
  useEffect(() => {
    if (totalSeconds === 0 && timerData.isRestOpen) {
      onConfirm(timerData.initialTime);
    }
  }, [onConfirm, timerData.initialTime, timerData.isRestOpen, totalSeconds]);

  // Animated props for the circle
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * progress.value,
  }));

  return (
    <Container>
      <NewWorkoutPageHeader
        title="Rest"
        leftIcon={
          <TouchableOpacity
            onPress={() => {
              setTimerData((prev) => ({
                ...prev,
                isRestOpen: false,
              }));
              navigate("AuthenticatedTabNavigator");
            }}
          >
            <Icon
              name="close-fullscreen"
              size={24}
              color={theme.colors.text200}
            />
          </TouchableOpacity>
        }
      />
      <TextContainer>
        {/* SVG Circle with animated progress */}
        <Svg width={size} height={size}>
          {/* Background Circle */}
          <Circle
            stroke={theme.colors.secondary300}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Animated Progress Circle */}
          <AnimatedCircle
            stroke={theme.colors.primary500}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference}, ${circumference}`}
            animatedProps={animatedProps}
            strokeLinecap="butt"
            rotation="-90"
            originX={size / 2}
            originY={size / 2}
          />
        </Svg>
        {/* Display remaining time */}
        <TimeText>{Math.ceil(totalSeconds)}</TimeText>
      </TextContainer>
      <ActionsContainer>
        {totalSeconds > 0 ? (
          <Button
            radius={32}
            color={theme.colors.CTA500}
            onPress={() => {
              setShowConfirmModal(true);
            }}
            title={t("newAddWorkout.stopResting")}
          />
        ) : (
          <Button
            radius={32}
            color={theme.colors.statusSuccess}
            onPress={() => {
              onConfirm(timerData.initialTime);
            }}
            title={t("newAddWorkout.finishResting")}
          />
        )}
      </ActionsContainer>
      <ConfirmationModal
        cancelLabel="keep resting"
        confirmLabel="yes"
        description="It is recommended to rest fully before starting the next set"
        isVisble={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        isNegative
        onConfirm={() => {
          setShowConfirmModal(false);
          onConfirm(timerData.initialTime - totalSeconds);
          setTimerData((prev) => ({
            ...prev,
            expiryTimestamp: DateTime.now().minus({ seconds: 1 }),
          }));
        }}
        title="Are you sure?"
      />
    </Container>
  );
};

// Animated Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Styled components
const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.neutral,
}));

const TextContainer = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

const TimeText = styled.Text(({ theme }) => ({
  position: "absolute",
  fontFamily: "Digital7",
  color: theme.colors.text500,
  fontSize: 48,
  lineHeight: 56,
}));

const ActionsContainer = styled.View({
  flexDirection: "row",
  justifyContent: "space-around",
  padding: 16,
});

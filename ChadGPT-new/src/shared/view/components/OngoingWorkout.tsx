import { AddSeanceNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/AddSeanceNavigator.types";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { ShowArrowIcon } from "#shared/icons/ShowArrowIcon";
import { workoutAtom } from "#shared/store/ongoingWorkout";
import { circuitSetAtom, classicPerfAtom } from "#shared/store/perf.store";
import { restTimerAtom } from "#shared/store/restTimer";
import { useOngoingWorkout } from "#shared/utils/useOngoingWorkout";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTabBarHeight } from "#shared/view/components/useTabBarHeight";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTimer } from "react-timer-hook";

export const OngoingWorkout: React.FC = () => {
  const theme = useTheme();
  const { retrieveOngoingWorkout } = useOngoingWorkout();
  const workout = retrieveOngoingWorkout();
  const [workoutInfo] = useAtom(workoutAtom);
  const [timerData] = useAtom(restTimerAtom);
  const { bottom } = useSafeAreaInsets();
  const height = useTabBarHeight();

  const { navigate } =
    useNavigation<
      NavigationProp<AddSeanceNavigatorParamList & RootStackNavigatorParamList>
    >();

  const [perf] = useAtom(classicPerfAtom);
  const [superset] = useAtom(circuitSetAtom);

  const is_working_out = workout && workoutInfo.isOngoing;

  const isPerforming =
    (!!perf && !!perf.series.length) || (!!superset && superset.series.length);

  if (!is_working_out && !isPerforming) return null;

  const handlePress = () => {
    if (isPerforming) {
      const exosIds = superset
        ? superset.exos.map((exo) => exo.exoId).join(",")
        : perf
        ? perf.exo.exoId
        : "";
      navigate("AddSeancePage", {
        screen: "new-workout",
        params: { exosIdsForRedirect: exosIds },
      });

      return;
    }

    navigate("AddSeancePage", { screen: "new-workout" });
  };

  if (timerData.expiryTimestamp.toJSDate() > new Date()) {
    return <OngoingRest onPress={handlePress} />;
  }

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <View
          style={{
            borderRadius: 16,
            elevation: 10,
            shadowColor: theme.colors.black,
            shadowOffset: { height: 2, width: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            bottom: 16 + height + bottom,
            margin: 8,
            paddingVertical: 8,
            flexDirection: "row",
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: theme.colors.secondary300,
            backgroundColor: pressed
              ? theme.colors.primary800
              : theme.colors.primary500,
          }}
        >
          <View>
            <Typography.TextM.bold color={theme.colors.text300}>
              Workout in progress
            </Typography.TextM.bold>
            {!!workout && (
              <Typography.TextS.regular color={theme.colors.text200}>
                {workout.perfs.length} exercises
              </Typography.TextS.regular>
            )}
            {!!isPerforming && (
              <Typography.TextS.regular color={theme.colors.text200}>
                1 exercise ongoing
              </Typography.TextS.regular>
            )}
          </View>
          <Spacer.Flex />
          <ShowArrowIcon
            color={theme.colors.text300}
            height={24}
            width={24}
            style={{ alignSelf: "center" }}
            transform={[{ rotate: "-90deg" }]}
          />
        </View>
      )}
    </Pressable>
  );
};

type OngoingRestProps = {
  onPress: (time?: number) => void;
};

const OngoingRest: React.FC<OngoingRestProps> = ({ onPress }) => {
  const theme = useTheme();
  const [timerData, setTimerData] = useAtom(restTimerAtom);
  const { minutes, seconds, totalSeconds } = useTimer({
    expiryTimestamp: timerData.expiryTimestamp.toJSDate(),
    autoStart: true,
  });
  const { bottom } = useSafeAreaInsets();
  const height = useTabBarHeight();
  return (
    <Pressable
      onPress={() => {
        onPress();
        setTimerData((prev) => ({
          ...prev,
          timeLeft: totalSeconds,
          isRestOpen: true,
        }));
      }}
    >
      {({ pressed }) => (
        <View
          style={{
            borderRadius: 16,
            elevation: 10,
            shadowColor: theme.colors.black,
            shadowOffset: { height: 2, width: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            bottom: 8 + height + bottom,
            margin: 8,
            paddingVertical: 8,
            flexDirection: "row",
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: theme.colors.secondary300,
            backgroundColor: pressed
              ? theme.colors.primary800
              : theme.colors.primary500,
          }}
        >
          <View>
            <Typography.TextM.bold color={theme.colors.text300}>
              Resting
            </Typography.TextM.bold>
            <Typography.TextS.regular color={theme.colors.text200}>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </Typography.TextS.regular>
          </View>
          <Spacer.Flex />
          <ShowArrowIcon
            color={theme.colors.text300}
            height={24}
            width={24}
            style={{ alignSelf: "center" }}
            transform={[{ rotate: "-90deg" }]}
          />
        </View>
      )}
    </Pressable>
  );
};

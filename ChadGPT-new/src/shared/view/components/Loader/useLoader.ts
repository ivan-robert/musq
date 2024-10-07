import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export const useLoader = () => {
  const rotation = useSharedValue(0);

  rotation.value = withRepeat(
    withTiming(360, {
      duration: 1200,
      easing: Easing.bezier(0.68, 0, 0.27, 1),
    }),
    -1,
    false
  );

  const animatedRotation = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  return { animatedRotation };
};

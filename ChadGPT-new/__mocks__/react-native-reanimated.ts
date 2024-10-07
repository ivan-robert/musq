import { KeyboardState } from "react-native-reanimated";
// @ts-expect-error: No declaration for the mock
import * as originalMock from "react-native-reanimated/mock";
const useAnimatedKeyboard = () => {
  return {
    height: originalMock.useSharedValue(0),
    state: originalMock.useSharedValue(KeyboardState.CLOSED),
  };
};
module.exports = {
  ...originalMock,
  useAnimatedKeyboard,
  KeyboardState,
  default: {
    ...originalMock.default,
  },
  useWorkletCallback: jest.fn(),
};

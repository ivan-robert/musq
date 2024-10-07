import "@testing-library/jest-native/extend-expect";

import "react-native-gesture-handler/jestSetup";

import nock from "nock";
import { queryClient } from "#shared/service/queryClient";

jest.mock("expo-font");
jest.mock("expo-asset");

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest
      .fn()
      .mockImplementation(({ children }) => children(inset)),
    SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  };
});

const TEST_DEFAULT_DATE = "2023-03-05T15:23:49.294Z";

beforeEach(async () => {
  jest.useFakeTimers({
    // We're not really interested in stopping the microtasks queue, what we want to mock is "timers"
    doNotFake: [
      "setImmediate", // see https://github.com/callstack/react-native-testing-library/issues/1347
      "clearImmediate",
      "nextTick",
      "queueMicrotask",
      "requestIdleCallback",
      "cancelIdleCallback",
      "requestAnimationFrame",
      "cancelAnimationFrame",
      "hrtime",
      "performance",
    ],
    now: new Date(TEST_DEFAULT_DATE), // To customize in a test, use `jest.setSystemTime`
  });
});

nock.disableNetConnect();

queryClient.setDefaultOptions({ queries: { staleTime: 0 } });

afterEach(() => {
  queryClient.clear();
  jest.clearAllMocks();
});

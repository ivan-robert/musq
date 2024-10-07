import { screen } from "@testing-library/react-native";
import { renderWithProviders } from "../../../../../jest/utils/UtilFunctions";
import { LoginPage } from "./Login.page";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UnauthenticatedNavigatorStackParamList } from "../../unauthenticatedNavigator.types";

const navigateMock = jest.fn();
const LoginPageProps = {
  navigation: {
    navigate: navigateMock,
  },
} as unknown as NativeStackScreenProps<UnauthenticatedNavigatorStackParamList>;

describe("Login", () => {
  it("renders correctly", async () => {
    renderWithProviders(<LoginPage {...LoginPageProps} />);
    expect(await screen.findByPlaceholderText("authentication.password"))
      .toBeOnTheScreen;
    expect(screen).toMatchSnapshot();
  });
});

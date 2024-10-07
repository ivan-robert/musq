import { screen } from "@testing-library/react-native";
import { renderWithProviders } from "../../../../../jest/utils/UtilFunctions";
import { CreateAccountPage } from "./CreateAccount.page";

describe("Login", () => {
  it("renders correctly", async () => {
    renderWithProviders(<CreateAccountPage />);
    expect(screen.getByText("authentication.createAccount")).toBeOnTheScreen;
    expect(screen).toMatchSnapshot();
  });
});

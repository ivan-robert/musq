import { screen } from "@testing-library/react-native";

import { Typography } from "./Typography";
import { renderWithProviders } from "../../../../../jest/utils/UtilFunctions";

describe("Typography", () => {
  test("Title xlarge matches snapshot", () => {
    renderWithProviders(
      <Typography.HeadlineL.bold>hello</Typography.HeadlineL.bold>
    );

    expect(screen).toMatchSnapshot();
  });
});

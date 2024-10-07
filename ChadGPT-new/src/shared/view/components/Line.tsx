import styled from "@emotion/native";
import { Color } from "../../../theme/colors.types";

type LineProps = {
  color?: Color;
};

export const Line = {
  Vertical: styled.View<LineProps>(({ color, theme }) => ({
    backgroundColor: color ?? theme.colors.text500,
    flexDirection: "row",
    width: 1,
  })),
  Horizontal: styled.View<LineProps>(({ color, theme }) => ({
    backgroundColor: color ?? theme.colors.text500,
    flexDirection: "column",
    height: 1,
  })),
};

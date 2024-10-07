import { useTheme } from "@emotion/react";
import { Typography } from "./Typography/Typography";
import styled from "@emotion/native";
import { hex2rgba } from "../../utils/hex2rgba";

type ErrorViewProps = {
  title: string;
  description: string;
};

export const ErrorView = ({ description, title }: ErrorViewProps) => {
  const theme = useTheme();
  return (
    <ErrorViewContainer>
      <Typography.TextM.bold color={theme.colors.statusError}>
        {title}
      </Typography.TextM.bold>
      <Typography.TextS.regular color={theme.colors.text500}>
        {description}
      </Typography.TextS.regular>
    </ErrorViewContainer>
  );
};

const ErrorViewContainer = styled.View(({ theme }) => ({
  padding: 16,
  backgroundColor: hex2rgba(theme.colors.statusError, 0.3),
  borderRadius: 8,
}));

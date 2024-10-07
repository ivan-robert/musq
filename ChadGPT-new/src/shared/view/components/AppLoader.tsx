import { Loader } from "#shared/view/components/Loader/Loader";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";

export const Apploader = () => {
  const theme = useTheme();
  return (
    <CenteredView>
      <Loader color={theme.colors.text500} />
    </CenteredView>
  );
};

const CenteredView = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.colors.neutral,
}));

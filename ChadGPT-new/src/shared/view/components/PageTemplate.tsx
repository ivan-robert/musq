import { useSafeAreaInsets } from "react-native-safe-area-context";
import { QueryBoundaries } from "./QueryBoundaries";
import { Spacer } from "./Spacer";
import styled from "@emotion/native";
import { Color } from "#theme/colors.types";
import {
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "@emotion/react";
import { OngoingWorkout } from "#shared/view/components/OngoingWorkout";

type PageTemplateProps = {
  children: React.ReactNode;
  topInsetColor?: Color;
  bottomInsetColor?: Color;
  type?: "page" | "tab";
};

export const PageTemplate = ({
  children,
  topInsetColor,
  bottomInsetColor,
  type,
}: PageTemplateProps) => {
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const statusBarColor = topInsetColor ?? theme.colors.neutral;
  return (
    <>
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={
          statusBarColor === "transparent"
            ? undefined
            : statusBarColor > "#CCCCCC"
            ? "dark-content"
            : "light-content"
        }
      />

      <View style={{ flex: 1, backgroundColor: theme.colors.neutral }}>
        {topInsetColor && <BackgroundContainer color={topInsetColor} />}
        {bottomInsetColor && (
          <BackgroundContainer color={bottomInsetColor} style={{ bottom: 0 }} />
        )}
        <QueryBoundaries>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <>
              <Spacer.Vertical gap={top} />
              <PageContainer>{children}</PageContainer>
            </>
          </TouchableWithoutFeedback>
          {type !== "tab" && <Spacer.Vertical gap={bottom} />}
          {type == "tab" && <OngoingWorkout />}
        </QueryBoundaries>
      </View>
    </>
  );
};
const PageContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.neutral,
}));

const BackgroundContainer = styled.View<{ color?: Color }>(
  ({ theme, color }) => ({
    backgroundColor: color ?? theme.colors.neutral,
    flex: 1,
    position: "absolute",
    height: "50%",
    width: "100%",
  })
);

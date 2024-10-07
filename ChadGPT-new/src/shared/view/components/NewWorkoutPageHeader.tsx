import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { ShowArrowIcon } from "#shared/icons/ShowArrowIcon";
import { workoutAtom } from "#shared/store/ongoingWorkout";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { BackHandler, Pressable } from "react-native";

type Props = {
  title: string;
  rightIcon?: React.ReactElement | null;
  leftIcon?: React.ReactElement | null;
};

export const NewWorkoutPageHeader: React.FC<Props> = React.memo(
  ({ title, rightIcon, leftIcon }) => {
    const { navigate } =
      useNavigation<NavigationProp<RootStackNavigatorParamList>>();
    const theme = useTheme();
    const setOngoingWorkout = useSetAtom(workoutAtom);

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        navigate("AuthenticatedTabNavigator");
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        return false;
      });
    }, [navigate]);

    return (
      <HeaderContainer>
        {leftIcon !== undefined ? (
          leftIcon
        ) : (
          <Pressable
            onPress={() => {
              navigate("AuthenticatedTabNavigator");
              setOngoingWorkout({ isOngoing: true });
            }}
          >
            <ShowArrowIcon
              height={32}
              width={32}
              color={theme.colors.text300}
              style={{ transform: [{ rotate: "90deg" }] }}
            />
          </Pressable>
        )}
        <Spacer.Horizontal gap={16} />
        <Typography.TitleL.regular color={theme.colors.text500}>
          {title}
        </Typography.TitleL.regular>
        <Spacer.Flex />
        {rightIcon !== undefined ? rightIcon : null}
      </HeaderContainer>
    );
  }
);

const HeaderContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 32,
  paddingVertical: 16,
  backgroundColor: theme.colors.primary500,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
}));

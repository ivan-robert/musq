import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@emotion/react";
import { AddSeanceNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/AddSeanceNavigator.types";
import { AddWorkoutMenu } from "#modules/Seance/view/add-workout/AddWorkoutMenu";
import { NewWorkoutPage } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/pages/NewWorkout.page";
import { EnterPerfPage } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/pages/EnterPerf.page";
import { WorkoutSummaryPage } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/pages/WorkoutSummary.page";
import { BrowseWorkoutsPage } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/pages/BrowseWorkouts.page";
import { FolderContentPage } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/pages/FolderContent.page";

const AddWorkoutStack =
  createNativeStackNavigator<AddSeanceNavigatorParamList>();

export const AddWorkoutNavigator = () => {
  const theme = useTheme();

  return (
    <>
      <AddWorkoutStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none",
          navigationBarColor: theme.colors.black,
          contentStyle: {
            backgroundColor: theme.colors.black,
          },
        }}
      >
        <AddWorkoutStack.Screen name="home" component={AddWorkoutMenu} />
        <AddWorkoutStack.Screen name="new-workout" component={NewWorkoutPage} />
        <AddWorkoutStack.Screen name="browse" component={BrowseWorkoutsPage} />
        <AddWorkoutStack.Screen
          name="workout-summary"
          component={WorkoutSummaryPage}
          options={{ animation: "slide_from_right" }}
        />
        <AddWorkoutStack.Screen name="enter-perf" component={EnterPerfPage} />
        <AddWorkoutStack.Screen
          name="folder-content"
          component={FolderContentPage}
          options={{ animation: "slide_from_right" }}
        />
      </AddWorkoutStack.Navigator>
    </>
  );
};

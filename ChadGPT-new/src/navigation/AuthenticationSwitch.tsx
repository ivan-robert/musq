import { UnauthenticatedNavigator } from "./Unauthenticated/UnauthenticatedNavigator";

import { UserContextProvider } from "../modules/auth/context/User.context";
import { RootNavigator } from "./Authenticated/rootStackNavigator";
import { UserDataContextProvider } from "#modules/auth/context/UserData.context";
import { NavigationContainer } from "@react-navigation/native";
import { unauthenticatedLinking } from "#shared/infra/unauthenticatedLinking";
import { IndependantRest } from "#modules/Seance/view/add-workout/IndependantRest";
import { useAuth, useUser } from "@clerk/clerk-expo";

export const AuthenticationSwitch = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isSignedIn || !user) {
    return (
      <NavigationContainer linking={unauthenticatedLinking} independent>
        <UnauthenticatedNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer independent>
      <UserContextProvider user={user}>
        <UserDataContextProvider user={user}>
          <RootNavigator />
          <IndependantRest />
        </UserDataContextProvider>
      </UserContextProvider>
    </NavigationContainer>
  );
};

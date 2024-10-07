import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "./pages/Login/Login.page";
import { CreateAccountPage } from "./pages/CreateAccount/CreateAccount.page";
import { ResetPasswordPage } from "./pages/ResetPassword/ResetPassword.page";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { useTheme } from "@emotion/react";
import { ConfirmSignupPage } from "#navigation/Unauthenticated/pages/ConfirmSignup/ConfirmSignup.page";
import { UnauthenticatedNavigatorStackParamList } from "#navigation/Unauthenticated/unauthenticatedNavigator.types";

const UnauthenticatedNavigatorStack =
  createNativeStackNavigator<UnauthenticatedNavigatorStackParamList>();

export const UnauthenticatedNavigator = () => {
  const theme = useTheme();
  return (
    <PageTemplate topInsetColor={theme.colors.black}>
      <UnauthenticatedNavigatorStack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: theme.colors.black,
        }}
      >
        <UnauthenticatedNavigatorStack.Screen
          name="Login"
          component={LoginPage}
        />
        <UnauthenticatedNavigatorStack.Screen
          name="CreateAccount"
          component={CreateAccountPage}
        />
        <UnauthenticatedNavigatorStack.Screen
          name="ResetPassword"
          component={ResetPasswordPage}
        />
        <UnauthenticatedNavigatorStack.Screen
          name="SignupConfirmation"
          component={ConfirmSignupPage}
        />
      </UnauthenticatedNavigatorStack.Navigator>
    </PageTemplate>
  );
};

export type UnauthenticatedNavigatorStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  ResetPassword: undefined;
  SignupConfirmation: { email: string };
  LoginViaLink: { access_token: string; refresh_token: string };
};

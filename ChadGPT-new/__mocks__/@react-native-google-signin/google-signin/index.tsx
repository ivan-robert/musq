import { Pressable } from "react-native";

export const GoogleSignin = {
  configure: jest.fn(),
  hasPlayServices: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  revokeAccess: jest.fn(),
  isSignedIn: jest.fn(),
  getCurrentUser: jest.fn(),
  getTokens: jest.fn(),
  clearCachedToken: jest.fn(),
  getTokensWithCode: jest.fn(),
  requestPermissions: jest.fn(),
  checkPlayServices: jest.fn(),
  getPlayServiceStatus: jest.fn(),
  playServicesAvailable: jest.fn(),
};

export const GoogleSigninButton = () => (
  <Pressable>Crazy cool signin uh</Pressable>
);

export const statusCodes = {
  SIGN_IN_CANCELLED: "SIGN_IN_CANCELLED",
  IN_PROGRESS: "IN_PROGRESS",
  PLAY_SERVICES_NOT_AVAILABLE: "PLAY_SERVICES_NOT_AVAILABLE",
};

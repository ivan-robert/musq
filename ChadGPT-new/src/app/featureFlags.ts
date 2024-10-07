import { getEnvironment } from "#app/environment";

type FeatureFlags = {
  addOwnExo: boolean;
  showIntensity: boolean;
  resetPassword: boolean;
  lightTheme: boolean;
  newAddFlow: boolean;
  googleSignIn: boolean;
};

type FeatureFlagsByEnv = Record<
  ReturnType<typeof getEnvironment>,
  FeatureFlags
>;

export const featureFlagsByEnv: FeatureFlagsByEnv = {
  DEVELOPMENT: {
    addOwnExo: false,
    showIntensity: true,
    resetPassword: true,
    lightTheme: true,
    newAddFlow: true,
    googleSignIn: true,
  },
  STAGING: {
    addOwnExo: false,
    showIntensity: false,
    resetPassword: true,
    lightTheme: true,
    newAddFlow: true,
    googleSignIn: false,
  },
  PRODUCTION: {
    addOwnExo: false,
    showIntensity: false,
    resetPassword: true,
    lightTheme: true,
    newAddFlow: true,
    googleSignIn: false,
  },
};

export const featureFlags = featureFlagsByEnv[getEnvironment()];

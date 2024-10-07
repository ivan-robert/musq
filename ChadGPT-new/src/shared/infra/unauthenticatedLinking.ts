import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { UnauthenticatedNavigatorStackParamList } from "#navigation/Unauthenticated/unauthenticatedNavigator.types";
import { LinkingOptions, getStateFromPath } from "@react-navigation/native";

const linkingConfig: LinkingOptions<
  RootStackNavigatorParamList & UnauthenticatedNavigatorStackParamList
>["config"] = {
  screens: {
    LoginViaLink: {
      exact: false,
      path: "signup-confirm",
    },
  },
};

export const unauthenticatedLinking: LinkingOptions<
  RootStackNavigatorParamList & UnauthenticatedNavigatorStackParamList
> = {
  prefixes: ["https://thefitrat.netlify.app/"],
  getStateFromPath: (path) => {
    const newPath = path.replace("confirm#", "confirm?"); // This is a workaround for a bug in the URL handling, since Supabase sends separate link instead of queryparams
    return getStateFromPath(newPath, linkingConfig);
  },
  config: linkingConfig,
};

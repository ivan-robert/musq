// import { SupabaseClient } from "@supabase/supabase-js";
// import { UnauthenticatedNavigatorStackParamList } from "#navigation/Unauthenticated/unauthenticatedNavigator.types";
// import {
//   NavigationProp,
//   RouteProp,
//   useNavigation,
//   useRoute,
// } from "@react-navigation/native";

// export const LoginViaLinkPage: React.FC = () => {
//   const route =
//     useRoute<
//       RouteProp<UnauthenticatedNavigatorStackParamList, "LoginViaLink">
//     >();
//   const { navigate } =
//     useNavigation<NavigationProp<UnauthenticatedNavigatorStackParamList>>();
//   const { access_token, refresh_token } = route.params;

//   if (!access_token || !refresh_token) {
//     navigate("Login");
//   }

//   supabaseClient.auth.setSession({ access_token, refresh_token });

//   return <></>;
// };

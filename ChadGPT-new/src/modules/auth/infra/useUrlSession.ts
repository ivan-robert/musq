import * as Linking from "expo-linking";
// import * as QueryParams from "expo-auth-session/build/QueryParams";

const createSessionFromUrl = async (url: string) => {
  console.log(url);
  return null;
  //   const { params, errorCode } = QueryParams.getQueryParams(url);

  //   if (errorCode) {
  //     throw new Error(`Error : ${errorCode}`);
  //   }

  //   const { accessToken, refreshToken } = params;

  //   const { data, error } = await supabaseClient.auth.setSession({
  //     access_token: accessToken,
  //     refresh_token: refreshToken,
  //   });

  //   if (error) {
  //     throw new Error(error.message);
  //   }

  //   return data.session;
};

export const useUrlSession = () => {
  const url = Linking.useURL();
  if (url) {
    return createSessionFromUrl(url);
  }
  return url;
};

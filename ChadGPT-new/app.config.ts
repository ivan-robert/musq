export default {
  expo: {
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you edit your avatar.",
        },
      ],
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme:
            "com.googleusercontent.apps.465635626146-b8qcdmihdk09oc7a4npknt7rkj76itpo",
        },
      ],
    ],
    owner: "chadgpt-fr",
    entryPoint: "./src/App.tsx",
    name: "MusQ",
    slug: "ChadGPT-new",
    version: "1.2.5",
    updates: {
      url: "https://u.expo.dev/8fb797a6-6afc-4a1d-af6a-692bb76cb235",
      requestHeaders: {
        "expo-channel-name": process.env.ENV,
        "channel-name": process.env.ENV,
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.fitrat.fitrat",
      associatedDomains: ["applinks:thefitrat.netlify.app"],
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.fitrat.fitrat",
      googleServicesFile: "./google-services.json",
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          category: ["BROWSABLE", "DEFAULT"],
          data: [
            {
              scheme: "https",
              host: "thefitrat.netlify.app",
            },
          ],
        },
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "8fb797a6-6afc-4a1d-af6a-692bb76cb235",
      },
      ENVIRONMENT: process.env.ENV,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      SUPABASE_URL: process.env.SUPABASE_URL,
      BASE_EXERCISE_URL: process.env.BASE_EXERCISE_URL,
      EXERCISE_API_KEY: process.env.EXERCISE_API_KEY,
      EXERCISE_API_HOST: process.env.EXERCISE_API_HOST,
      GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID,
      GOOGLE_IOS_CLIENT_ID: process.env.GOOGLE_IOS_CLIENT_ID,
      EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:
        process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
      S3_SECRET: process.env.S3_SECRET,
    },
  },
};

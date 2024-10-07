const packagesToTransform = [
  "react-native",
  "react-native-(.*)",
  "@react-native",
  "@react-native-community",
  "@react-navigation",
  "expo",
  "@firebase",
  "firebase",
  "@expo-google-fonts/.*",
  "expo-font",
  "expo-constants",
  "expo-modules-core",
  "@react-navigation/native-stack",
  "@rneui/base",
];

 
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: "react-native",
  rootDir: ".",
  setupFiles: ["./jest/setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  clearMocks: true,
  transformIgnorePatterns: [
    `node_modules/(?!(${packagesToTransform.join("|")})/)`,
  ],
  cacheDirectory: ".cache/jest",
  collectCoverage: false,
  snapshotResolver: "./snapshotResolver.js",

  transform: {
    "node_modules/react-native/Libraries/Lists": "babel-jest",
    "node_modules/@react-native/virtualized-lists/Lists": "babel-jest",
    "\\.[jt]sx?$": ["@sucrase/jest-plugin", { jsxRuntime: "automatic" }],
  },
  moduleNameMapper: {
    // Keep in sync with babel.config.js and tsconfig.json
    "#app/(.*)": "<rootDir>/src/app/$1",
    "#theme/(.*)": "<rootDir>/src/theme/$1",
    "#modules/(.*)": "<rootDir>/src/modules/$1",
    "#shared/(.*)": "<rootDir>/src/shared/$1",
    "#navigation/(.*)": "<rootDir>/src/navigation/$1",
    "#assets/(.*)": "<rootDir>/assets/$1",
    "\\.(jpg|jpeg|png|gif|webp|svg|otf|ttf)$":
      "<rootDir>/__mocks__/fileMock.ts",
  },
};

 
module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    ["react-native-reanimated/plugin"],
    [
      "module-resolver",
      {
        alias: {
          "#assets": "./assets",
          "#modules": "./src/modules",
          "#shared": "./src/shared",
          "#navigation": "./src/navigation",
          "#theme": "./src/theme",
          "#app": "./src/app",
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
  ],
};

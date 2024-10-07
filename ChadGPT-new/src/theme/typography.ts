import { FontSource } from "expo-font";
import {
  FontFamily,
  FontRNStyle,
  FontStyle,
  fontFamilies,
} from "./fonts.types";

export const fonts: Record<FontFamily, FontSource> = {
  "Montserrat-Regular": require("./fonts/Montserrat-Regular.otf"),
  "Montserrat-Bold": require("./fonts/Montserrat-Bold.otf"),
  "Montserrat-Italic": require("./fonts/Montserrat-Italic.otf"),
  Digital7: require("./fonts/Digital7.ttf"),
} as const;

export const fontKeys: Record<FontFamily, FontFamily> = {
  "Montserrat-Regular": "Montserrat-Regular",
  "Montserrat-Bold": "Montserrat-Bold",
  "Montserrat-Italic": "Montserrat-Italic",
  Digital7: "Digital7",
};

const LINE_HEIGHT_FACTOR = 1.2;

const createMontserratTypo = ({
  fontSize,
  lineHeight,
}: {
  fontSize: number;
  lineHeight: number;
}): Record<FontStyle, FontRNStyle> => {
  const fontsToReturn = {
    regular: {
      fontFamily: fontFamilies.MontserratRegular,
      fontSize,
      lineHeight,
    },
    bold: { fontFamily: fontFamilies.MontserratBold, fontSize, lineHeight },
    italic: {
      fontFamily: fontFamilies.MontserratItalic,
      fontSize,
      lineHeight,
    },
  };
  return fontsToReturn;
};

const headline = {
  l: createMontserratTypo({
    fontSize: 40,
    lineHeight: 40 * LINE_HEIGHT_FACTOR,
  }),
  xl: createMontserratTypo({
    fontSize: 60,
    lineHeight: 60 * LINE_HEIGHT_FACTOR,
  }),
};

const title = {
  l: createMontserratTypo({
    fontSize: 25,
    lineHeight: 25 * LINE_HEIGHT_FACTOR,
  }),

  m: createMontserratTypo({
    fontSize: 22,
    lineHeight: 22 * LINE_HEIGHT_FACTOR,
  }),
};

const text = {
  l: createMontserratTypo({
    fontSize: 18,
    lineHeight: 18 * LINE_HEIGHT_FACTOR,
  }),

  m: createMontserratTypo({
    fontSize: 16,
    lineHeight: 16 * LINE_HEIGHT_FACTOR,
  }),

  s: createMontserratTypo({
    fontSize: 14,
    lineHeight: 14 * LINE_HEIGHT_FACTOR,
  }),
};

export const typography = {
  headline,
  title,
  text,
};

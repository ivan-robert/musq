export type FontStyle = "regular" | "bold" | "italic";

export const fontFamilies = {
  MontserratRegular: "Montserrat-Regular",
  MontserratBold: "Montserrat-Bold",
  MontserratItalic: "Montserrat-Italic",
  Digital7: "Digital7",
} as const;

export type FontFamily = (typeof fontFamilies)[keyof typeof fontFamilies];

export type FontRNStyle = {
  fontSize: number;
  lineHeight: number;
  fontFamily: FontFamily;
};

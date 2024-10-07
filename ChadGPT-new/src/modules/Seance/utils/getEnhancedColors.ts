import { ThemeInterface } from "#theme/emotion";

export const getEnhancedColors = (
  colors: ThemeInterface["colors"],
  status: "validated" | "disabled" | "neutral"
): ThemeInterface["colors"] => {
  if (status === "validated") {
    return {
      ...colors,
      CTA500: colors.statusSuccess,
      CTA300: colors.statusSuccess,
      text500: colors.statusSuccess,
      text300: colors.statusSuccess,
    };
  }
  if (status === "disabled") {
    return {
      ...colors,
      CTA500: colors.grey200,
      text500: colors.grey200,
      CTA300: colors.grey200,
    };
  }

  return colors;
};

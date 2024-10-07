import React, { ReactNode, forwardRef } from "react";
import { Text as RNText, TextProps } from "react-native";
import { Color } from "../../../../theme/colors.types";
import { FontStyle } from "../../../../theme/fonts.types";
import { useTheme } from "@emotion/react";

type TypographyProps = TextProps & {
  children?: ReactNode;
  color?: Color;
  isUnderlined?: boolean;
  maxLinesBeforeEllipsis?: number;
};

type TextSize = "l" | "m" | "s";
type HeadlineSize = "l" | "xl";
type TitleSize = "l" | "m";

const BaseText = forwardRef<RNText, TypographyProps>(
  (
    {
      children,
      color,
      isUnderlined,
      maxLinesBeforeEllipsis,
      style,
      ...textProps
    },
    ref
  ) => {
    const theme = useTheme();
    return (
      <RNText
        ref={ref}
        style={[
          { color: color ?? theme.colors.text200 },
          {
            textDecorationLine: isUnderlined ? "underline" : "none",
          },
          style,
        ]}
        numberOfLines={maxLinesBeforeEllipsis}
        {...textProps}
      >
        {children}
      </RNText>
    );
  }
);

const Title = (size: TitleSize, fontStyle: FontStyle) =>
  React.forwardRef<RNText, TypographyProps>(
    (
      {
        accessibilityRole = "header",
        color = "black",
        style: textStyle = {},
        ...props
      },
      ref
    ) => {
      const theme = useTheme();
      return (
        <BaseText
          ref={ref}
          color={color}
          {...props}
          //eslint-disable-next-line
          //@ts-ignore
          style={{
            //@ts-expect-error Somehow now the style can be falsy
            ...textStyle,
            ...theme.typography.title[size][fontStyle],
          }}
          accessibilityRole={accessibilityRole}
        />
      );
    }
  );

const Headline = (size: HeadlineSize, fontStyle: FontStyle) =>
  React.forwardRef<RNText, TypographyProps>(
    (
      {
        accessibilityRole = "header",
        color = "black",
        style: textStyle = {},
        ...props
      },
      ref
    ) => {
      const theme = useTheme();

      return (
        <BaseText
          ref={ref}
          color={color}
          style={{
            ...theme.typography.headline[size][fontStyle],
            //eslint-disable-next-line
            //@ts-ignore
            ...textStyle,
          }}
          {...props}
          accessibilityRole={accessibilityRole}
        />
      );
    }
  );

const Text = (size: TextSize, fontStyle: FontStyle) =>
  React.forwardRef<RNText, TypographyProps>(
    (
      {
        accessibilityRole = "header",
        color = "black",
        style: textStyle = {},
        ...props
      },
      ref
    ) => {
      const theme = useTheme();
      return (
        <BaseText
          ref={ref}
          color={color}
          {...props}
          //eslint-disable-next-line
          //@ts-ignore
          style={{
            ...theme.typography.text[size][fontStyle],
            flexShrink: 1,
            //@ts-expect-error Somehow now the style can be falsy
            ...textStyle,
          }}
          accessibilityRole={accessibilityRole}
        />
      );
    }
  );

//eslint-disable-next-line
//@ts-ignore

export const Typography = {
  TitleL: {
    regular: Title("l", "regular"),
    bold: Title("l", "bold"),
    italic: Title("l", "italic"),
  },
  TitleM: {
    regular: Title("m", "regular"),
    bold: Title("m", "bold"),
    italic: Title("m", "italic"),
  },
  HeadlineL: {
    regular: Headline("l", "regular"),
    bold: Headline("l", "bold"),
    italic: Headline("l", "italic"),
  },
  HeadlineXL: {
    regular: Headline("xl", "regular"),
    bold: Headline("xl", "bold"),
    italic: Headline("xl", "italic"),
  },
  TextL: {
    regular: Text("l", "regular"),
    bold: Text("l", "bold"),
    italic: Text("l", "italic"),
  },
  TextM: {
    regular: Text("m", "regular"),
    bold: Text("m", "bold"),
    italic: Text("m", "italic"),
  },
  TextS: {
    regular: Text("s", "regular"),
    bold: Text("s", "bold"),
    italic: Text("s", "italic"),
  },
};

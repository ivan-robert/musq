import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import styled from "@emotion/native";
import { Skeleton } from "@rneui/themed";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Spacer } from "#shared/view/components/Spacer";

type SkeletonQueryBoundariesProps = {
  children: React.ReactNode;
};

export const SkeletonCaledarQueryBoundaries = ({
  children,
}: SkeletonQueryBoundariesProps) => {
  const theme = useTheme();
  const { t } = useTranslation("workouts");
  return (
    <QueryErrorResetBoundary>
      <Suspense
        fallback={
          <ContentView>
            <Typography.TitleL.regular color={theme.colors.text500}>
              {t("yourWorkouts")}
            </Typography.TitleL.regular>
            <Spacer.Vertical gap={16} />
            <Skeleton animation="wave" style={{ height: 250 }} />
            <Skeleton animation="wave" style={{ height: 60 }} />
            <Skeleton animation="wave" style={{ height: 250 }} />
          </ContentView>
        }
      >
        {children}
      </Suspense>
    </QueryErrorResetBoundary>
  );
};

const ContentView = styled.View({
  flex: 1,
  //   padding: 8,
  paddingHorizontal: 16,
  gap: 16,
});

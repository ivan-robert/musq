import React, { Suspense } from "react";
import { PageTemplate } from "../../../../../../shared/view/components/PageTemplate";
import { useTheme } from "@emotion/react";
import { Feed } from "#modules/social/view/Feed";
import { HomePageHeader } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Homepage/HomePageHeader";
import { Skeleton } from "@rneui/base";
import { View } from "react-native";
import { Spacer } from "#shared/view/components/Spacer";

export const Homepage = () => {
  const theme = useTheme();

  return (
    <PageTemplate type="tab" topInsetColor={theme.colors.primary500}>
      <Suspense fallback={<HomePageSkeleton />}>
        <HomePageHeader />
        <Feed />
      </Suspense>
    </PageTemplate>
  );
};

const HomePageSkeleton = () => {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Skeleton height={24} width={"80%"} style={{ borderRadius: 16 }} />
      <Spacer.Vertical gap={16} />
      <Skeleton height={12} width={"20%"} style={{ borderRadius: 16 }} />
      <Spacer.Vertical gap={8} />
      <Skeleton height={200} width={"100%"} />
      <Spacer.Vertical gap={8} />
      <Skeleton height={200} width={"100%"} />
      <Spacer.Vertical gap={8} />
      <Skeleton height={200} width={"100%"} />
    </View>
  );
};

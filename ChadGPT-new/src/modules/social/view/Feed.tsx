import { useSupabaseClient } from "#app/supabaseClient";
import { useUserDataContext } from "#modules/auth/context/UserData.context";
import { Post } from "#modules/social/domain/post.types";
import {
  WorkoutPost,
  WorkoutPostSkeleton,
} from "#modules/social/view/WorkoutPost";
import { useFetchPosts } from "#modules/social/view/useFetchPosts";
import { AuthenticatedTabNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/authenticatedTabNavigator.types";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { ReloadIcon } from "#shared/icons/ReloadIcon";
import { Logger } from "#shared/service/logger.service";
import { NotificationsService } from "#shared/service/notifications.service";
import { postsAtom } from "#shared/store/posts";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";

import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, Skeleton } from "@rneui/base";
import { useAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { FlatList, TouchableOpacity, View } from "react-native";
import {
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ElementIdentifier = "GREETINGS" | Post | "NO_POSTS" | "FETCHING";

const FeedHeader = () => {
  const supabaseClient = useSupabaseClient();
  const { username } = useUserDataContext();
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    NotificationsService.registerForPushNotifications(supabaseClient);
    // eslint-disable-next-line
  }, []);

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Trans
        parent={Typography.HeadlineL.bold}
        ns="common"
        i18nKey="greetings.welcome"
        tOptions={{ name: username || "User" }}
        components={{
          orange: <Typography.HeadlineL.bold color={theme.colors.CTA300} />,
          white: <Typography.HeadlineL.bold color={theme.colors.text500} />,
        }}
      />
      <Spacer.Vertical gap={16} />
      <Typography.TextL.regular color={theme.colors.text500}>
        {t("greetings.yourLastWorkouts")}
      </Typography.TextL.regular>
    </View>
  );
};

export const Feed = () => {
  const {
    data,
    error,
    fetchNextPage,
    isFetching,
    refetch,
    isRefetching,
    isFetched,
  } = useFetchPosts();
  const flatPosts: ElementIdentifier[] = data.pages.flat() ?? [];
  if (flatPosts.length === 0 && isFetched) {
    flatPosts.push("NO_POSTS");
  }
  flatPosts.unshift("GREETINGS");

  const posts: ElementIdentifier[] = isFetching
    ? [...flatPosts, "FETCHING", "FETCHING", "FETCHING"]
    : flatPosts;

  return (
    <FeedInfiniteList
      data={posts}
      error={error}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
      isRefetching={isRefetching}
    />
  );
};

type SeanceListProps = {
  error: Error | null;
  refetch: () => void;
  isRefetching: boolean;
  data: ElementIdentifier[];
  fetchNextPage: () => void;
};

export const FeedInfiniteList = ({
  error,
  refetch,
  data,
  fetchNextPage,
  isRefetching,
}: SeanceListProps) => {
  const height = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation("workouts");
  const theme = useTheme();
  const [posts] = useAtom(postsAtom);
  if (error) {
    Logger.error(error.message);
    return (
      <CenteredView>
        <Typography.TextL.regular
          color={theme.colors.statusError}
          style={{ textAlign: "center", flexShrink: 1 }}
        >
          {t("loadingWorkoutsError")}
        </Typography.TextL.regular>
        <Spacer.Vertical gap={16} />
        <TouchableOpacity onPress={() => refetch()}>
          <ReloadIcon height={24} width={24} color={theme.colors.statusError} />
        </TouchableOpacity>
      </CenteredView>
    );
  }

  return (
    <ListWrapper>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={theme.colors.CTA300}
          />
        }
        ListEmptyComponent={() => (
          <CenteredView>
            <Typography.TextL.regular
              color={theme.colors.text500}
              style={{ textAlign: "center", flexShrink: 1 }}
            >
              {t("noWorkoutsYet")}
            </Typography.TextL.regular>
          </CenteredView>
        )}
        contentContainerStyle={{
          paddingBottom: 32 + height + bottom,
          paddingTop: 16,
        }}
        ItemSeparatorComponent={() => <Spacer.Vertical gap={16} />}
        data={data}
        renderItem={({ item: post }) => {
          if (typeof post === "string") {
            if (post === "GREETINGS") {
              return <FeedHeader />;
            }
            if (post === "NO_POSTS") {
              return <NoPostsPlaceHolder />;
            }
            if (post === "FETCHING") {
              return <WorkoutPostSkeleton />;
            }
            return null;
          }

          return (
            <Suspense
              fallback={
                <Skeleton height={200} width={"100%"} animation="pulse" />
              }
            >
              <WorkoutPost post={posts[post.postId]} key={post.postId} />
            </Suspense>
          );
        }}
        onEndReached={fetchNextPage}
      />
    </ListWrapper>
  );
};

const NoPostsPlaceHolder = () => {
  const { t } = useTranslation("social");
  const theme = useTheme();
  const { navigate } =
    useNavigation<
      NavigationProp<
        AuthenticatedTabNavigatorParamList & RootStackNavigatorParamList
      >
    >();

  return (
    <View style={{ flex: 1 }}>
      <CenteredView>
        <Typography.TextM.regular color={theme.colors.text500}>
          {t("feed.feedEmpty")}
        </Typography.TextM.regular>
        <Spacer.Vertical gap={16} />
        <View style={{ flexDirection: "row" }}>
          <Button
            type="clear"
            color={theme.colors.CTA300}
            radius={16}
            onPress={() => navigate("AddSeancePage")}
          >
            <Typography.TextM.regular color={theme.colors.CTA300}>
              {t("feed.addWorkout")}
            </Typography.TextM.regular>
          </Button>
          <Spacer.Horizontal gap={16} />
          <Button
            type="clear"
            onPress={() => navigate("SearchUsers")}
            color={theme.colors.CTA300}
            radius={16}
          >
            <Typography.TextM.regular color={theme.colors.CTA300}>
              {t("feed.findFriends")}
            </Typography.TextM.regular>
          </Button>
        </View>
      </CenteredView>
    </View>
  );
};

const CenteredView = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

const ListWrapper = styled(GestureHandlerRootView)({
  flex: 1,
});

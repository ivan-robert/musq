import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { useTranslation } from "react-i18next";
import { Avatar, Icon } from "@rneui/themed";
import { Typography } from "#shared/view/components/Typography/Typography";
import { Dimensions, Pressable, View } from "react-native";
import { Image } from "react-native";
import { ArrowIcon } from "#shared/icons/ArrowIcon";
import { Spacer } from "#shared/view/components/Spacer";
import { MuscledArmIcon } from "#shared/icons/MuscledArmIcon";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { forwardRef, useState } from "react";
import { SvgProps } from "react-native-svg";
import { useAtom } from "jotai";
import { postsAtom } from "#shared/store/posts";
import { useLikePost } from "#modules/social/view/useLikePost";
import { Post } from "#modules/social/domain/post.types";
import { DateTime } from "luxon";
import { getMediaDimensions } from "#modules/social/utils/getMediaDimensions";
import { ScrollView } from "#shared/view/components/ScrollView";
import { Skeleton } from "@rneui/base";

import { useSuspenseQuery } from "@tanstack/react-query";
import { s3 } from "#app/s3";

const SCREEN_WIDTH = Dimensions.get("window").width;

type SeanceItemProps = {
  post: Post;
};

export const WorkoutPost = ({ post }: SeanceItemProps) => {
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  const theme = useTheme();
  const { t } = useTranslation();
  const linkedWorkout = post.workout;

  if (!linkedWorkout) {
    return null;
  }

  const { data: image_urls } = useSuspenseQuery({
    queryKey: ["POST_ILLUSTRATIONS", post.postId],
    queryFn: async () => {
      const urls = [];
      for (const media of post.media) {
        const url = await s3.getUrl(`${media.folder}/${media.file_name}`);
        urls.push(url);
      }
      return urls;
    },
  });

  return (
    <PostContainer>
      <Pressable
        onPress={() => navigate("post-details", { postId: post.postId! })}
      >
        <>
          <OuterRowContainer
            style={{ backgroundColor: theme.colors.primary500 }}
          >
            <PersonContainer
              onPress={() => {
                navigate("PublicProfile", { userId: post.posted_by.user_id });
              }}
            >
              <Avatar
                rounded
                size={32}
                source={{ uri: post.posted_by.profilePictureURL }}
              />
              <View>
                <Typography.TextM.bold color={theme.colors.text500}>
                  {post.posted_by.username}
                </Typography.TextM.bold>
                <Typography.TextS.regular color={theme.colors.text300}>
                  {`${DateTime.fromISO(post.createdAt).toFormat("dd-MM-yyyy")}`}
                </Typography.TextS.regular>
              </View>
            </PersonContainer>
          </OuterRowContainer>
          <Separator />
          <DescriptionContainer>
            <Typography.TextL.regular color={theme.colors.text500}>
              {post.title}
            </Typography.TextL.regular>
            {post.description && (
              <Typography.TextM.regular color={theme.colors.text200}>
                {post.description}
              </Typography.TextM.regular>
            )}
          </DescriptionContainer>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
            }}
          >
            <TextContentContainer>
              <Typography.TextS.regular color={theme.colors.text200}>
                {linkedWorkout.types.reduce((acc, type, index) => {
                  if (index === 0) {
                    return type;
                  }
                  return `${acc}, ${type}`;
                }, "")}
              </Typography.TextS.regular>
              <Spacer.Vertical gap={4} />
              <Typography.TextS.regular color={theme.colors.text200}>
                {t("workouts:workout.numberOfExercises", {
                  count: linkedWorkout?.perfs.length,
                })}
              </Typography.TextS.regular>
            </TextContentContainer>
            <TextContentContainer
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  name="schedule"
                  type="material"
                  size={24}
                  color={theme.colors.CTA300}
                />
                <Spacer.Horizontal gap={4} />
                <Typography.TextS.regular color={theme.colors.text200}>
                  {DateTime.fromISO(linkedWorkout.startDate).toLocaleString({
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography.TextS.regular>
                <Spacer.Horizontal gap={2} />
                <ArrowIcon color={theme.colors.CTA300} height={8} width={8} />
                <Spacer.Horizontal gap={2} />
                <Typography.TextS.regular color={theme.colors.text200}>
                  {DateTime.fromISO(linkedWorkout.endDate).toLocaleString({
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography.TextS.regular>
              </View>
            </TextContentContainer>
          </View>
          <Spacer.Vertical gap={4} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          >
            {post.media.map((media, index) => {
              return (
                <Pressable key={media.id}>
                  <CarouselItemContainer key={media.asset_id}>
                    <Image
                      source={{
                        uri: image_urls[index],
                      }}
                      style={{
                        ...getMediaDimensions(media, {
                          maxHeight: SCREEN_WIDTH / 2,
                          maxWidth: SCREEN_WIDTH,
                        }),
                      }}
                    />
                  </CarouselItemContainer>
                </Pressable>
              );
            })}
          </ScrollView>
        </>
      </Pressable>
      <OuterRowContainer>
        <InteractionContainer>
          <LikeButton postId={post.postId} />
          <Typography.TextS.regular color={theme.colors.text200}>
            {post.likes}
          </Typography.TextS.regular>
        </InteractionContainer>
        <InteractionContainer>
          <Pressable
            hitSlop={{ bottom: 16, left: 16, right: 16, top: 16 }}
            onPress={() => {
              navigate("Comments", { postId: post.postId });
            }}
          >
            <Icon
              name="comment"
              type="material"
              size={24}
              color={theme.colors.text200}
            />
          </Pressable>
          <Typography.TextS.regular color={theme.colors.text200}>
            {post.nbComments}
          </Typography.TextS.regular>
        </InteractionContainer>
      </OuterRowContainer>
    </PostContainer>
  );
};

export const WorkoutPostSkeleton: React.FC = () => {
  const theme = useTheme();
  return (
    <PostContainer>
      <OuterRowContainer style={{ backgroundColor: theme.colors.primary500 }}>
        <PersonContainer>
          <Skeleton
            animation="wave"
            circle
            height={32}
            width={32}
            style={{ marginRight: 8 }}
          />
          <View>
            <Skeleton
              animation="wave"
              circle
              height={20}
              width={120}
              style={{ marginBottom: 4 }}
            />
            <Skeleton circle animation="wave" height={14} width={80} />
          </View>
        </PersonContainer>
      </OuterRowContainer>
      <Separator />
      <DescriptionContainer>
        <Skeleton
          circle
          animation="wave"
          height={20}
          width={200}
          style={{ marginBottom: 8 }}
        />
        <Skeleton circle animation="wave" height={16} width={250} />
      </DescriptionContainer>
      <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
        <TextContentContainer>
          <Skeleton circle animation="wave" height={16} width={150} />
          <Spacer.Vertical gap={4} />
          <Skeleton circle animation="wave" height={14} width={100} />
        </TextContentContainer>
      </View>
      <Spacer.Vertical gap={4} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        <CarouselItemContainer>
          <Skeleton
            animation="wave"
            height={SCREEN_WIDTH / 2}
            width={SCREEN_WIDTH}
          />
        </CarouselItemContainer>
      </ScrollView>
      <Spacer.Vertical gap={4} />
      <OuterRowContainer>
        <InteractionContainer>
          <Skeleton
            circle
            animation="wave"
            height={24}
            width={24}
            style={{ marginBottom: 4 }}
          />
        </InteractionContainer>
        <InteractionContainer>
          <Skeleton
            circle
            animation="wave"
            height={24}
            width={24}
            style={{ marginBottom: 4 }}
          />
        </InteractionContainer>
      </OuterRowContainer>
    </PostContainer>
  );
};

const CarouselItemContainer = styled.View({
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  width: SCREEN_WIDTH,
});

const PostContainer = styled.View<{ isHighlighted?: boolean }>(({ theme }) => ({
  backgroundColor: theme.colors.primary200,
}));

const TextContentContainer = styled.View({
  flex: 1,
});

const PersonContainer = styled.Pressable({
  flexDirection: "row",
  gap: 8,
  alignItems: "center",
});

const OuterRowContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  paddingHorizontal: 16,
  paddingVertical: 8,
  alignItems: "center",
  backgroundColor: theme.colors.primary200,
}));

const DescriptionContainer = styled.View(({ theme }) => ({
  paddingHorizontal: 16,
  paddingVertical: 8,
  gap: 4,
  backgroundColor: theme.colors.primary200,
}));

const Separator = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.grey300,
}));

const InteractionContainer = styled.View({
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
});

const LikeButton = ({ postId }: { postId: string }) => {
  const theme = useTheme();
  const rotation = useSharedValue(0);
  const size = useSharedValue(24);
  const [post, setPost] = useAtom(postsAtom);
  const isLiked = post[postId].didILike;
  const { likePostQuery, unlikePostQuery } = useLikePost();

  const setIsLiked = (value: boolean) => {
    setPost((prev) => {
      const post = prev[postId];
      return {
        ...prev,
        [postId]: {
          ...post,
          likes: value != isLiked ? post.likes + (value ? 1 : -1) : post.likes,
          didILike: value,
        },
      };
    });
    value ? likePostQuery.mutate(postId) : unlikePostQuery.mutate(postId);
  };
  const [isAnimating, setIsAnimating] = useState(false);

  const fireAnimation = () => {
    if (isAnimating) return;
    runOnJS(setIsAnimating)(true);
    rotation.value = withTiming(
      360,
      {
        duration: 800,
        easing: Easing.bezier(0.68, 0, 0.27, 1),
      },
      () => {
        rotation.value = 0;
        runOnJS(setIsAnimating)(false);
      }
    );
    size.value = withTiming(
      100,
      {
        duration: 400,
        easing: Easing.bezier(0.68, 0, 0.27, 1),
      },
      () => {
        runOnJS(setIsLiked)(!isLiked);
        size.value = withTiming(24, {
          duration: 400,
          easing: Easing.bezier(0.68, 0, 0.27, 1),
        });
      }
    );
  };

  const animatedRotation = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
      height: size.value,
      width: size.value,
    };
  });
  return (
    <Pressable
      onPress={fireAnimation}
      hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
    >
      <Muscle
        style={animatedRotation}
        color={isLiked ? theme.colors.CTA500 : theme.colors.text200}
        fill={isLiked ? theme.colors.CTA500 : "transparent"}
      />
    </Pressable>
  );
};

const Muscle = Animated.createAnimatedComponent(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  forwardRef((props: SvgProps, ref) => <MuscledArmIcon {...props} />)
);

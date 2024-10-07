import { RootComment as RootCommentType } from "#modules/social/domain/comment.types";
import { replyingToAtom } from "#modules/social/view/comments.store";

import { usePublicUser } from "#modules/social/view/usePublicUser";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Skeleton } from "@rneui/base";
import { Avatar } from "@rneui/themed";
import { useSetAtom } from "jotai";
import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { DeviceEventEmitter, Pressable, View } from "react-native";

export const FOCUS_COMMENT_INPUT = "FOCUS_COMMENT_INPUT";

export const RootComment = ({ comment }: { comment: RootCommentType }) => {
  const theme = useTheme();
  const [showReplies, setShowReplies] = useState(false);
  const setReplyingTo = useSetAtom(replyingToAtom);
  const { t } = useTranslation("social");
  return (
    <Suspense fallback={<CommentSkeleton />}>
      <View>
        <BaseComment comment={comment} />
        <CommentInteractionsContainer>
          <CommentInteractionContainer>
            {!!comment.replies.length && (
              <Pressable onPress={() => setShowReplies((prev) => !prev)}>
                <Typography.TextS.regular color={theme.colors.grey300}>
                  {showReplies
                    ? t("comments.hideReplies")
                    : t("comments.showReplies", {
                        count: comment.replies.length,
                      })}
                </Typography.TextS.regular>
              </Pressable>
            )}
          </CommentInteractionContainer>
          <CommentInteractionContainer>
            <Pressable
              onPress={() => {
                setReplyingTo(comment);
                DeviceEventEmitter.emit(FOCUS_COMMENT_INPUT);
              }}
            >
              <Typography.TextS.regular color={theme.colors.grey300}>
                {t("comments.reply")}
              </Typography.TextS.regular>
            </Pressable>
          </CommentInteractionContainer>
        </CommentInteractionsContainer>
        <RepliesContainer>
          {showReplies &&
            comment.replies.map((reply) => (
              <Suspense key={reply.commentId} fallback={<CommentSkeleton />}>
                <ReplyComment comment={reply} />
              </Suspense>
            ))}
        </RepliesContainer>
      </View>
    </Suspense>
  );
};

const ReplyComment = ({ comment }: { comment: RootCommentType }) => {
  return <BaseComment comment={comment} />;
};

const BaseComment = ({ comment }: { comment: RootCommentType }) => {
  const theme = useTheme();
  const { data: user } = usePublicUser(comment.userId);
  return (
    <CommentContainer>
      <Avatar size={24} rounded source={{ uri: user.profilePictureURL }} />
      <Spacer.Horizontal gap={8} />
      <CommentContentContainer>
        <Typography.TextM.bold color={theme.colors.CTA300}>
          {user.username}
        </Typography.TextM.bold>
        <Typography.TextS.regular color={theme.colors.grey100}>
          {comment.content}
        </Typography.TextS.regular>
      </CommentContentContainer>
    </CommentContainer>
  );
};

const CommentContainer = styled.View({
  flexDirection: "row",
  paddingVertical: 8,
  width: "100%",
});
const CommentContentContainer = styled.View({
  gap: 2,
});

const RepliesContainer = styled.View({
  paddingLeft: 16,
});
const CommentInteractionsContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  paddingHorizontal: 8,
});

const CommentInteractionContainer = styled.View({
  flex: 1,
});

const CommentSkeleton = () => {
  return (
    <CommentContainer>
      <Skeleton
        style={{ height: 24, width: 24, borderRadius: 24 }}
        animation="pulse"
      />
      <Spacer.Horizontal gap={8} />
      <CommentContentContainer>
        <Skeleton
          style={{ height: 16, width: 100, borderRadius: 8 }}
          animation="pulse"
        />
        <Spacer.Vertical gap={2} />
        <Skeleton
          style={{ height: 16, width: 200, borderRadius: 8 }}
          animation="pulse"
        />
      </CommentContentContainer>
    </CommentContainer>
  );
};

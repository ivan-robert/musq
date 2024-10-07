import { RootComment as RootCommentType } from "#modules/social/domain/comment.types";
import { FOCUS_COMMENT_INPUT, RootComment } from "#modules/social/view/Comment";
import {
  commentContentAtom,
  replyingToAtom,
} from "#modules/social/view/comments.store";
import { useFetchComments } from "#modules/social/view/useFetchComments";
import { usePostComment } from "#modules/social/view/usePostComment";
import { usePublicUser } from "#modules/social/view/usePublicUser";
import CrossIcon from "#shared/icons/CrossIcon";
import { SendIcon } from "#shared/icons/SendIcon";
import { KeyboardAvoidingView } from "#shared/view/KeyboardAvoidingView";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";

import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import {
  DeviceEventEmitter,
  Keyboard,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  postId: string;
};

export const Comments: React.FC<Props> = ({ postId }) => {
  const { data: comments } = useFetchComments(postId);

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <CommentsContainer
            contentContainerStyle={{ gap: 8, paddingBottom: 24 }}
          >
            {comments?.map((comment) => (
              <RootComment comment={comment} key={comment.commentId} />
            ))}
          </CommentsContainer>
          <CommentKeyboard postId={postId} />
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const ReplyingToComment = ({ comment }: { comment: RootCommentType }) => {
  const theme = useTheme();
  const { data: author } = usePublicUser(comment.userId);
  const setReplyingTo = useSetAtom(replyingToAtom);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}
      >
        <View>
          <Typography.TextS.bold color={theme.colors.text500}>
            {author.username}
          </Typography.TextS.bold>
          <Typography.TextS.regular color={theme.colors.grey100}>
            {comment.content}
          </Typography.TextS.regular>
        </View>
        <Spacer.Flex />
        <Pressable
          onPress={() => {
            setReplyingTo(null);
          }}
        >
          <CrossIcon height={24} width={24} color={theme.colors.grey200} />
        </Pressable>
      </View>
    </View>
  );
};

const CommentKeyboard: React.FC<Props> = ({ postId }) => {
  const [commentContent, setCommentContent] = useAtom(commentContentAtom);
  const theme = useTheme();
  const [replyingTo] = useAtom(replyingToAtom);
  const inputRef = useRef<TextInput>(null);
  const { mutate: post, isPending } = usePostComment(postId);
  const isMessageValid = commentContent.trim().length > 0;

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      FOCUS_COMMENT_INPUT,
      () => {
        inputRef.current?.focus();
      }
    );
    return subscription.remove;
  }, []);

  return (
    <WritingView>
      {!!replyingTo && <ReplyingToComment comment={replyingTo} />}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MessageInputContainer>
          <MessageInput
            ref={inputRef}
            multiline
            value={commentContent}
            onChangeText={setCommentContent}
          />
        </MessageInputContainer>
        <Spacer.Horizontal gap={8} />
        <SendPressable
          isDisabled={!isMessageValid || isPending}
          disabled={!isMessageValid || isPending}
          onPress={() => {
            post({ content: commentContent });
          }}
        >
          <SendIcon
            height={24}
            width={24}
            color={isMessageValid ? theme.colors.CTA300 : theme.colors.grey300}
          />
        </SendPressable>
      </View>
    </WritingView>
  );
};

const CommentsContainer = styled.ScrollView({
  flex: 1,
  paddingHorizontal: 8,
  paddingVertical: 8,
});

const MessageInput = styled.TextInput(({ theme }) => ({
  fontFamily: theme.fonts["Montserrat-Regular"],
  padding: 8,
  fontSize: 16,
}));

const MessageInputContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.white,
  paddingHorizontal: 8,
  flex: 1,
  paddingVertical: 4,
  borderRadius: 16,
  maxHeight: 100,
}));

const WritingView = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.primary200,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: 8,
  paddingVertical: 4,
}));

const SendPressable = styled.Pressable<{ isDisabled: boolean }>(
  ({ theme, isDisabled }) => ({
    backgroundColor: isDisabled ? theme.colors.grey100 : theme.colors.CTA300,
    padding: 8,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  })
);

import { useSupabaseClient } from "#app/supabaseClient";
import {
  Message as MessageType,
  messageContentSchema,
} from "#modules/Profile/Params/Support/domain/message.types";
import {
  subscribeToMessageInChannelAPI,
  unsubscribeFromMessagesAPI,
} from "#modules/Profile/Params/Support/infra/fetchMessages.api";
import { useFetchMessages } from "#modules/Profile/Params/Support/view/useFetchMessages";
import { useSendMessage } from "#modules/Profile/Params/Support/view/useSendMessage";
import { useUpsertChannelRole } from "#modules/Profile/Params/Support/view/useUpsertChannelRole";
import { useUserContext } from "#modules/auth/context/User.context";
import { SendIcon } from "#shared/icons/SendIcon";
import { KeyboardAvoidingView } from "#shared/view/KeyboardAvoidingView";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import React, { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";

type Props = {
  channelId: string;
};
export const MessageReader: React.FC<Props> = ({ channelId }) => {
  const client = useSupabaseClient();
  const theme = useTheme();
  const { data: messageData, fetchNextPage } = useFetchMessages(channelId);
  const { user } = useUserContext();
  const fetchNextMessages = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const { mutate: updateChannelRole } = useUpsertChannelRole(channelId);

  const messageForm = useForm({
    defaultValues: { message: "" },
    resolver: zodResolver(messageContentSchema),
  });

  const { mutate: postMessage } = useSendMessage(channelId);

  const sendMessage = messageForm.handleSubmit((data) => {
    postMessage({ channelId, message: data.message.trim() });
    messageForm.reset();
  });

  useEffect(() => {
    const lastMessage = messageData.pages[0]?.[0];
    if (lastMessage) {
      updateChannelRole(lastMessage.messageId);
    }
  }, [messageData, updateChannelRole]);

  useEffect(() => {
    subscribeToMessageInChannelAPI(client, channelId, user.id);

    return () => unsubscribeFromMessagesAPI(client, channelId);
  }, [channelId, client, user]);

  const flatMessages = messageData.pages.flat() ?? [];

  return (
    <KeyboardAvoidingView>
      <FlatList
        ItemSeparatorComponent={MessageSeparator}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          paddingVertical: 16,
        }}
        inverted
        keyExtractor={(item) => item.creationDate.toISOString() + item.userId}
        onEndReached={fetchNextMessages}
        data={flatMessages}
        renderItem={({ item, index }) => (
          <Message
            item={item}
            previousMessage={flatMessages[index + 1] ?? null}
          />
        )}
      />

      <WritingSectionContainer>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Controller
            control={messageForm.control}
            name="message"
            render={({ field: { value, onChange } }) => {
              return (
                <MessageInputContainer>
                  <MessageInput
                    multiline
                    value={value}
                    onChangeText={onChange}
                  />
                </MessageInputContainer>
              );
            }}
          />
          <Spacer.Horizontal gap={8} />
          <SendPressable
            onPress={sendMessage}
            isDisabled={!messageForm.formState.isValid}
            disabled={!messageForm.formState.isValid}
          >
            <SendIcon
              height={24}
              width={24}
              color={
                messageForm.formState.isValid
                  ? theme.colors.CTA300
                  : theme.colors.grey200
              }
            />
          </SendPressable>
        </View>
      </WritingSectionContainer>
    </KeyboardAvoidingView>
  );
};

type MessageProps = {
  item: MessageType;
  previousMessage: MessageType | null;
};

const Message = React.memo(
  ({ item: message, previousMessage }: MessageProps) => {
    const { t } = useTranslation("profile");
    const { user } = useUserContext();
    const isMe = user.id === message.userId;
    const theme = useTheme();
    const showDate =
      !previousMessage ||
      DateTime.fromJSDate(previousMessage.creationDate)
        .startOf("day")
        .diff(DateTime.fromJSDate(message.creationDate).startOf("day"))
        .as("days") !== 0;

    const showName =
      !previousMessage || previousMessage.userId !== message.userId;

    const showTime =
      message.creationDate.getTime() -
        (previousMessage?.creationDate.getTime() ?? 0) >
      1000 * 30;
    return (
      <>
        <MessageContainer isMine={isMe}>
          <Typography.TextS.regular>{message.content}</Typography.TextS.regular>
        </MessageContainer>
        <MetaDataContainer
          style={{
            alignSelf: isMe ? "flex-end" : "flex-start",
            paddingHorizontal: 8,
          }}
        >
          {showName && (
            <Typography.TextS.regular color={theme.colors.text500}>
              {message.userId === user.id ? t("you") : message.userName},{" "}
            </Typography.TextS.regular>
          )}
          {showTime && (
            <Typography.TextS.regular color={theme.colors.text500}>
              {message.creationDate.toLocaleString("fr-FR", {
                hour: "2-digit", // 00, 01, ..., 23
                minute: "2-digit", // 00, 01, ..., 59
                hour12: false, // Use 24-hour clock
              })}
            </Typography.TextS.regular>
          )}
        </MetaDataContainer>
        {showDate && (
          <DateContainer>
            <Typography.TextM.regular color={theme.colors.text500}>
              {message.creationDate.toLocaleString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Typography.TextM.regular>
          </DateContainer>
        )}
      </>
    );
  }
);

const MessageContainer = styled.View<{ isMine: boolean }>(
  ({ isMine, theme }) => ({
    alignSelf: isMine ? "flex-end" : "flex-start",
    borderRadius: 16,
    backgroundColor: isMine ? theme.colors.CTA300 : theme.colors.secondary300,
    maxWidth: "70%",
    padding: 8,
  })
);

const MetaDataContainer = styled.View({
  flexDirection: "row",
  gap: 8,
});

const DateContainer = styled.View({
  alignSelf: "center",
});

const MessageSeparator = React.memo(() => <Spacer.Vertical gap={8} />);

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

const WritingSectionContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.black,
  padding: 8,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
}));

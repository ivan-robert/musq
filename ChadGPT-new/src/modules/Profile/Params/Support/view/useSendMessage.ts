import { useSupabaseClient } from "#app/supabaseClient";
import { Message } from "#modules/Profile/Params/Support/domain/message.types";
import { adaptMessage } from "#modules/Profile/Params/Support/infra/message.adapter";
import { sendMessage } from "#modules/Profile/Params/Support/infra/sendMessgae.api";
import { useUserDataContext } from "#modules/auth/context/UserData.context";
import { queryClient } from "#shared/service/queryClient";
import { InfiniteData, useMutation } from "@tanstack/react-query";

const getSendMessageMutationKey = (channelId: string) => [
  "SEND_MESSAGE",
  channelId,
];

export const useSendMessage = (channelId: string) => {
  const client = useSupabaseClient();
  const { username } = useUserDataContext();
  return useMutation({
    onSuccess: (data, { channelId }) => {
      if (!data) return;
      queryClient.setQueryData(
        ["fetchMessages", channelId],
        (oldData: InfiniteData<Message[]>) => {
          const yo: InfiniteData<Message[]> = {
            ...oldData,
            pages: [
              [
                adaptMessage(
                  {
                    ...data,
                    username,
                  },
                  username
                ),
              ],
              ...oldData.pages,
            ],
          };
          return yo;
        }
      );
    },
    mutationFn: async ({
      channelId,
      message,
    }: {
      channelId: string;
      message: string;
    }) => await sendMessage(client, { channelId, message }),
    mutationKey: getSendMessageMutationKey(channelId),
  });
};

import { useSupabaseClient } from "#app/supabaseClient";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import { Logger } from "#shared/service/logger.service";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";

type Arguments = {
  channelName: string;
  creatorId: string;
  message: string;
};

export const useCreateSupportChannel = () => {
  const supabaseClient = useSupabaseClient();
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  const { data, isPending, isError, mutate } = useMutation({
    mutationFn: async ({ channelName, message }: Arguments) => {
      const { data } = await callEdgeFunction<string>(
        supabaseClient,
        "api/profile/channel/create",
        { body: { channel_name: channelName, is_support: true } }
      );

      if (!data) {
        throw new Error("Failed to create channel");
      }

      await callEdgeFunction(
        supabaseClient,
        `api/profile/channel/${data}/send-message`,
        { method: "POST", body: { message } }
      );

      return { channelId: data, channelName };
    },
    mutationKey: ["CREATE_CHANNEL"],
    onSuccess: ({ channelId, channelName }) => {
      Logger.info(`Channel created with id ${channelId}`);
      navigate("MessageChannel", { channelId, channelName });
    },
  });
  return {
    createChannel: mutate,
    data,
    isError,
    isPending,
  };
};

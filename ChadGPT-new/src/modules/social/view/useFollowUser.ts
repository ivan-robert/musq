import { useSupabaseClient } from "#app/supabaseClient";
import { useUserContext } from "#modules/auth/context/User.context";
import { PublicUser } from "#modules/social/domain/publicUser.types";
import {
  followUserAPI,
  unFollowUserAPI,
} from "#modules/social/infra/followUser.api";
import { getFetchPostsQueryKey } from "#modules/social/view/useFetchPosts";
import { Logger } from "#shared/service/logger.service";
import { queryClient } from "#shared/service/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useFollowUser = (user_id: string) => {
  const supabaseClient = useSupabaseClient();
  const { t } = useTranslation();
  const { user: selfUser } = useUserContext();
  return useMutation({
    mutationKey: ["followUser", user_id],
    mutationFn: async () => {
      return await followUserAPI(supabaseClient, selfUser.id, user_id);
    },
    onSuccess: async () => {
      await queryClient.setQueryData(
        ["publicUser", user_id],
        (prev: PublicUser) => {
          return { ...prev, isFollowing: true };
        }
      );
      await queryClient.refetchQueries({ queryKey: ["publicUser", user_id] });
      await queryClient.refetchQueries({
        queryKey: getFetchPostsQueryKey(selfUser.id),
      });
    },
    onError: (error) => {
      Logger.error(error.message);
      alert(t("errorWhenFollowing"));
    },
  });
};

export const useUnfollowUser = (user_id: string) => {
  const supabaseClient = useSupabaseClient();
  const { t } = useTranslation();
  const { user: selfUser } = useUserContext();
  return useMutation({
    mutationKey: ["unfollowUser", user_id],
    mutationFn: async () => {
      return await unFollowUserAPI(supabaseClient, selfUser.id, user_id);
    },
    onSuccess: async () => {
      await queryClient.setQueryData(
        ["publicUser", user_id],
        (prev: PublicUser) => {
          return { ...prev, isFollowing: false };
        }
      );
      await queryClient.refetchQueries({ queryKey: ["publicUser", user_id] });
      await queryClient.refetchQueries({
        queryKey: getFetchPostsQueryKey(selfUser.id),
      });
    },
    onError: (error) => {
      Logger.error(error.message);
      alert(t("errorWhenUnfollowing"));
    },
  });
};

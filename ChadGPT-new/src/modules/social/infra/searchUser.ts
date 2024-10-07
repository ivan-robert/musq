import { SupabaseClient } from "@supabase/supabase-js";
import { DEFAULT_PICTURE_URI } from "#modules/social/domain/constants";
import { SearchedPublicUser } from "#modules/social/domain/publicUser.types";
import { PublicUserDTO } from "#modules/social/infra/publicUser.dto";
import { callEdgeFunction } from "#shared/infra/requestHandler";
import axios from "axios";

const searchUserAPI = async (
  supabaseClient: SupabaseClient,
  search: string,
  limit: number,
  offset: number
): Promise<PublicUserDTO[]> => {
  const { data, error } = await callEdgeFunction<PublicUserDTO[]>(
    supabaseClient,
    axios.getUri({
      url: "api/social/user/search",
      params: { q: search, limit, offset },
    }),
    { method: "GET" }
  );

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  return data;
};

const adaptSearchedUser = (
  supabaseClient: SupabaseClient,
  user: PublicUserDTO
): SearchedPublicUser => {
  const { data } = user.profile_picture_filename
    ? supabaseClient.storage
        .from(`profiles/${user.clerk_id}`)
        .getPublicUrl(`${user.profile_picture_filename}`)
    : { data: null };

  const profilePictureURL = data ? data.publicUrl : DEFAULT_PICTURE_URI;

  return {
    bio: user.bio,
    profilePictureURL,
    username: user.username,
    user_id: user.clerk_id,
  };
};

export const searchUserConnector = async (
  supabaseClient: SupabaseClient,
  search: string,
  limit: number,
  offset: number
) => {
  const users = await searchUserAPI(supabaseClient, search, limit, offset);
  return users.map((user) => adaptSearchedUser(supabaseClient, user));
};

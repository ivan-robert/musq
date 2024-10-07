import { Tables } from "#shared/infra/types/db/database.types.ts";
import { Post } from "#shared/infra/types/post.dto.ts";
import { get_workouts } from "#functions/api/workouts/fetch-workouts/infra/api/fetch-workouts.ts";
import { supabase_client } from "#shared/client/supabaseClient.ts";
import { WorkoutDTO } from "#shared/infra/types/seance.dto.ts";
import { get_public_user_map } from "#functions/api/profile/fetch-public-user.ts";
import { adapt_media } from "#functions/api/posts/validators/media.adapter.ts";
import { User } from "@clerk/backend";
import { uniq } from "@lodash";

export const adaptPosts = async (
  posts: (Tables<"posts"> & { seances: Tables<"seances"> | null } & {
    media: Tables<"media">[];
  })[],
  querying_user: User
): Promise<Post[]> => {
  const finalPosts: Post[] = [];
  const workout_ids = posts
    .map((post) => post.seances?.seance_id!)
    .filter(Boolean);

  const all_workouts = await get_workouts(workout_ids);

  const workout_map = all_workouts.reduce<Record<string, WorkoutDTO>>(
    (acc, workout) => {
      acc[workout.id!] = workout;
      return acc;
    },
    {}
  );

  const { data: myLikes } = await supabase_client
    .from("likes")
    .select("*")
    .eq("user_clerk_id", querying_user.id)
    .in(
      "post_id",
      posts.map((post) => post.post_id)
    );
  if (!myLikes) throw new Error("No likes found");

  const likesMap = myLikes.reduce((acc, like) => {
    acc[like.post_id!] = true;
    return acc;
  }, {} as Record<string, boolean>);

  const users_map = await get_public_user_map(
    uniq(posts.map((post) => post.user_clerk_id!)),
    querying_user
  );

  for (const post of posts) {
    if (!post.seances)
      throw new Error("No workout found, STANDALONE POSTS NOT YET IMPLEMENTED");
    const nbComments = (
      await supabase_client
        .from("comments")
        .select("*")
        .eq("post_id", post.post_id!)
        .throwOnError()
    ).data?.length;

    const likes = (
      await supabase_client
        .from("likes")
        .select("*")
        .eq("post_id", post.post_id!)
    ).data?.length;

    const final_post: Post = {
      createdAt: post.created_at!,
      title: post.title!,
      description: post.description!,
      media: post.media.map(adapt_media),
      posted_by: users_map[post.user_clerk_id!],
      postId: post.post_id!,
      workout: workout_map[post.seances.seance_id!],
      didILike: likesMap[post.post_id!] ?? false,
      likes: likes ?? 0,
      nbComments: nbComments ?? 0,
    };
    finalPosts.push(final_post);
  }

  return finalPosts;
};

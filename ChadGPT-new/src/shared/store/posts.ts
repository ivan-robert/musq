import { Post } from "#modules/social/domain/post.types";
import { PrimitiveAtom, atom } from "jotai";

type PostsMap = Record<string, Post>;

export const postsAtom: PrimitiveAtom<PostsMap> = atom({});

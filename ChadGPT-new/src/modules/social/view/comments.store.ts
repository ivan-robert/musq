import { RootComment } from "#modules/social/domain/comment.types";
import { atom } from "jotai";

export const replyingToAtom = atom<RootComment | null>(null);
export const commentContentAtom = atom<string>("");

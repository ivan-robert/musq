import { PublicUser } from "#modules/social/domain/publicUser.types";
import { atom } from "jotai";

type PublicUsersMap = Record<string, PublicUser>;

export const publicUsersAtom = atom<PublicUsersMap>({});

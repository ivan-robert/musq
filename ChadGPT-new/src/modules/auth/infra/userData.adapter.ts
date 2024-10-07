import { UserData } from "#modules/auth/domain/userData.types";
import { userDataDto } from "#modules/auth/infra/userData.dto";

const adaptPublicUrl = (publicUrl: string): string => {
  return publicUrl.replace("public/public/", "public/");
};

export const adaptUserData = (userData: userDataDto): UserData => {
  return {
    username: userData.username,
    profilePicture: userData.profilePicture
      ? {
          publicUrl: adaptPublicUrl(userData.profilePicture.publicUrl),
        }
      : null,
  };
};

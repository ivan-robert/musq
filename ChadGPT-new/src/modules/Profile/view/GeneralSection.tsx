import { useUserContext } from "#modules/auth/context/User.context";
import { useUserDataContext } from "#modules/auth/context/UserData.context";
import { useUploadProfilePicture } from "#modules/auth/view/useUploadProfilePicture";
import { queryClient } from "#shared/service/queryClient";
import { imagePicker } from "#shared/service/storage/ImagePicker.service";
import { hex2rgba } from "#shared/utils/hex2rgba";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { DialogLoading } from "@rneui/base/dist/Dialog/Dialog.Loading";
import { Icon } from "@rneui/themed";
import { useEffect } from "react";

import { Pressable, View } from "react-native";

export const GeneralSection = () => {
  const { user } = useUserContext();
  const { username, profilePicture } = useUserDataContext();
  const { mutate: upload, isPending: isUploading } = useUploadProfilePicture();

  const imageSource =
    isUploading || !profilePicture
      ? require("#assets/no-image.jpg")
      : { uri: profilePicture.publicUrl };

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["userdata", user.id] });
  }, [profilePicture?.publicUrl, user.id]);

  const theme = useTheme();
  return (
    <ProfileContainer>
      <Pressable
        onPress={async () => {
          const file = await imagePicker.pickImage();
          if (!file || !file.length) return;

          return upload(file[0]);
        }}
      >
        <ProfilePictureContainer>
          <EditIcon />
          <ProfileImage
            style={{
              opacity: isUploading ? 0.4 : undefined,
            }}
            source={imageSource}
          />
          {isUploading && (
            <View
              style={{
                position: "absolute",
              }}
            >
              <DialogLoading loadingProps={{ color: theme.colors.grey200 }} />
            </View>
          )}
        </ProfilePictureContainer>
      </Pressable>
      <Spacer.Vertical gap={16} />
      <Typography.TextL.regular color={theme.colors.text500}>
        {username}
      </Typography.TextL.regular>
      <Typography.TextM.regular color={theme.colors.text200}>
        {user.primaryEmailAddress?.emailAddress}
      </Typography.TextM.regular>
    </ProfileContainer>
  );
};

const EditIcon = () => {
  const theme = useTheme();
  return (
    <IconContainer>
      <Icon type="material" name="edit" color={theme.colors.black} size={16} />
    </IconContainer>
  );
};

const IconContainer = styled.View(({ theme }) => ({
  borderRadius: 1000000,
  backgroundColor: theme.colors.grey200,
  padding: 2,
  position: "absolute",
  zIndex: 1,
  bottom: -9,
}));

const ProfileContainer = styled.View({
  alignItems: "center",
});

const ProfileImage = styled.Image({
  width: 100,
  height: 100,
  borderRadius: 1000000,
});

const ProfilePictureContainer = styled.View({
  width: 100,
  height: 100,
  borderRadius: 1000000,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: hex2rgba("#000000"),
});

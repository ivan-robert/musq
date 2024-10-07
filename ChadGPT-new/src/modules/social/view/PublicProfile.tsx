import { useUserContext } from "#modules/auth/context/User.context";
import {
  useFollowUser,
  useUnfollowUser,
} from "#modules/social/view/useFollowUser";
import { usePublicUser } from "#modules/social/view/usePublicUser";
import { Loader } from "#shared/view/components/Loader/Loader";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Avatar } from "@rneui/base";
import { Button, Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type Props = {
  user_id: string;
};
export const PublicProfile: React.FC<Props> = ({ user_id }) => {
  const theme = useTheme();
  const { user: selfUser } = useUserContext();
  const { data: user } = usePublicUser(user_id);

  console.log("user", user);

  return (
    <Container>
      <Avatar rounded size={64} source={{ uri: user.profilePictureURL }} />
      <Typography.TitleL.regular color={theme.colors.text500}>
        {user.username}
      </Typography.TitleL.regular>
      <Spacer.Vertical gap={16} />
      <View style={{ flexDirection: "row" }}>
        {selfUser.id !== user.user_id && !user.isFollowed && (
          <FollowButton user_id={user.user_id} />
        )}

        {selfUser.id !== user.user_id && user.isFollowed && (
          <UnFollowButton user_id={user.user_id} />
        )}
      </View>
    </Container>
  );
};

type FollowButtonProps = {
  user_id: string;
};

const FollowButton = ({ user_id }: FollowButtonProps) => {
  const { t } = useTranslation("social");
  const theme = useTheme();
  const { mutate: follow, isPending } = useFollowUser(user_id);

  return (
    <Button color={theme.colors.CTA500} radius={16} onPress={() => follow()}>
      <Typography.TextS.regular color={theme.colors.text500}>
        {t("follow")}
      </Typography.TextS.regular>
      <Spacer.Horizontal gap={4} />
      {!isPending ? (
        <Icon
          name="add"
          type="material"
          size={16}
          color={theme.colors.text500}
        />
      ) : (
        <Loader height={16} width={16} color={theme.colors.text500} />
      )}
    </Button>
  );
};

const UnFollowButton = ({ user_id }: FollowButtonProps) => {
  const { t } = useTranslation("social");
  const theme = useTheme();
  const { mutate: unFollow, isPending } = useUnfollowUser(user_id);

  return (
    <Button
      color={theme.colors.statusSuccess}
      radius={16}
      onPress={() => unFollow()}
    >
      <Typography.TextS.regular color={theme.colors.black}>
        {t("followed")}
      </Typography.TextS.regular>
      <Spacer.Horizontal gap={4} />
      {!isPending ? (
        <Icon
          name="done-all"
          type="material"
          size={16}
          color={theme.colors.black}
        />
      ) : (
        <Loader height={16} width={16} />
      )}
    </Button>
  );
};

const Container = styled.View({ flex: 1, alignItems: "center" });

import { PublicUser } from "#modules/social/domain/publicUser.types";
import { useFollowedUsers } from "#modules/social/view/useFollowedUsers";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { ShowArrowIcon } from "#shared/icons/ShowArrowIcon";
import { publicUsersAtom } from "#shared/store/publicUsers";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Avatar, Skeleton } from "@rneui/base";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl } from "react-native";

type Props = {
  userId: string;
};

export const UsersFollowed: React.FC<Props> = ({ userId }) => {
  const { t } = useTranslation("social");
  const theme = useTheme();
  const {
    data: users,
    fetchNextPage,
    isPending,
    refetch,
  } = useFollowedUsers(userId);
  const [publicUsers] = useAtom(publicUsersAtom);

  const flatUsers = users.pages.flat();

  if (!flatUsers.length) {
    return (
      <Container style={{ justifyContent: "center", alignItems: "center" }}>
        <Typography.TextS.regular color={theme.colors.text500}>
          {t("noUsersFollowed")}
        </Typography.TextS.regular>
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        data={flatUsers}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refetch}
            tintColor={theme.colors.CTA300}
          />
        }
        onEndReached={() => fetchNextPage()}
        ListFooterComponent={() =>
          isPending ? (
            <>
              <UserViewSkeleton />
              <UserViewSkeleton />
              <UserViewSkeleton />
            </>
          ) : null
        }
        renderItem={({ item }) => <UserView user={publicUsers[item.user_id]} />}
      />
    </Container>
  );
};

const UserView = ({ user }: { user: PublicUser }) => {
  const theme = useTheme();
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  return (
    <UserDataContainer
      onPress={() => {
        navigate("PublicProfile", { userId: user.user_id });
      }}
    >
      <Avatar size={24} rounded source={{ uri: user.profilePictureURL }} />
      <Spacer.Horizontal gap={8} />
      <Typography.TextM.bold color={theme.colors.text500}>
        {user.username}
      </Typography.TextM.bold>
      <Spacer.Flex />
      <ShowArrowIcon height={16} width={16} color={theme.colors.grey100} />
    </UserDataContainer>
  );
};

const UserViewSkeleton = () => {
  const theme = useTheme();
  return (
    <UserDataContainer>
      <Skeleton
        style={{ height: 24, width: 24, borderRadius: 24 }}
        animation="pulse"
      />
      <Spacer.Horizontal gap={8} />
      <Skeleton
        style={{ height: 12, width: 48, borderRadius: 8 }}
        animation="pulse"
      />
      <Spacer.Flex />
      <ShowArrowIcon height={16} width={16} color={theme.colors.grey100} />
    </UserDataContainer>
  );
};

const Container = styled.View({ flex: 1 });

const UserDataContainer = styled.Pressable({
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical: 16,
});

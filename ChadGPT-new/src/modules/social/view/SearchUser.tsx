// The search is a bit fucked up I have doublons but will fix later

import { SearchedPublicUser } from "#modules/social/domain/publicUser.types";
import { useSearchUser } from "#modules/social/view/useSearchUsers";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SearchBar } from "@rneui/base";
import { Avatar } from "@rneui/themed";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

type UserItemProps = {
  user: SearchedPublicUser;
};

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const theme = useTheme();
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  return (
    <UserContainer
      android_ripple={{ color: theme.colors.grey100 }}
      onPress={() => {
        navigate("PublicProfile", { userId: user.user_id });
      }}
    >
      <Avatar size={32} rounded source={{ uri: user.profilePictureURL }} />
      <Typography.TextM.regular color={theme.colors.text300}>
        {user.username}
      </Typography.TextM.regular>
    </UserContainer>
  );
};

export const SearchUsers: React.FC = () => {
  const theme = useTheme();
  const [text, setText] = useState<string>("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const { data, fetchNextPage, isPending } = useSearchUser(text, shouldSearch);

  useEffect(() => {
    setShouldSearch(false);
    const debounceTimer = setTimeout(() => {
      setShouldSearch(true);
    }, 500);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [text]);
  const flatUsers = data?.pages.flat();
  if (isPending) {
    return <></>;
  }
  return (
    <>
      <SearchBar
        onChangeText={setText}
        value={text}
        round
        lightTheme={theme.id === "light"}
      />

      <FlatList
        data={flatUsers}
        renderItem={({ item }) => {
          return <UserItem user={item} />;
        }}
        onEndReached={() => fetchNextPage()}
      />
    </>
  );
};

const UserContainer = styled.Pressable(({ theme }) => ({
  flexDirection: "row",
  padding: 16,
  borderBottomColor: theme.colors.primary200,
  alignItems: "center",
  gap: 8,
  borderBottomWidth: 1,
}));

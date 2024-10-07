import { PublicProfile } from "#modules/social/view/PublicProfile";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { useTheme } from "@emotion/react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "@rneui/base";

export const PublicProfilePage: React.FC = () => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { params } =
    useRoute<RouteProp<RootStackNavigatorParamList, "PublicProfile">>();
  return (
    <PageTemplate>
      <Icon
        name="arrow-back"
        type="material"
        size={24}
        color={theme.colors.text500}
        style={{ alignSelf: "flex-start", padding: 16 }}
        onPress={goBack}
      />
      <PublicProfile user_id={params.userId} />
    </PageTemplate>
  );
};

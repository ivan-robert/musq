import { Comments } from "#modules/social/view/Comments";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { PageHeader } from "#shared/view/components/PageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export const CommentsPage: React.FC = () => {
  const {
    params: { postId },
  } = useRoute<RouteProp<RootStackNavigatorParamList, "Comments">>();
  const { goBack } = useNavigation();
  const { t } = useTranslation("social");
  return (
    <PageTemplate>
      <PageHeader
        headerText={t("comments.title")}
        onCrossIconPress={goBack}
        leftIcon={<></>}
      />
      <Comments postId={postId} />
    </PageTemplate>
  );
};

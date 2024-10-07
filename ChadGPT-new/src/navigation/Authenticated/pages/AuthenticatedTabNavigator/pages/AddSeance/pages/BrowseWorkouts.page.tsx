import { useUserContext } from "#modules/auth/context/User.context";
import { PressableFolder } from "#modules/Seance/view/workout-templates/PressableFolder";
import { useUserFolders } from "#modules/Seance/view/workout-templates/useFolder";
import { AddSeanceNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/AddSeanceNavigator.types";
import { PageHeader } from "#shared/view/components/PageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { ScrollView } from "#shared/view/components/ScrollView";
import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const BrowseWorkoutsPage: React.FC = () => {
  const { goBack, navigate } =
    useNavigation<NavigationProp<AddSeanceNavigatorParamList>>();
  const { user } = useUserContext();
  const { data: folders } = useUserFolders(user.id);

  return (
    <PageTemplate>
      <Container>
        <PageHeader headerText="Browse" onGoBackPress={goBack} />
        <ScrollView>
          {folders.map((folder) => (
            <PressableFolder
              key={folder.name}
              folder={folder}
              onPress={() => {
                navigate("folder-content", { folderId: folder.id! });
              }}
            />
          ))}
        </ScrollView>
      </Container>
    </PageTemplate>
  );
};

const Container = styled.View({ flex: 1 });

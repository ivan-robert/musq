import { FolderContentEdition } from "#modules/Seance/view/workout-templates/FolderContentEdition";
import {
  useFolderContent,
  useFolderMeta,
} from "#modules/Seance/view/workout-templates/useFolder";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { NewWorkoutPageHeader } from "#shared/view/components/NewWorkoutPageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { TouchableOpacity } from "react-native";

export const FolderContentEditionPage: React.FC = () => {
  const { params } =
    useRoute<RouteProp<RootStackNavigatorParamList, "folder-content">>();
  const folderId = params.folderId;
  const { data: templates } = useFolderContent(folderId);
  const { data: folder } = useFolderMeta(folderId);
  const { goBack } = useNavigation();
  const theme = useTheme();
  return (
    <PageTemplate topInsetColor={theme.colors.primary500}>
      <Container>
        <NewWorkoutPageHeader
          leftIcon={
            <TouchableOpacity onPress={goBack}>
              <Icon name="arrow-back" size={24} color={theme.colors.text500} />
            </TouchableOpacity>
          }
          title={folder.name}
        />
        <FolderContentEdition content={templates} />
      </Container>
    </PageTemplate>
  );
};

const Container = styled.View({ flex: 1 });

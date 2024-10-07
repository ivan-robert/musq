import { PreparedWorkout } from "#modules/Seance/domain/seance.types";
import { FolderContent } from "#modules/Seance/view/workout-templates/FolderContent";
import { useFolderMeta } from "#modules/Seance/view/workout-templates/useFolder";
import { AddSeanceNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/AddSeanceNavigator.types";
import { useOngoingWorkout } from "#shared/utils/useOngoingWorkout";
import { GoBackArrow } from "#shared/view/components/GoBackArrow";
import { NewWorkoutPageHeader } from "#shared/view/components/NewWorkoutPageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

export const FolderContentPage: React.FC = () => {
  const { params } =
    useRoute<RouteProp<AddSeanceNavigatorParamList, "folder-content">>();
  const theme = useTheme();

  const { data: folder } = useFolderMeta(params.folderId);
  const { saveCurrentTemplate } = useOngoingWorkout();
  const { navigate } =
    useNavigation<NavigationProp<AddSeanceNavigatorParamList>>();

  const selectTemplate = (template: PreparedWorkout) => {
    saveCurrentTemplate(template);
    navigate("new-workout");
  };

  return (
    <PageTemplate topInsetColor={theme.colors.primary500}>
      <Container>
        <NewWorkoutPageHeader leftIcon={<GoBackArrow />} title={folder.name} />
        <FolderContent
          folderId={params.folderId}
          onItemSelect={selectTemplate}
        />
      </Container>
    </PageTemplate>
  );
};

const Container = styled.View({ flex: 1 });

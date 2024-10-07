import { useUserContext } from "#modules/auth/context/User.context";
import { Folder } from "#modules/Seance/domain/folder.types";
import { PressableFolder } from "#modules/Seance/view/workout-templates/PressableFolder";
import { useUserFolders } from "#modules/Seance/view/workout-templates/useFolder";
import {
  useDeleteFolder,
  useUpdateFolder,
} from "#modules/Seance/view/workout-templates/useUpdateFolder";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { hex2rgba } from "#shared/utils/hex2rgba";
import { ConfirmationModal } from "#shared/view/components/ConfirmationModal";
import { ScrollView } from "#shared/view/components/ScrollView";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { useRef, useState } from "react";
import { Modal, Pressable, View } from "react-native";

export const ReadTemplates: React.FC = () => {
  const theme = useTheme();
  const { user } = useUserContext();
  const { data: folders } = useUserFolders(user.id);
  const [actionsFolder, setActionsFolder] = useState<Folder | null>(null);
  const [folderToDelete, setDeleteFolder] = useState<Folder | null>(null);
  const [folderToRename, setFolderToRename] = useState<Folder | null>(null);
  const cursorPosition = useRef({ x: 0, y: 0 });
  const { mutate: deleteFolder } = useDeleteFolder();
  const { mutate: renameFolder } = useUpdateFolder();
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();

  return (
    <>
      <Container>
        <Typography.TitleL.regular color={theme.colors.text500}>
          My templates
        </Typography.TitleL.regular>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingVertical: 16 }}
        >
          {folders.map((folder) => {
            return (
              <PressableFolder
                key={folder.id}
                folder={folder}
                isRenaming={folderToRename?.id === folder.id}
                stopRenaming={() => setFolderToRename(null)}
                onRename={(name) => {
                  renameFolder({ folderId: folder.id!, folder: { name } });
                }}
                isSelected={actionsFolder?.id === folder.id}
                onPress={() => {
                  navigate("folder-content", { folderId: folder.id! });
                }}
                onLongPress={(event) => {
                  cursorPosition.current = {
                    x: event?.nativeEvent.pageX || 0,
                    y: event?.nativeEvent.pageY || 0,
                  };
                  setActionsFolder(folder);
                }}
              />
            );
          })}
        </ScrollView>
      </Container>
      <ActionsModal
        isPublic={actionsFolder?.is_public || false}
        onTogglePublic={() => {
          if (actionsFolder) {
            renameFolder({
              folderId: actionsFolder.id!,
              folder: { is_public: !actionsFolder.is_public },
            });
          }
        }}
        onRename={() => {
          if (actionsFolder) {
            setFolderToRename(actionsFolder);
          }
        }}
        closeModal={() => {
          setActionsFolder(null);
        }}
        isModalVisible={actionsFolder !== null}
        onDelete={() => {
          setDeleteFolder(actionsFolder);
          setActionsFolder(null);
        }}
        position={cursorPosition.current}
      />
      <ConfirmationModal
        title="Delete folder"
        cancelLabel="Cancel"
        confirmLabel="Delete"
        description="Are you sure you want to delete this folder?"
        onConfirm={() => {
          if (folderToDelete?.id) {
            deleteFolder(folderToDelete.id);
            setDeleteFolder(null);
            setActionsFolder(null);
          }
        }}
        isNegative
        isVisble={!!folderToDelete}
        onCancel={() => {
          setDeleteFolder(null);
        }}
      />
    </>
  );
};

const Container = styled.View({ padding: 16, flex: 1 });

type ActionsModalProps = {
  closeModal: () => void;
  isModalVisible: boolean;
  onDelete: () => void;
  onRename: () => void;
  isPublic: boolean;
  onTogglePublic: () => void;
  position: { x: number; y: number };
};

const ActionsModal: React.FC<ActionsModalProps> = ({
  closeModal,
  isModalVisible,
  onDelete,
  onRename,
  position,
  isPublic,
  onTogglePublic,
}) => {
  const theme = useTheme();
  return (
    <Modal visible={isModalVisible} transparent animationType="fade">
      <Pressable
        style={{ flex: 1, backgroundColor: hex2rgba(theme.colors.black, 0.3) }}
        onPress={closeModal}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                top: position.y,
                left: position.x,
                backgroundColor: theme.colors.primary800,
                borderRadius: 8,
                padding: 8,
                gap: 8,
              }}
            >
              <DropdownButton
                style={{
                  backgroundColor: hex2rgba(theme.colors.secondary500, 0.3),
                }}
                onPress={() => {
                  onTogglePublic();
                  closeModal();
                }}
              >
                <Icon
                  name={isPublic ? "visibility-off" : "public"}
                  size={24}
                  color={theme.colors.secondary300}
                />
                <Typography.TextM.regular color={theme.colors.secondary300}>
                  {isPublic ? "Make private" : "Make public"}
                </Typography.TextM.regular>
              </DropdownButton>
              <DropdownButton
                style={{ backgroundColor: hex2rgba(theme.colors.grey300, 0.3) }}
                onPress={() => {
                  onRename();
                  closeModal();
                }}
              >
                <Icon name="edit" size={24} color={theme.colors.grey300} />
                <Typography.TextM.regular color={theme.colors.grey300}>
                  Rename
                </Typography.TextM.regular>
              </DropdownButton>
              <DropdownButton
                style={{
                  backgroundColor: hex2rgba(theme.colors.redDelete, 0.3),
                }}
                onPress={() => {
                  onDelete();
                  closeModal();
                }}
              >
                <Icon name="delete" size={24} color={theme.colors.redDelete} />
                <Typography.TextM.regular color={theme.colors.redDelete}>
                  Delete
                </Typography.TextM.regular>
              </DropdownButton>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const DropdownButton = styled.TouchableOpacity({
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  padding: 16,
  paddingVertical: 8,
  borderRadius: 8,
});

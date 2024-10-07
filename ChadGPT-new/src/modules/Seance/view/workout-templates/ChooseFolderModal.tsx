import styled from "@emotion/native";
import { useTheme } from "@emotion/react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Modal, Pressable, View } from "react-native";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTranslation } from "react-i18next";
import { Folder } from "#modules/Seance/domain/folder.types";
import { useUserFolders } from "#modules/Seance/view/workout-templates/useFolder";
import { useUserContext } from "#modules/auth/context/User.context";
import { Icon } from "@rneui/base";
import { Spacer } from "#shared/view/components/Spacer";
import { Button } from "#shared/view/components/Button/Button";
import { PlusIcon } from "#shared/icons/PlusIcon";
import { useState } from "react";
import { ScrollView } from "#shared/view/components/ScrollView";
import { Input } from "@rneui/themed";
import CrossIcon from "#shared/icons/CrossIcon";
import { hex2rgba } from "#shared/utils/hex2rgba";
import { PressableFolder } from "#modules/Seance/view/workout-templates/PressableFolder";

type ChooseExoModalProps = {
  closeModal: () => void;
  isModalVisible: boolean;
  onFolderSelection: (folder: Folder, fileName: string) => void;
  hideNewName?: boolean;
};

export const ChooseFolderModal = ({
  closeModal,
  isModalVisible,
  onFolderSelection,
  hideNewName,
}: ChooseExoModalProps) => {
  const theme = useTheme();
  const { user } = useUserContext();
  const { data: folders } = useUserFolders(user.id);
  const [newfolder, setNewFolder] = useState<Folder | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [fileName, setFileName] = useState("");

  const clearModal = () => {
    setNewFolder(null);
    closeModal();
  };

  const createFolder = () => {
    setSelectedFolder(null);
    setNewFolder({
      name: "",
      count: 0,
      created_at: new Date().toISOString(),
      is_public: false,
      owner_id: user.id,
    });
  };

  const toggleFolderSelection = (folder: Folder) => {
    if (newfolder) {
      setNewFolder(null);
    }
    setSelectedFolder(selectedFolder?.id === folder.id ? null : folder);
  };

  const allFolders = newfolder ? [newfolder, ...folders] : folders;

  const hasNewFolderError =
    !!newfolder &&
    (!newfolder.name ||
      folders.map((folder) => folder.name).includes(newfolder.name));

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      onRequestClose={clearModal}
    >
      <ContentContainer>
        <View>
          <Typography.TitleL.regular color={theme.colors.text300}>
            Choose a folder
          </Typography.TitleL.regular>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Spacer.Flex />
          <Button.Secondary
            leftIcon={PlusIcon}
            onPress={createFolder}
            text="new"
            isDisabled={!!newfolder}
          />
        </View>
        <Spacer.Vertical gap={16} />
        {!allFolders.length && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.TextM.regular color={theme.colors.text300}>
              No folders
            </Typography.TextM.regular>
          </View>
        )}
        {!!allFolders.length && (
          <ScrollView contentContainerStyle={{ gap: 8 }}>
            {newfolder && (
              <FolderContainer
                style={{
                  borderWidth: hasNewFolderError ? 1 : 0,
                  borderColor: hasNewFolderError
                    ? theme.colors.redDelete
                    : "transparent",
                  backgroundColor: theme.colors.primary500,
                }}
              >
                <FolderContentContainer>
                  <Icon
                    name="folder"
                    size={32}
                    color={
                      newfolder.is_public
                        ? theme.colors.secondary300
                        : theme.colors.text200
                    }
                  />
                  <Spacer.Horizontal gap={8} />
                  <View style={{ flex: 1 }}>
                    <Input
                      placeholder="please name your new folder"
                      placeholderTextColor={hex2rgba(theme.colors.text200, 0.3)}
                      style={{ color: theme.colors.text300 }}
                      value={newfolder.name}
                      onChangeText={(text) => {
                        setNewFolder({
                          ...newfolder,
                          name: text.slice(0, 20),
                        });
                      }}
                    />
                    <Typography.TextS.regular color={theme.colors.text200}>
                      new folder
                    </Typography.TextS.regular>
                  </View>
                  <View style={{ gap: 16 }}>
                    <Pressable
                      onPress={() => {
                        setNewFolder(null);
                      }}
                    >
                      {({ pressed }) => (
                        <View
                          style={{
                            padding: 8,
                            backgroundColor: pressed
                              ? theme.colors.CTA300
                              : theme.colors.redDelete,
                            borderRadius: 8,
                          }}
                        >
                          <CrossIcon
                            height={16}
                            width={16}
                            color={theme.colors.white}
                          />
                        </View>
                      )}
                    </Pressable>
                  </View>
                </FolderContentContainer>
              </FolderContainer>
            )}
            {folders.map((folder) => (
              <PressableFolder
                folder={folder}
                isSelected={selectedFolder?.id === folder.id}
                onPress={() => toggleFolderSelection(folder)}
              />
            ))}
          </ScrollView>
        )}
        {!hideNewName && (
          <>
            <Spacer.Vertical gap={16} />
            <View
              style={{
                borderRadius: 16,
                backgroundColor: theme.colors.primary300,
                padding: 16,
                borderColor: theme.colors.primary500,
                borderWidth: 1,
              }}
            >
              <Input
                style={{ color: theme.colors.text300 }}
                placeholderTextColor={theme.colors.text200}
                placeholder="Please name your workout"
                value={fileName}
                onChangeText={setFileName}
              />
            </View>
          </>
        )}
        <Spacer.Vertical gap={16} />
        <View style={{ flexDirection: "row" }}>
          <CancelButton onPress={clearModal} />
          <Spacer.Horizontal gap={16} />

          <View style={{ flex: 1 }}>
            <Button.Primary
              isDisabled={
                hasNewFolderError ||
                (!hideNewName && !fileName.length) ||
                (!newfolder && !selectedFolder)
              }
              text="save"
              onPress={() => {
                if (!newfolder && !selectedFolder) return;
                clearModal();
                onFolderSelection(newfolder ?? selectedFolder!, fileName);
              }}
            />
          </View>
        </View>
      </ContentContainer>
    </Modal>
  );
};

const CancelButton = ({ onPress }: { onPress: () => void }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderColor: pressed ? theme.colors.black : theme.colors.redDelete,
      })}
    >
      {({ pressed }) => (
        <Typography.TitleM.regular
          color={pressed ? theme.colors.black : theme.colors.redDelete}
        >
          {t("common:actions.cancel")}
        </Typography.TitleM.regular>
      )}
    </Pressable>
  );
};

const ContentContainer = ({ children }: { children: React.ReactNode }) => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.primary200, flex: 1 }}>
      <View
        style={{
          marginTop: top,
          marginBottom: bottom,
          paddingTop: 16,
          paddingBottom: 24,
          paddingHorizontal: 16,
          flex: 1,
        }}
      >
        {children}
      </View>
    </View>
  );
};

const FolderContainer = styled.View(({ theme }) => ({
  padding: 16,
  backgroundColor: theme.colors.primary500,
  borderRadius: 8,
}));

const FolderContentContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
});

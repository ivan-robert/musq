import { Folder } from "#modules/Seance/domain/folder.types";
import { ShowArrowIcon } from "#shared/icons/ShowArrowIcon";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Icon } from "@rneui/base";
import { Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  onPress: () => void;
  folder: Folder;
  isSelected?: boolean;
  onLongPress?: (event?: GestureResponderEvent) => void;
  isRenaming?: boolean;
  stopRenaming?: () => void;
  onRename?: (name: string) => void;
};
export const PressableFolder: React.FC<Props> = ({
  onPress,
  folder,
  isSelected,
  onLongPress,
  isRenaming,
  onRename,
  stopRenaming,
}) => {
  const theme = useTheme();
  const [newName, setNewName] = useState(folder.name);
  useEffect(() => {
    if (isRenaming) setNewName(folder.name);
  }, [isRenaming, folder.name]);
  return (
    <Pressable
      key={folder.created_at}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {({ pressed }) => (
        <FolderContainer
          style={{
            backgroundColor: pressed
              ? theme.colors.primary800
              : theme.colors.primary500,
            borderWidth: 1,
            borderColor: isSelected ? theme.colors.CTA500 : "transparent",
          }}
        >
          <FolderContentContainer>
            <Icon
              name="folder"
              size={32}
              color={
                folder.is_public
                  ? theme.colors.secondary300
                  : theme.colors.text200
              }
            />
            <Spacer.Horizontal gap={8} />
            {!isRenaming && (
              <View style={{ flex: 1 }}>
                <Typography.TextM.regular color={theme.colors.text300}>
                  {folder.name}
                </Typography.TextM.regular>
                <Typography.TextS.regular color={theme.colors.text200}>
                  {folder.count} workouts
                </Typography.TextS.regular>
              </View>
            )}
            {isRenaming && (
              <View style={{ flex: 1 }}>
                <Input
                  value={newName}
                  onChangeText={setNewName}
                  onSubmitEditing={() => {
                    onRename && onRename(newName);
                    stopRenaming && stopRenaming();
                  }}
                  style={{
                    width: 200,
                    backgroundColor: theme.colors.primary500,
                    color: theme.colors.text300,
                  }}
                />
              </View>
            )}
            {!isRenaming ? (
              <ShowArrowIcon
                height={24}
                width={24}
                color={theme.colors.text200}
              />
            ) : (
              <View>
                <TouchableOpacity>
                  <Icon
                    name="check"
                    size={24}
                    color={theme.colors.text200}
                    onPress={() => {
                      onRename && onRename(newName);
                      stopRenaming && stopRenaming();
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    name="close"
                    size={24}
                    color={theme.colors.text200}
                    onPress={stopRenaming}
                  />
                </TouchableOpacity>
              </View>
            )}
          </FolderContentContainer>
        </FolderContainer>
      )}
    </Pressable>
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

import { PreparedWorkout } from "#modules/Seance/domain/seance.types";
import { useDeleteTemplates } from "#modules/Seance/view/workout-templates/useDeleteTemplates";

import { hex2rgba } from "#shared/utils/hex2rgba";
import { ConfirmationModal } from "#shared/view/components/ConfirmationModal";
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
  template: PreparedWorkout;
  isSelected?: boolean;
  onLongPress?: (event?: GestureResponderEvent) => void;
  onRename?: (name: string) => void;
  zindex?: number;
};

export const WorkoutItem: React.FC<Props> = ({
  onPress,
  template,
  isSelected,
  onLongPress,
  zindex,
  onRename,
}) => {
  const theme = useTheme();
  const [newName, setNewName] = useState(template.title);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate: deleteTemplates } = useDeleteTemplates();

  const [areActionsOpen, setActionsOpen] = useState(false);

  useEffect(() => {
    if (isRenaming) setNewName(template.title);
  }, [isRenaming, template.title]);

  const stopRenaming = () => {
    setIsRenaming(false);
  };

  const deleteTemplate = () => {
    deleteTemplates([template.id!]);
  };

  return (
    <>
      <Pressable
        style={{ zIndex: zindex }}
        key={template.created_at}
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
              {!isRenaming && (
                <View style={{ flex: 1 }}>
                  <Typography.TextM.regular color={theme.colors.text300}>
                    {template.title}
                  </Typography.TextM.regular>
                  <Typography.TextS.regular color={theme.colors.text200}>
                    {template.content.length} exercises
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
                <View style={{ position: "relative" }}>
                  {/* Icon to open the actions menu */}
                  <TouchableOpacity
                    onPress={() => setActionsOpen(!areActionsOpen)}
                    style={{ zIndex: 2 }} // Keep the icon above content
                  >
                    <Icon
                      name="more-vert"
                      size={24}
                      color={theme.colors.text200}
                    />
                  </TouchableOpacity>

                  {/* Collapsible Action Buttons, positioned absolutely */}
                  {areActionsOpen && (
                    <>
                      {/* Close the menu when pressing outside */}
                      <Pressable
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 1,
                        }}
                        onPress={() => setActionsOpen(false)}
                        hitSlop={{
                          top: 1000,
                          bottom: 1000,
                          left: 1000,
                          right: 1000,
                        }} // Large hitSlop for closing when clicking outside
                      />

                      <ActionsContainer
                        style={{
                          position: "absolute",
                          top: 30, // Below the three dots icon
                          right: 0,
                          width: 200,
                          zIndex: 3, // Ensure it floats above the item
                        }}
                      >
                        <ActionButton
                          onPress={() => {
                            setIsRenaming(true);
                            setActionsOpen(false);
                          }}
                        >
                          <Icon
                            name="edit"
                            size={24}
                            color={theme.colors.grey300}
                          />
                          <Typography.TextS.regular
                            color={theme.colors.grey300}
                          >
                            Rename
                          </Typography.TextS.regular>
                        </ActionButton>

                        <ActionButton
                          onPress={() => {
                            setIsDeleting(true);
                          }}
                          style={{
                            backgroundColor: hex2rgba(
                              theme.colors.redDelete,
                              0.1
                            ),
                          }}
                        >
                          <Icon
                            name="delete"
                            size={24}
                            color={theme.colors.redDelete}
                          />
                          <Typography.TextS.regular
                            color={theme.colors.redDelete}
                          >
                            Delete
                          </Typography.TextS.regular>
                        </ActionButton>
                      </ActionsContainer>
                    </>
                  )}
                </View>
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
      <ConfirmationModal
        cancelLabel="cancel"
        isNegative
        confirmLabel="delete"
        description={`You are about to delete ${template.title}.`}
        isVisble={isDeleting}
        onCancel={() => setIsDeleting(false)}
        onConfirm={() => {
          setIsDeleting(false);
          setActionsOpen(false);
          deleteTemplate();
        }}
        title="Delete template"
      />
    </>
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

const ActionButton = styled.TouchableOpacity(({ theme }) => ({
  flexDirection: "row",
  gap: 8,
  alignItems: "center",
  backgroundColor: theme.colors.primary300,
  padding: 8,
  borderRadius: 8,
  marginBottom: 8,
}));

const ActionsContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.primary800,
  padding: 8,
  borderRadius: 8,
}));

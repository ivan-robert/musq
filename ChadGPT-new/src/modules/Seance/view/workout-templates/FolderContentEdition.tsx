import { PreparedWorkout } from "#modules/Seance/domain/seance.types";
import { ChooseFolderModal } from "#modules/Seance/view/workout-templates/ChooseFolderModal";
import { useDeleteTemplates } from "#modules/Seance/view/workout-templates/useDeleteTemplates";
import { useMoveTemplates } from "#modules/Seance/view/workout-templates/useMoveTemplates";
import { useRenameTemplate } from "#modules/Seance/view/workout-templates/useRenameTemplate";
import { WorkoutItem } from "#modules/Seance/view/workout-templates/WorkoutItem";
import { ConfirmationModal } from "#shared/view/components/ConfirmationModal";
import { ScrollView } from "#shared/view/components/ScrollView";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Icon } from "@rneui/base";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

type Props = {
  content: PreparedWorkout[];
};

export const FolderContentEdition: React.FC<Props> = ({ content }) => {
  const [selectedTemplates, setSelectedTemplates] = useState<
    PreparedWorkout[] | null
  >(null);
  const [isMoving, setIsMoving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate: move } = useMoveTemplates();
  const { mutate: deleteTemplates } = useDeleteTemplates();
  const { mutate: rename } = useRenameTemplate();

  const handleSelect = (template: PreparedWorkout) => {
    if (selectedTemplates) {
      if (selectedTemplates.includes(template)) {
        if (selectedTemplates.length === 1) {
          return setSelectedTemplates(null);
        }
        return setSelectedTemplates(
          selectedTemplates.filter((t) => t !== template)
        );
      }
      return setSelectedTemplates([...selectedTemplates, template]);
    }
    setSelectedTemplates([template]);
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ gap: 8, paddingVertical: 16 }}
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={selectedTemplates ? [0] : []} // Header is sticky when items are selected
      >
        {selectedTemplates && (
          <StickyHeader
            key="sticky-header"
            onDelete={() => {
              setIsDeleting(true);
            }}
            onCancel={() => setSelectedTemplates(null)}
            onMove={() => {
              setIsMoving(true);
            }}
          />
        )}

        {content.map((template, index) => {
          return (
            <WorkoutItem
              key={template.id!}
              template={template}
              onLongPress={() => {
                handleSelect(template);
              }}
              isSelected={selectedTemplates?.includes(template)}
              onPress={() => {
                if (selectedTemplates) {
                  return handleSelect(template);
                }
              }}
              onRename={(name) => {
                rename({ id: template.id!, name });
              }}
              zindex={content.length - index}
            />
          );
        })}
      </ScrollView>
      <ChooseFolderModal
        hideNewName
        closeModal={() => {
          setIsMoving(false);
        }}
        isModalVisible={isMoving}
        onFolderSelection={(folder) => {
          move({ folder, template_ids: selectedTemplates!.map((t) => t.id!) });
        }}
      />
      {selectedTemplates && (
        <ConfirmationModal
          isNegative
          cancelLabel="cancel"
          confirmLabel="delete"
          description={`You are about to delete ${selectedTemplates.length} templates`}
          isVisble={isDeleting}
          title="Delete templates"
          onCancel={() => setIsDeleting(false)}
          onConfirm={() => {
            deleteTemplates(selectedTemplates.map((t) => t.id!));
            setIsDeleting(false);
          }}
        />
      )}
    </Container>
  );
};

type StickyHeaderProps = {
  onCancel: () => void;
  onDelete: () => void;
  onMove: () => void;
};
const StickyHeader: React.FC<StickyHeaderProps> = ({
  onCancel,
  onDelete,
  onMove,
}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row", // Ensure it's always a row
        paddingVertical: 8,
        alignItems: "center",
        gap: 8,
      }}
    >
      <ActionButton onPress={onMove}>
        <Icon size={16} name="content-copy" color={theme.colors.grey200} />
        <Typography.TextM.regular color={theme.colors.grey200}>
          copy
        </Typography.TextM.regular>
      </ActionButton>
      <ActionButton onPress={onDelete}>
        <Icon size={16} name="delete" color={theme.colors.redDelete} />

        <Typography.TextM.regular color={theme.colors.redDelete}>
          delete
        </Typography.TextM.regular>
      </ActionButton>
      <Spacer.Flex />
      <TouchableOpacity
        onPress={() => {
          onCancel();
        }}
      >
        <Icon size={24} name="close" color={theme.colors.text300} />
      </TouchableOpacity>
      <View style={{ height: 1, backgroundColor: theme.colors.text200 }} />
    </View>
  );
};

const Container = styled.View({ flex: 1, paddingHorizontal: 16, gap: 8 });

const ActionButton = styled.TouchableOpacity(({ theme }) => ({
  flexDirection: "row", // Ensure buttons are in a row
  gap: 8,
  alignItems: "center",
  backgroundColor: theme.colors.primary300,
  padding: 8,
  borderRadius: 8,
}));

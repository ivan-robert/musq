import { PreparedWorkout } from "#modules/Seance/domain/seance.types";
import { useFolderContent } from "#modules/Seance/view/workout-templates/useFolder";
import { Button } from "#shared/view/components/Button/Button";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { Icon } from "@rneui/base";
import { useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";

type Props = {
  folderId: number;
  onItemSelect?: (item: PreparedWorkout) => void;
};

export const FolderContent: React.FC<Props> = ({ folderId, onItemSelect }) => {
  const { data: templates } = useFolderContent(folderId);
  const [selectedTemplate, setSelectedTemplate] =
    useState<PreparedWorkout | null>(null);
  const toggleSelect = (template: PreparedWorkout) => {
    if (selectedTemplate && selectedTemplate.id === template.id) {
      setSelectedTemplate(null);
    } else {
      setSelectedTemplate(template);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {templates.map((template) => {
          return (
            <WorkoutItem
              onPress={() => toggleSelect(template)}
              isSelected={selectedTemplate === template.id}
              key={template.id!}
              template={template}
            />
          );
        })}
      </View>
      {!!onItemSelect && (
        <Button.Secondary
          onPress={() => {
            if (!selectedTemplate) return;
            onItemSelect(selectedTemplate);
          }}
          text="Select"
          isDisabled={!selectedTemplate}
        />
      )}
    </View>
  );
};

type WorkoutItemProps = {
  template: PreparedWorkout;
  isSelected: boolean;
  onPress: () => void;
};

const WorkoutItem: React.FC<WorkoutItemProps> = ({
  template,
  isSelected,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderWidth: 1,
        borderColor: isSelected ? theme.colors.CTA500 : "transparent",
        borderRadius: 8,
      }}
    >
      <View>
        <Typography.TextM.bold color={theme.colors.text500}>
          {template.title}
        </Typography.TextM.bold>
        <Typography.TextM.regular color={theme.colors.text200}>
          by {template.creator.username}
        </Typography.TextM.regular>
      </View>
      <Spacer.Flex />
      <Spacer.Horizontal gap={16} />
      <TouchableOpacity>
        <Icon name="more-horiz" size={36} color={theme.colors.text200} />
      </TouchableOpacity>
    </Pressable>
  );
};

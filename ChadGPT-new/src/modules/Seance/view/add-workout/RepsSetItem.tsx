import { RepSet } from "#modules/Seance/domain/serie.types";
import { RepSetModal } from "#modules/Seance/view/add-workout/RepsSetModal";
import { ConfirmationModal } from "#shared/view/components/ConfirmationModal";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

type RepSetProps = {
  set: RepSet;
  index: number;
  displayRest: boolean;
  onEdit: (set: RepSet) => void;
  onDelete: () => void;
};
export const RepSetItem: React.FC<RepSetProps> = ({
  set,
  index,
  displayRest,
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation("workouts");
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <HorizontalSeparator />
      <ColumnsContainer>
        <SectionContainer>
          <Typography.TextL.bold color={theme.colors.text500}>
            {index}
          </Typography.TextL.bold>
        </SectionContainer>
        <VerticalSeparator />
        <SectionContainer>
          <Typography.TextL.bold color={theme.colors.text500}>
            {set.reps}
          </Typography.TextL.bold>
        </SectionContainer>
        <VerticalSeparator />
        <SectionContainer>
          {set.echec ? (
            <Icon name="check" color={theme.colors.text500} />
          ) : null}
        </SectionContainer>
        <VerticalSeparator />
        <ActionsContainer>
          <Pressable
            onPress={() => {
              setIsEditing(true);
            }}
          >
            <Icon color={theme.colors.text500} name="edit" />
          </Pressable>
          <Pressable
            onPress={() => {
              setIsDeleting(true);
            }}
          >
            <Icon color={theme.colors.text500} name="delete" />
          </Pressable>
        </ActionsContainer>
      </ColumnsContainer>
      <ConfirmationModal
        cancelLabel="cancel"
        confirmLabel="confirm"
        isVisble={isDeleting}
        onCancel={() => {
          setIsDeleting(false);
        }}
        onConfirm={() => {
          onDelete();
          setIsDeleting(false);
        }}
        title="Delete set"
        description="Do you want to remove this set?"
      />

      <RepSetModal
        initialSet={set}
        closeModal={() => {
          setIsEditing(false);
        }}
        isModalVisible={isEditing}
        onConfirm={(set) => {
          onEdit(set);
          setIsEditing(false);
        }}
      />

      {displayRest && (
        <RestContainer>
          <SectionContainer>
            <Typography.TextS.regular color={theme.colors.text500}>
              {t("newAddWorkout.restTime")}
            </Typography.TextS.regular>
            <Spacer.Horizontal gap={16} />
            <Typography.TextS.bold color={theme.colors.text500}>
              {set.repos}s
            </Typography.TextS.bold>
          </SectionContainer>
        </RestContainer>
      )}
    </>
  );
};

export const RepSetHeader: React.FC = () => {
  const { t } = useTranslation("workouts");
  const theme = useTheme();
  return (
    <ColumnsContainer>
      <HeaderTextContainer>
        <Typography.TextM.bold color={theme.colors.text500}>
          {t("newAddWorkout.set")}
        </Typography.TextM.bold>
      </HeaderTextContainer>
      <VerticalSeparator />
      <HeaderTextContainer>
        <Typography.TextM.bold color={theme.colors.text500}>
          {t("newAddWorkout.modals.reps")}
        </Typography.TextM.bold>
      </HeaderTextContainer>
      <VerticalSeparator />
      <HeaderTextContainer>
        <Typography.TextM.bold color={theme.colors.text500}>
          {t("newAddWorkout.toFailure")}
        </Typography.TextM.bold>
      </HeaderTextContainer>
      <VerticalSeparator />
      <ActionsContainer />
    </ColumnsContainer>
  );
};

const ColumnsContainer = styled.View({
  flexDirection: "row",
});

const SectionContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  paddingVertical: 8,
});

const ActionsContainer = styled.View({
  flexDirection: "row",
  gap: 8,
  marginTop: 16,
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
});

const VerticalSeparator = styled.View(({ theme }) => ({
  width: 1,
  backgroundColor: theme.colors.text500,
}));

const RestContainer = styled.View(({ theme }) => ({
  gap: 16,
  alignItems: "center",
  flexDirection: "row",
  borderTopWidth: 1,
  borderTopColor: theme.colors.text500,
}));

const HeaderTextContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
});

const HorizontalSeparator = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.text500,
}));

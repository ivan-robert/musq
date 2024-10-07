import { Dropset, Serie, TimeSet } from "#modules/Seance/domain/serie.types";
import { RepSetModal } from "#modules/Seance/view/add-workout/RepsSetModal";
import { TimeSelectionModal } from "#modules/Seance/view/add-workout/TimeSelectionModal";
import { WeightSetModal } from "#modules/Seance/view/add-workout/WeightSetModal";
import { ExoType } from "#shared/exo/domain/exo.types";
import { ConfirmationModal } from "#shared/view/components/ConfirmationModal";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { Pressable } from "react-native";
import { useTranslation } from "react-i18next"; // Import useTranslation

type DropsetProps = {
  set: Serie;
  index: number;
  displayRest: boolean;
  onDelete: () => void;
  onEdit: (set: Serie) => void;
};

export const ClassicSetItem: React.FC<DropsetProps> = ({
  set,
  index,
  displayRest,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation("workouts");

  return (
    <>
      <HorizontalSeparator />
      {set.type === "DROPSET" && (
        <>
          {set.sets.map((subset, i) => (
            <DropsetSubset
              key={i}
              onDeletePress={() => {
                setIsDeleting(true);
              }}
              setIndex={index}
              subsetIndex={i}
              subset={subset}
            />
          ))}
        </>
      )}

      {set.type !== "DROPSET" && (
        <ColumnsContainer>
          <SectionContainer>
            <Typography.TextL.bold color={theme.colors.text500}>
              {set.type === "POIDS" && set.isWarmup ? t("set.isWarmup") : ""}
              {index}
            </Typography.TextL.bold>
          </SectionContainer>
          <VerticalSeparator />
          {set.type !== "TEMPS" && (
            <SectionContainer>
              <Typography.TextL.bold color={theme.colors.text500}>
                {set.reps}
              </Typography.TextL.bold>
            </SectionContainer>
          )}
          {set.type === "TEMPS" && (
            <SectionContainer>
              <Typography.TextL.bold color={theme.colors.text500}>
                {set.temps}
                {t("newAddWorkout.enterTimeModalTitle") === "Enter time"
                  ? "s"
                  : t("newAddWorkout.enterTimeModalTitle")}
              </Typography.TextL.bold>
            </SectionContainer>
          )}
          {set.type === "POIDS" && (
            <>
              <VerticalSeparator />
              <SectionContainer>
                <Typography.TextL.bold color={theme.colors.text500}>
                  {set.poids}
                </Typography.TextL.bold>
              </SectionContainer>
            </>
          )}
          {set.type !== "TEMPS" && (
            <>
              <VerticalSeparator />
              <SectionContainer>
                {set.echec ? (
                  <Icon name="check" color={theme.colors.text500} />
                ) : null}
              </SectionContainer>
            </>
          )}
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
      )}

      <ConfirmationModal
        cancelLabel={t("newAddWorkout.cancel")}
        confirmLabel={t("newAddWorkout.confirm")}
        isVisble={isDeleting}
        onCancel={() => {
          setIsDeleting(false);
        }}
        onConfirm={() => {
          onDelete();
          setIsDeleting(false);
        }}
        title={t("newAddWorkout.deleteSet")}
        description={t("newAddWorkout.removeSetDescription")}
        isNegative
      />
      {set.type === "POIDS" && (
        <WeightSetModal
          closeModal={() => {
            setIsEditing(false);
          }}
          onConfirm={onEdit}
          isModalVisible={isEditing}
          initialSet={set}
          allowWarmup
          rest={() => {}}
          hideRest
        />
      )}
      {set.type === "TEMPS" && (
        <TimeSelectionModal
          title={t("newAddWorkout.enterTimeModalTitle")}
          closeModal={() => {
            setIsEditing(false);
          }}
          isModalVisible={isEditing}
          onSavePress={(timeInSeconds) => {
            const setToSave: TimeSet = {
              type: "TEMPS",
              id: "",
              perfId: "",
              repos: set.repos,
              temps: timeInSeconds,
            };
            onEdit(setToSave);
            setIsEditing(false);
          }}
        />
      )}
      {set.type === "REPS" && (
        <RepSetModal
          closeModal={() => {
            setIsEditing(false);
          }}
          onConfirm={onEdit}
          isModalVisible={isEditing}
          initialSet={set}
        />
      )}

      {displayRest && (
        <RestContainer>
          <SectionContainer>
            <Typography.TextS.regular color={theme.colors.text500}>
              {t("newAddWorkout.restTime")}
            </Typography.TextS.regular>
            <Spacer.Horizontal gap={16} />
            <Typography.TextS.bold color={theme.colors.text500}>
              {set.repos}
              {t("set.rest")}s
            </Typography.TextS.bold>
          </SectionContainer>
        </RestContainer>
      )}
    </>
  );
};

type DropsetSubsetsProps = {
  subset: Dropset["sets"][number];
  setIndex: number;
  subsetIndex: number;
  onDeletePress: () => void;
};

const DropsetSubset: React.FC<DropsetSubsetsProps> = ({
  subset,
  subsetIndex,
  setIndex,
  onDeletePress,
}) => {
  const theme = useTheme();
  return (
    <ColumnsContainer>
      <SectionContainer>
        {subsetIndex === 0 && (
          <Typography.TextL.bold color={theme.colors.text500}>
            {setIndex}
          </Typography.TextL.bold>
        )}
      </SectionContainer>
      <SectionContainer>
        <Typography.TextL.bold color={theme.colors.text500}>
          {subset.reps}
        </Typography.TextL.bold>
      </SectionContainer>
      <VerticalSeparator />
      <SectionContainer>
        <Typography.TextL.bold color={theme.colors.text500}>
          {subset.poids}
        </Typography.TextL.bold>
      </SectionContainer>
      <VerticalSeparator />
      <SectionContainer>
        <Icon name="check" color={theme.colors.text500} />
      </SectionContainer>
      <SectionContainer>
        {subsetIndex === 0 && (
          <Pressable onPress={onDeletePress}>
            <Icon color={theme.colors.text500} name="delete" />
          </Pressable>
        )}
      </SectionContainer>
    </ColumnsContainer>
  );
};

type ClassicSetHeaderProps = {
  exoType: ExoType;
};

export const ClassicSetHeader: React.FC<ClassicSetHeaderProps> = ({
  exoType,
}) => {
  const theme = useTheme();
  const { t } = useTranslation("workouts"); // Initialize t
  return (
    <ColumnsContainer>
      <HeaderTextContainer>
        <Typography.TextM.bold color={theme.colors.text500}>
          {t("newAddWorkout.set")}
        </Typography.TextM.bold>
      </HeaderTextContainer>
      <VerticalSeparator />
      {exoType === "temps" && (
        <HeaderTextContainer>
          <Typography.TextM.bold color={theme.colors.text500}>
            {t("newAddWorkout.modals.time")}
          </Typography.TextM.bold>
        </HeaderTextContainer>
      )}
      {exoType !== "temps" && (
        <HeaderTextContainer>
          <Typography.TextM.bold color={theme.colors.text500}>
            {t("newAddWorkout.modals.reps")}
          </Typography.TextM.bold>
        </HeaderTextContainer>
      )}
      {exoType === "poids" && (
        <>
          <VerticalSeparator />
          <HeaderTextContainer>
            <Typography.TextM.bold color={theme.colors.text500}>
              {t("newAddWorkout.modals.weight")}
            </Typography.TextM.bold>
          </HeaderTextContainer>
        </>
      )}
      {exoType !== "temps" && (
        <>
          <VerticalSeparator />
          <HeaderTextContainer>
            <Typography.TextM.bold color={theme.colors.text500}>
              {t("newAddWorkout.toFailureQuestion")}
            </Typography.TextM.bold>
          </HeaderTextContainer>
        </>
      )}
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

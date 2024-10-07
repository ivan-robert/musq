import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Modal, Pressable, ViewStyle } from "react-native";

type ConfirmationModalProps = {
  title: string;
  isVisble: boolean;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  isNegative?: boolean;
};

export const ConfirmationModal = ({
  cancelLabel,
  confirmLabel,
  description,
  isVisble,
  onCancel,
  onConfirm,
  isNegative,
  title,
}: ConfirmationModalProps) => {
  return (
    <Modal visible={isVisble} transparent animationType="fade">
      <CenteredContainer>
        <ModalContainer>
          <Typography.TitleL.bold>{title}</Typography.TitleL.bold>
          <Spacer.Vertical gap={4} />

          <Typography.TextL.regular>{description}</Typography.TextL.regular>
          <Spacer.Vertical gap={16} />
          <RowContainer>
            <CancelButton
              label={cancelLabel}
              onPress={onCancel}
              isNegative={isNegative}
            />
            <ConfirmationButton
              label={confirmLabel}
              onPress={onConfirm}
              isNegative={isNegative}
            />
          </RowContainer>
        </ModalContainer>
      </CenteredContainer>
    </Modal>
  );
};

type ConfirmationButtonProps = {
  label: string;
  onPress: () => void;
  isNegative?: boolean;
};

const ConfirmationButton = ({
  label,
  onPress,
  isNegative,
}: ConfirmationButtonProps) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        ...baseConfirmationButtonStyle,
        backgroundColor: isNegative
          ? pressed
            ? theme.colors.statusWarning
            : theme.colors.redDelete
          : pressed
          ? theme.colors.secondary500
          : theme.colors.statusSuccess,
      })}
    >
      <Typography.TextM.regular
        color={theme.colors.text500}
        style={{ maxWidth: 150 }}
      >
        {label}
      </Typography.TextM.regular>
    </Pressable>
  );
};

const CancelButton = ({
  label,
  onPress,
  isNegative,
}: ConfirmationButtonProps) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        ...baseConfirmationButtonStyle,
        backgroundColor: isNegative
          ? pressed
            ? theme.colors.CTA300
            : theme.colors.white
          : pressed
          ? theme.colors.statusWarning
          : theme.colors.redDelete,
        borderWidth: isNegative ? 1 : 0,
      })}
    >
      <Typography.TextM.regular
        color={isNegative ? theme.colors.black : theme.colors.white}
        style={{ maxWidth: 150 }}
      >
        {label}
      </Typography.TextM.regular>
    </Pressable>
  );
};

const baseConfirmationButtonStyle: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
};

const ModalContainer = styled.View(({ theme }) => ({
  padding: 16,
  backgroundColor: theme.colors.white,
  borderRadius: 8,
  shadowColor: theme.colors.black,
  shadowOpacity: 0.4,
  flexShrink: 1,
  shadowRadius: 10,
  borderWidth: 3,
  alignSelf: "center",
}));

const CenteredContainer = styled.View({
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)",
  padding: 8,
});

const RowContainer = styled.View({
  flexDirection: "row",
  justifyContent: "space-around",
  gap: 16,
});

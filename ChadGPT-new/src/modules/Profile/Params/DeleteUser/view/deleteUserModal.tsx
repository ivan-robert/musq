import { useDeleteUser } from "#modules/Profile/Params/DeleteUser/view/useDeleteUser";
import { StopButton } from "#modules/Seance/view/addSeance/SerieCard/SeanceModalButtons";
import { useUserContext } from "#modules/auth/context/User.context";
import { Button } from "#shared/view/components/Button/Button";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Modal } from "react-native";

type DeleteUserModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const DeleteUserModal = ({
  closeModal,
  isOpen,
}: DeleteUserModalProps) => {
  const { t } = useTranslation(["profile", "common"]);
  const { user } = useUserContext();
  const { mutate: deleteUser, isPending, isError } = useDeleteUser();
  const [mailInputValue, setMailInputValue] = useState("");
  const theme = useTheme();
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent
      onDismiss={closeModal}
    >
      <CenteredContainer>
        <ModalContentContainer>
          <Trans
            ns="profile"
            i18nKey="settings.deleteAccountWarning"
            parent={Typography.TitleL.bold}
            components={{
              red: <Typography.TitleL.bold color={theme.colors.redDelete} />,
            }}
          />
          <Typography.TextM.bold>
            {t("settings.toConfirmEnterMail")}
          </Typography.TextM.bold>
          <DangerousInput
            value={mailInputValue}
            onChangeText={setMailInputValue}
            placeholder="confirmer email"
            autoCapitalize="none"
          />
          <Button.Primary
            text={t("settings.deleteAccount")}
            isError={isError}
            isLoading={isPending}
            onPress={deleteUser}
            isDisabled={
              mailInputValue !== user.primaryEmailAddress?.emailAddress
            }
          />
          <RowContainer>
            <StopButton
              label={t("common:actions.cancel")}
              onPress={closeModal}
            />
          </RowContainer>
        </ModalContentContainer>
      </CenteredContainer>
    </Modal>
  );
};

const RowContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
});

const DangerousInput = styled.TextInput(({ theme }) => ({
  backgroundColor: theme.colors.white,
  fontFamily: theme.fonts["Montserrat-Italic"],
  fontSize: 16,
  borderRadius: 5,
  padding: 16,
  borderWidth: 1,
  borderColor: theme.colors.redDelete,
}));

const ModalContentContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.white,
  padding: 24,
  gap: 16,
}));

const CenteredContainer = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
});

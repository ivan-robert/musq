import { usernameForm } from "#modules/Profile/Username/username.types";
import { useSetUsername } from "#modules/Profile/Username/view/useSetUsername";
import { Button } from "#shared/view/components/Button/Button";
import { TextInput } from "#shared/view/components/TextInput";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Modal } from "react-native";

type SetUsernameModalProps = {
  isVisible: boolean;
};

export const SetUsernameModal = ({ isVisible }: SetUsernameModalProps) => {
  const theme = useTheme();
  const { t } = useTranslation("profile");
  const setUsernameForm = useForm({
    resolver: zodResolver(usernameForm),
    defaultValues: { username: "" },
  });
  const { mutate, isPending, isError } = useSetUsername();

  return (
    <Modal visible={isVisible} animationType="fade">
      <Container>
        <TextContainer>
          <Typography.TitleL.bold color={theme.colors.text500}>
            {t("chooseUsername")}
          </Typography.TitleL.bold>
          <Typography.TextL.regular color={theme.colors.text500}>
            {t("chooseUsernameDescription")}
          </Typography.TextL.regular>
        </TextContainer>
        <Controller
          control={setUsernameForm.control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput
              autoCapitalize="none"
              placeholder={t("yourUsername")}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Button.Primary
          text="Valider"
          isError={isError}
          isLoading={isPending}
          onPress={setUsernameForm.handleSubmit(() => {
            mutate({
              username: setUsernameForm.getValues().username,
            });
          })}
          isDisabled={!setUsernameForm.formState.isValid}
        />
      </Container>
    </Modal>
  );
};

const Container = styled.View(({ theme }) => ({
  flex: 1,
  paddingHorizontal: 16,
  paddingTop: 16,
  paddingBottom: 24,
  gap: 24,
  backgroundColor: theme.colors.neutral,
  justifyContent: "center",
}));

const TextContainer = styled.View({
  alignItems: "center",
  gap: 16,
});

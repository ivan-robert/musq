import { useCreateSupportChannel } from "#modules/Profile/Params/Support/view/useCreateSupportChannel";
import { useUserContext } from "#modules/auth/context/User.context";
import { queryClient } from "#shared/service/queryClient";
import { Button } from "#shared/view/components/Button/Button";
import { Spacer } from "#shared/view/components/Spacer";
import { TextInput } from "#shared/view/components/TextInput";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
});

export const CreateSupportChannelForm: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
  });

  const { createChannel, isPending, isError } = useCreateSupportChannel();
  const { user } = useUserContext();

  const submitForm = form.handleSubmit((data) => {
    createChannel({
      channelName: data.name,
      creatorId: user.id,
      message: data.description,
    });
    queryClient.invalidateQueries({
      queryKey: ["GET_SUPPORT_CHANNELS", user.id],
    });
  });
  return (
    <Container>
      <Typography.TitleM.bold color={theme.colors.text500}>
        {t("profile:settings.yourProblem")}
      </Typography.TitleM.bold>
      <Controller
        control={form.control}
        name="name"
        render={({ field: { value, onChange } }) => {
          return (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={t("profile:settings.problemName")}
            />
          );
        }}
      />

      <Spacer.Vertical gap={16} />

      <Typography.TitleM.bold color={theme.colors.text500}>
        {t("profile:settings.problemDetails")}
      </Typography.TitleM.bold>
      <Controller
        control={form.control}
        name="description"
        render={({ field: { value, onChange } }) => {
          return (
            <TextInput
              value={value}
              onChangeText={onChange}
              multiline
              placeholder={t("profile:settings.problemDescription")}
              style={{ minHeight: 200 }}
            />
          );
        }}
      />
      <Spacer.Vertical gap={8} />
      <Typography.TextS.italic color={theme.colors.text500}>
        *{t("profile:settings.supportChannelCreationInfo")}
      </Typography.TextS.italic>

      <Spacer.Flex />

      <Button.Primary
        onPress={submitForm}
        text={t("common:actions.send")}
        isLoading={isPending}
        isError={isError}
        isDisabled={!form.formState.isValid}
      />
    </Container>
  );
};

const Container = styled.View({
  flex: 1,
  paddingBottom: 32,
  paddingTop: 16,
  paddingHorizontal: 16,
});

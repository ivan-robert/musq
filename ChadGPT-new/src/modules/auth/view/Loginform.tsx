import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../../shared/view/components/TextInput";
import { Button } from "../../../shared/view/components/Button/Button";
import { Spacer } from "../../../shared/view/components/Spacer";
import { Pressable, View } from "react-native";
import { Typography } from "../../../shared/view/components/Typography/Typography";
import { useCallback, useRef, useState } from "react";
import { PasswordTextInput } from "../../../shared/view/components/PasswordTextInput";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { UserIcon } from "../../../shared/icons/UserIcon";
import { LockIcon } from "../../../shared/icons/LockIcon";
import { ArrowIcon } from "../../../shared/icons/ArrowIcon";
import { ErrorView } from "#shared/view/components/ErrorView";
import { useTranslation } from "react-i18next";
import { featureFlags } from "#app/featureFlags";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { UnauthenticatedNavigatorStackParamList } from "#navigation/Unauthenticated/unauthenticatedNavigator.types";
import { GoogleButton } from "#shared/view/components/Google/GoogleSignInButton";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Credentials } from "#modules/auth/domain/login.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialsSchema } from "#modules/auth/infra/login.validator";
import { ToastService } from "#shared/service/Toast.service";

type LoginFormProps = {
  onCreateAccountPress: () => void;
};

export const LoginForm = ({ onCreateAccountPress }: LoginFormProps) => {
  const { t } = useTranslation("common");
  const { signIn, isLoaded, setActive } = useSignIn();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const passwordInputRef = useRef<View>(null);
  const theme = useTheme();
  const { navigate } =
    useNavigation<NavigationProp<UnauthenticatedNavigatorStackParamList>>();
  const form = useForm<Credentials>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(credentialsSchema),
    reValidateMode: "onSubmit",
  });

  const email = form.watch("email");
  const password = form.watch("password");

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsSigningIn(true);
      const signInAttempt = await signIn.create({
        identifier: email,
        password: password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        ToastService.show({
          type: "error",
          title: "Error",
          message: "invalid credentials",
        });
      }
    }
    setIsSigningIn(false);
  }, [isLoaded, signIn, email, password, setActive]);

  return (
    <>
      {false && (
        <ErrorView
          title={t("status.error")}
          description={t("authentication.wrongCredentials")}
        />
      )}
      <Typography.HeadlineL.bold color={theme.colors.white}>
        {t("authentication.login")}
      </Typography.HeadlineL.bold>
      <Spacer.Vertical gap={4} />
      <Controller
        control={form.control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <FormView>
            <TextInput
              autoComplete="email"
              textContentType="emailAddress"
              placeholder={t("authentication.email")}
              onBlur={onBlur}
              leftIcon={<UserIcon />}
              onChangeText={(text) => {
                onChange(text.trimEnd().replace(/\s+/g, ""));
              }}
              value={value}
              errorLabel={error?.message}
              autoCapitalize="none"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
          </FormView>
        )}
        name="email"
      />
      <Spacer.Vertical gap={8} />
      <Controller
        control={form.control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <FormView>
            <PasswordTextInput
              autoComplete="current-password"
              //@ts-expect-error wtf is legacyref
              ref={passwordInputRef}
              textContentType="password"
              placeholder={t("authentication.password")}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorLabel={error?.message}
              leftIcon={<LockIcon />}
              autoCapitalize="none"
              onSubmitEditing={onSignInPress}
            />
          </FormView>
        )}
        name="password"
      />
      <Spacer.Vertical gap={4} />
      {featureFlags.resetPassword && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="forgot password"
          onPress={() => {
            navigate("ResetPassword");
          }}
          hitSlop={{ bottom: 10 }}
        >
          <Typography.TextM.regular color={theme.colors.white}>
            {t("authentication.forgotPassword")}
          </Typography.TextM.regular>
        </Pressable>
      )}
      <Spacer.Vertical gap={16} />
      <Button.Primary
        text={t("authentication.performLogin")}
        onPress={form.handleSubmit(onSignInPress)}
        isLoading={isSigningIn}
        rightIcon={ArrowIcon}
      />
      <Spacer.Vertical gap={8} />
      <Button.Tertiary
        text={t("authentication.createAccount")}
        onPress={onCreateAccountPress}
      />
      <Spacer.Vertical gap={8} />
      <View
        style={{
          alignItems: "center",
        }}
      >
        {featureFlags.googleSignIn && (
          <Typography.TextM.regular color={theme.colors.white}>
            {t("authentication.or")}
          </Typography.TextM.regular>
        )}
        <Spacer.Vertical gap={8} />
        {featureFlags.googleSignIn && <GoogleButton />}
      </View>
    </>
  );
};

const FormView = styled.View({ gap: 4 });

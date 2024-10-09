import { Controller, useForm } from "react-hook-form";
import { TextInput } from "#shared/view/components/TextInput";
import { Button } from "#shared/view/components/Button/Button";
import { Spacer } from "#shared/view/components/Spacer";
import { useRef, useState } from "react";
import { View } from "react-native";

import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { CheckIcon } from "#shared/icons/CheckIcon";
import {
  PasswordValidationResults,
  createAccountCredentialsSchema,
  passwordValidationCriteria,
} from "../infra/createAccount.validator";
import styled from "@emotion/native";
import { PasswordTextInput } from "#shared/view/components/PasswordTextInput";
import { UserIcon } from "#shared/icons/UserIcon";
import { LockIcon } from "#shared/icons/LockIcon";
import { UnauthenticatedNavigatorStackParamList } from "#navigation/Unauthenticated/unauthenticatedNavigator.types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { CreateAccounFormInputs } from "#modules/auth/domain/createAccount.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { VerificationModal } from "#modules/auth/view/VerificationModal";

export const CreateAccounForm = () => {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const { navigate } =
    useNavigation<NavigationProp<UnauthenticatedNavigatorStackParamList>>();

  const { isLoaded, signUp } = useSignUp();

  const form = useForm<CreateAccounFormInputs>({
    resolver: zodResolver(createAccountCredentialsSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const passwordInputRef = useRef<View>(null);
  const passwordConfirmInputRef = useRef<View>(null);
  const [showError, setShowError] = useState(false);
  const [clerkErrors, setClerkErrors] = useState<string[]>([]);
  const [expireVerif, setExpireVerif] = useState<Date | null>(null);

  const [passwordValidationResults, setPasswordValidationResults] =
    useState<PasswordValidationResults>({});

  const showPasswordMismatch = showError;

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setClerkErrors([]);

    try {
      await signUp.create({
        emailAddress: form.getValues("email"),
        password: form.getValues("password"),
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setExpireVerif(new Date(Date.now() + 1000 * 60));
    } catch (err: unknown) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) {
        setClerkErrors(err.errors.map((e) => e.message));
      }
    }
  };

  const handlePasswordChange = (password: string) => {
    const newValidationResults: PasswordValidationResults = {};

    passwordValidationCriteria.forEach((criterion) => {
      newValidationResults[criterion.key] =
        criterion.schema.safeParse(password).success;
    });

    setPasswordValidationResults(newValidationResults);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {/* {false && (
        <ErrorView
          title={t("status.error")}
          description={
            serverError.message === USER_REGISTERED_MESSAGE
              ? t("authentication.userAlreadyExists")
              : t("authentication.registerUnknownError")
          }
        />
      )} */}
      <Spacer.Vertical gap={16} />

      <Typography.HeadlineL.bold color={theme.colors.white}>
        {t("authentication.createAccount")}
      </Typography.HeadlineL.bold>
      <FormView>
        <Controller
          control={form.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              textContentType="emailAddress"
              autoComplete="email"
              placeholder={t("authentication.email")}
              onBlur={onBlur}
              onChangeText={(text) => {
                onChange(text.trimEnd().replace(/\s+/g, "").toLowerCase());
              }}
              value={value}
              autoCapitalize="none"
              errorLabel={form.formState.errors.email?.message}
              leftIcon={<UserIcon />}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
          )}
          name="email"
        />

        <Controller
          control={form.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordTextInput
              textContentType="newPassword"
              autoComplete="new-password"
              placeholder={t("authentication.password")}
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
                handlePasswordChange(value);
              }}
              value={value}
              leftIcon={<LockIcon />}
              autoCapitalize="none"
              onSubmitEditing={() => passwordConfirmInputRef.current?.focus()}
            />
          )}
          name="password"
        />

        <Controller
          control={form.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordTextInput
              autoComplete="current-password"
              placeholder={t("authentication.confirmPassword")}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              leftIcon={<LockIcon />}
              autoCapitalize="none"
            />
          )}
          name="passwordConfirm"
        />
      </FormView>

      <Spacer.Vertical gap={16} />

      {passwordValidationCriteria.map((criterion) => (
        <ValidationCriterion
          key={criterion.key}
          isValidated={!!passwordValidationResults[criterion.key]}
          label={t(`authentication.validation.${criterion.message}`)}
        />
      ))}
      <Spacer.Vertical gap={16} />
      <Button.Primary
        text={t("actions.submit")}
        isLoading={false}
        onPress={() => {
          if (
            form.getValues("password") !== form.getValues("passwordConfirm")
          ) {
            setShowError(true);
            return;
          }
          setShowError(false);
          // onSubmit();
          onSignUpPress();
        }}
        isDisabled={
          Object.values(passwordValidationResults).filter((val) => val)
            .length !== passwordValidationCriteria.length ||
          form.formState.errors.email !== undefined
        }
      />

      <Button.Tertiary
        onPress={() => navigate("Login")}
        text={t("authentication.performLogin")}
      />
      {showPasswordMismatch && <PasswordMismatchError />}
      {/* {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <Button.Tertiary text="Verify Email" onPress={onPressVerify} />
        </>
      )} */}
      {expireVerif && (
        <VerificationModal
          signUp={signUp}
          email={form.getValues("email")}
          expiryTimestamp={expireVerif}
        />
      )}
      {clerkErrors.map((error) => (
        <Typography.TextM.regular color={theme.colors.statusError}>
          {error}
        </Typography.TextM.regular>
      ))}
    </>
  );
};

type ValidationCriterionProps = {
  isValidated: boolean;
  label: string;
};

const ValidationCriterion = ({
  isValidated,
  label,
}: ValidationCriterionProps) => {
  const theme = useTheme();
  return (
    <CriterionRow>
      <CheckIconContainer>
        {
          <CheckIcon
            color={
              isValidated ? theme.colors.statusSuccess : theme.colors.grey200
            }
          />
        }
      </CheckIconContainer>
      <TextContainer>
        <Typography.TextS.regular
          color={isValidated ? theme.colors.white : theme.colors.grey200}
        >
          {label}
        </Typography.TextS.regular>
      </TextContainer>
    </CriterionRow>
  );
};

const PasswordMismatchError = () => {
  const theme = useTheme();
  const { t } = useTranslation("common");
  return (
    <Typography.TextM.regular color={theme.colors.statusError}>
      {t("authentication.passwordMismatch")}
    </Typography.TextM.regular>
  );
};

const CheckIconContainer = styled.View({ height: 24, width: 24 });

const CriterionRow = styled.View({
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
});

const TextContainer = styled.View({ flex: 1 });

const FormView = styled.View({ gap: 8 });

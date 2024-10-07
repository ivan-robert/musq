import styled from "@emotion/native";
import { Masterclass } from "#modules/auth/view/ResetPasswordForm";
import { UnauthenticatedNavigatorStackParamList } from "../../unauthenticatedNavigator.types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { ChadView } from "#modules/auth/view/ChadView";
import { PageHeader } from "#shared/view/components/PageHeader";

export const ResetPasswordPage = ({
  navigation,
}: NativeStackScreenProps<UnauthenticatedNavigatorStackParamList>) => {
  const { t } = useTranslation("common");
  const { goBack } = navigation;
  return (
    <ChadView>
      <ContentContainer>
        <PageHeader
          headerText={t("authentication.resetPassword")}
          onGoBackPress={goBack}
        />
        <FormContainer>
          <Masterclass />
        </FormContainer>
      </ContentContainer>
    </ChadView>
  );
};

const FormContainer = styled.View({
  flex: 1,
  justifyContent: "center",
});

const ContentContainer = styled.View({
  flex: 1,
  paddingHorizontal: 16,
  paddingVertical: 32,
});

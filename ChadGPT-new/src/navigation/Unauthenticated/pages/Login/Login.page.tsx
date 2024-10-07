import styled from "@emotion/native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Spacer } from "#shared/view/components/Spacer";
import { ChadView } from "#modules/auth/view/ChadView";
import { UnauthenticatedNavigatorStackParamList } from "#navigation/Unauthenticated/unauthenticatedNavigator.types";
import { getEnvironment } from "#app/environment";
import { Button } from "#shared/view/components/Button/Button";
import { LoginForm } from "#modules/auth/view/Loginform";
import { PrivacyPolicyText } from "#modules/auth/view/PrivacyPolicy";
import { ChangeLanguageWrapper } from "#modules/Profile/Params/Language/ChangeLanguage.wrapper";

export const LoginPage = ({
  navigation,
}: NativeStackScreenProps<UnauthenticatedNavigatorStackParamList>) => {
  return (
    <>
      <ChadView>
        <ChangeLanguageWrapper>
          <Container>
            <FormContainer>
              <Spacer.Vertical gap={32} />
              <LoginForm
                onCreateAccountPress={() =>
                  navigation.navigate("CreateAccount")
                }
              />
              <Spacer.Vertical gap={32} />
              <PrivacyPolicyText />
            </FormContainer>
          </Container>
        </ChangeLanguageWrapper>
      </ChadView>
      {getEnvironment() === "DEVELOPMENT" && (
        <CheatcodesContainer>
          <Button.Primary
            onPress={() => {
              console.log("not iomplemented chacal");
            }}
            text="log in as Ivan"
          />
        </CheatcodesContainer>
      )}
    </>
  );
};

const FormContainer = styled.View({
  flex: 1,
  justifyContent: "center",
});

const Container = styled.View({
  flex: 1,
  paddingHorizontal: 16,
  paddingVertical: 32,
});

const CheatcodesContainer = styled.View({
  position: "absolute",
  bottom: 100,
  zIndex: 100,
});

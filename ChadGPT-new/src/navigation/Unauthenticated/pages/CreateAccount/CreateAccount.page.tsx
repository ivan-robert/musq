import styled from "@emotion/native";
import { CreateAccounForm } from "../../../../modules/auth/view/CreateAccountForm";
import { Spacer } from "../../../../shared/view/components/Spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChadView } from "../../../../modules/auth/view/ChadView";
import { ChangeLanguageWrapper } from "#modules/Profile/Params/Language/ChangeLanguage.wrapper";

export const CreateAccountPage = () => {
  const { top } = useSafeAreaInsets();
  return (
    <ChadView>
      <ChangeLanguageWrapper>
        <Spacer.Vertical gap={top} />
        <Container>
          <HeaderContainer>
            <Spacer.Horizontal gap={32} />
          </HeaderContainer>
          <FormContainer>
            <CreateAccounForm />
          </FormContainer>
        </Container>
      </ChangeLanguageWrapper>
    </ChadView>
  );
};

const FormContainer = styled.View({
  flex: 1,
  justifyContent: "center",
});

const HeaderContainer = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const Container = styled.View({
  flex: 1,
  paddingHorizontal: 16,
  paddingVertical: 32,
});

import { CountryFlag } from "#modules/Profile/view/CountryFlag";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import i18next from "i18next";
import { Modal, Pressable } from "react-native";

type Props = {
  onLanguageChange: (language: string) => void;
  showModal: boolean;
  closeModal: () => void;
};

export const ChooseLanguageModal: React.FC<Props> = ({
  onLanguageChange,
  showModal,
  closeModal,
}) => {
  const languages = i18next.languages;

  return (
    <Modal
      visible={showModal}
      transparent
      onRequestClose={closeModal}
      animationType="fade"
    >
      <ModalBackground onPress={closeModal}>
        <Container>
          <ButtonsContainer>
            {languages.map((code: string) => {
              const isLanguageSelected = i18next.language === code;
              return (
                <Pressable
                  onPress={() => onLanguageChange(code)}
                  disabled={isLanguageSelected}
                  key={code}
                >
                  {({ pressed }) => (
                    <LanguageButton
                      selected={isLanguageSelected}
                      isActive={pressed}
                    >
                      <CountryFlag countryCode={code} size="32x24" />
                      <Spacer.Horizontal gap={8} />
                      <Typography.TitleM.regular style={{ marginLeft: 10 }}>
                        {code}
                      </Typography.TitleM.regular>
                      {isLanguageSelected && (
                        <>
                          <Spacer.Flex />
                          <Typography.TextM.regular>✓</Typography.TextM.regular>
                        </>
                      )}
                    </LanguageButton>
                  )}
                </Pressable>
              );
            })}
          </ButtonsContainer>
        </Container>
      </ModalBackground>
    </Modal>
  );
};

const ModalBackground = styled.Pressable({
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  alignItems: "center",
  justifyContent: "center",
});

const Container = styled.View({
  alignItems: "center",
  justifyContent: "center",
  width: "90%",
  backgroundColor: "#fff",
  borderRadius: 20,
  padding: 20,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
});

const LanguageButton = styled.View<{ isActive: boolean; selected?: boolean }>(
  ({ theme, isActive, selected }) => ({
    backgroundColor: selected
      ? theme.colors.secondary200
      : isActive
      ? theme.colors.CTA300
      : theme.colors.grey100,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  })
);

const ButtonsContainer = styled.ScrollView({
  width: "100%",
});

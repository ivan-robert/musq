import { ChooseLanguageModal } from "#modules/Profile/view/ChooseLanguageModal";
import { CountryFlag } from "#modules/Profile/view/CountryFlag";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

type Props = {
  children?: React.ReactElement | React.ReactElement[];
};
export const ChangeLanguageWrapper: React.FC<Props> = ({ children }) => {
  const [showChooseLanguageModal, setShowChooseLanguageModal] = useState(false);

  return (
    <>
      <ChooseLanguageModal
        closeModal={() => {
          setShowChooseLanguageModal(false);
        }}
        showModal={showChooseLanguageModal}
        onLanguageChange={(language) => {
          i18next.changeLanguage(language);
          setShowChooseLanguageModal(false);
        }}
      />
      <ChooseLanguageButton
        onPress={() => {
          setShowChooseLanguageModal(true);
        }}
      />
      {children}
    </>
  );
};

type ChooseLanguageButtonProps = {
  onPress: () => void;
};

const ChooseLanguageButton: React.FC<ChooseLanguageButtonProps> = ({
  onPress,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignSelf: "flex-end",
        alignItems: "center",
        borderRadius: 5,
        borderColor: theme.colors.text500,
        borderWidth: 1,
        paddingHorizontal: 8,
        zIndex: 1,
        paddingVertical: 4,
        margin: 8,
        position: "absolute",
      }}
      onPress={onPress}
    >
      <CountryFlag countryCode={i18next.language} size="16x12" />
      <Spacer.Horizontal gap={4} />
      <Typography.TextS.regular color={theme.colors.text500}>
        {t("profile:settings.changeLanguage")}
      </Typography.TextS.regular>
    </Pressable>
  );
};

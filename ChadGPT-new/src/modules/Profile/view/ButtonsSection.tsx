import { ChooseLanguageModal } from "#modules/Profile/view/ChooseLanguageModal";
import { CountryFlag } from "#modules/Profile/view/CountryFlag";
import { ProfileButton } from "#modules/Profile/view/ProfileButton";
import { useUserContext } from "#modules/auth/context/User.context";
import { useLogout } from "#modules/auth/view/useLogout";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { LogoutIcon } from "#shared/icons/LogoutIcon";
import { QuestionIcon } from "#shared/icons/QuestionIcon";
import { SettingsIcon } from "#shared/icons/SettingsIcon";
import { LocalStorage } from "#shared/service/storage/Storage.service";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ButtonsSection = () => {
  const { user } = useUserContext();
  const { logout } = useLogout();
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  const theme = useTheme();
  const [showLanguages, setShowLanguages] = useState(false);
  const { t } = useTranslation("profile");

  return (
    <ButtonSectionContainer contentContainerStyle={{ paddingBottom: 24 }}>
      <ChooseLanguageModal
        closeModal={() => setShowLanguages(false)}
        showModal={showLanguages}
        onLanguageChange={(language) => {
          i18next.changeLanguage(language);
          LocalStorage.setStringItem("language", language);
          setShowLanguages(false);
        }}
      />
      <ProfileButton
        title={t("social:usersFollowed")}
        leftIcon={({ height }) => (
          <Icon
            name="people-outline"
            size={height as number}
            color={theme.colors.text300}
          />
        )}
        onPress={() => {
          navigate("UsersFollowed", { userId: user.id });
        }}
      />
      <ProfileButton
        title={t("settings.buttons.myAccount")}
        leftIcon={SettingsIcon}
        onPress={() => {
          navigate("SettingsPage");
        }}
      />
      <ProfileButton
        title={t("settings.buttons.contactSupport")}
        leftIcon={QuestionIcon}
        onPress={() => {
          navigate("MessageChannelsList");
        }}
      />
      <ProfileButton
        title={t("settings.buttons.chooseLanguage")}
        onPress={() => {
          setShowLanguages(true);
        }}
        leftIcon={() => (
          <CountryFlag countryCode={i18next.language} size="20x15" />
        )}
      />
      <ProfileButton
        title={t("settings.buttons.logout")}
        onPress={logout}
        contentColor={theme.colors.redDelete}
        leftIcon={LogoutIcon}
      />
    </ButtonSectionContainer>
  );
};

const ButtonSectionContainer = styled.ScrollView({
  flex: 1,
});

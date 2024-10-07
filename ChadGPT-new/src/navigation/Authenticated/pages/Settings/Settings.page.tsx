import { getAppVersion } from "#app/environment";
import { featureFlags } from "#app/featureFlags";
import { DeleteUserModal } from "#modules/Profile/Params/DeleteUser/view/deleteUserModal";
import { ProfileButton } from "#modules/Profile/view/ProfileButton";
import { ThemeSwitch } from "#modules/Profile/view/ThemeSwitch";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { DangerIcon } from "#shared/icons/DangerIcon";
import { PageHeader } from "#shared/view/components/PageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export const SettingsPage = () => {
  const { goBack } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation("profile");
  return (
    <PageTemplate>
      <DeleteUserModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
      />
      <PageHeader headerText={t("settings.myAccount")} onGoBackPress={goBack} />
      <Container>
        {featureFlags.lightTheme && (
          <RowContainer>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Icon
                name="contrast"
                type="material"
                size={24}
                color={theme.colors.text500}
              />
              <Typography.TextL.regular color={theme.colors.text500}>
                {t("settings.theme")}
              </Typography.TextL.regular>
            </View>
            <ThemeSwitch />
          </RowContainer>
        )}
        <ProfileButton
          title={t("settings.deleteAccount")}
          onPress={() => {
            setShowModal(true);
          }}
          contentColor={theme.colors.redDelete}
          leftIcon={DangerIcon}
        />
      </Container>
      <Typography.TextS.regular
        style={{ alignSelf: "flex-end", margin: 8 }}
        color={theme.colors.text500}
      >
        {t("settings.appVersion", { version: getAppVersion() })}
      </Typography.TextS.regular>
    </PageTemplate>
  );
};

const Container = styled.View({
  paddingBottom: 24,
  flex: 1,
});

const RowContainer = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderBottomWidth: 1,
});

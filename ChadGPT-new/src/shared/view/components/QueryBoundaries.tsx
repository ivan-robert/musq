import { Suspense } from "react";
import { Loader } from "./Loader/Loader";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Typography } from "#shared/view/components/Typography/Typography";
import { TouchableOpacity, View } from "react-native";
import { ReloadIcon } from "#shared/icons/ReloadIcon";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import * as Keychain from "react-native-keychain";
import { LocalStorage } from "#shared/service/storage/Storage.service";
import { Logger } from "#shared/service/logger.service";
import { Spacer } from "#shared/view/components/Spacer";
import { queryClient } from "#shared/service/queryClient";
import { Icon } from "@rneui/base";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";

type QueryBoundariesProps = {
  children: React.ReactNode;
};

export const ErrorBoundary = ({ children }: QueryBoundariesProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          onReset={reset}
          onError={(error) => {
            Logger.error(error.message);
          }}
          fallbackRender={({ resetErrorBoundary }) => (
            <>
              <View style={{ flex: 1, backgroundColor: theme.colors.neutral }}>
                <CenteredView>
                  <Icon
                    name="emoticon-cry"
                    type="material-community"
                    size={48}
                    color={theme.colors.text500}
                  />
                  <Spacer.Vertical gap={16} />
                  <Typography.TextL.regular color={theme.colors.text500}>
                    {t("common:status.networkError")}
                  </Typography.TextL.regular>
                  <Spacer.Vertical gap={16} />
                  <View
                    style={{
                      gap: 16,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={async () => {
                        resetErrorBoundary();
                        LocalStorage.clearAll();
                      }}
                    >
                      <ReloadIcon
                        width={32}
                        height={32}
                        color={theme.colors.text500}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        queryClient.clear();
                        navigate("AuthenticatedTabNavigator", {
                          screen: "Homepage",
                        });
                      }}
                    >
                      <Icon
                        name="home"
                        size={32}
                        color={theme.colors.text500}
                      />
                    </TouchableOpacity>
                  </View>
                </CenteredView>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() => {
                    Keychain.resetGenericPassword();
                    queryClient.refetchQueries();
                    queryClient.clear();
                  }}
                >
                  <Typography.TextM.regular color={theme.colors.text500}>
                    restart app
                  </Typography.TextM.regular>
                </TouchableOpacity>
                <Spacer.Vertical gap={32} />
              </View>
            </>
          )}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export const QueryBoundaries = ({ children }: QueryBoundariesProps) => {
  const theme = useTheme();

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <CenteredView>
            <Loader color={theme.colors.text500} />
          </CenteredView>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

const CenteredView = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.colors.neutral,
}));

import { MessageReader } from "#modules/Profile/Params/Support/view/MessageReader";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { PageHeader } from "#shared/view/components/PageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { DeviceEventEmitter, View } from "react-native";

type Props = NativeStackScreenProps<
  RootStackNavigatorParamList,
  "MessageChannel"
>;
export const MessageChannelPage: React.FC<Props> = ({ route, navigation }) => {
  const goBack = useCallback(() => {
    navigation.navigate("MessageChannelsList");
    DeviceEventEmitter.emit("REFRESH_CHANNELS");
  }, [navigation]);
  return (
    <PageTemplate>
      <View style={{ flex: 1 }}>
        <PageHeader
          onGoBackPress={goBack}
          headerText={route.params.channelName}
        />
        <MessageReader channelId={route.params.channelId} />
      </View>
    </PageTemplate>
  );
};

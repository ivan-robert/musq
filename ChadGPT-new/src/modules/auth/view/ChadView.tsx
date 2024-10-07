import { useTheme } from "@emotion/react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  children?: React.ReactElement | React.ReactElement[];
};

export const ChadView: React.FC<Props> = ({ children }) => {
  const dimensions = Dimensions.get("screen");
  const imageWidth = dimensions.width;
  const imageHeight = dimensions.height;
  const theme = useTheme();
  return (
    <>
      <StatusBar backgroundColor={theme.colors.black} />
      <ImageBackground
        source={require("#assets/chad.png")}
        resizeMode="cover"
        style={{
          height: imageHeight,
          width: imageWidth,
          position: "absolute",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              flex: 1,
            }}
          >
            {children}
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </>
  );
};

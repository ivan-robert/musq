import { imagePicker } from "#shared/service/storage/ImagePicker.service";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { BottomSheet, Icon } from "@rneui/base";
import { ImagePickerAsset, ImagePickerOptions } from "expo-image-picker";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  onConfirm: (image: ImagePickerAsset[]) => void;
  closeModal: () => void;
  isVisible: boolean;
  title?: string;
  cameraOptions?: ImagePickerOptions;
};
export const CameraModal: React.FC<Props> = ({
  onConfirm,
  closeModal,
  title,
  isVisible,
  cameraOptions,
}) => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  const takePicture = () => {
    imagePicker
      .takePhoto({
        allowsMultipleSelection: true,
        allowsEditing: false,
        ...cameraOptions,
      })
      .then((images) => {
        if (images) {
          onConfirm(images);
          closeModal();
        }
      });
  };

  const choosePicture = () => {
    imagePicker
      .pickImage({
        allowsMultipleSelection: true,
        allowsEditing: false,
        ...cameraOptions,
      })
      .then((images) => {
        if (images) {
          onConfirm(images);
          closeModal();
        }
      });
  };

  return (
    <BottomSheet
      scrollViewProps={{
        style: {
          backgroundColor: theme.colors.white,
          padding: 16,
          paddingBottom: 16,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}
      onBackdropPress={closeModal}
      isVisible={isVisible}
    >
      {title && (
        <Typography.TitleL.regular color={theme.colors.text100}>
          {title}
        </Typography.TitleL.regular>
      )}
      <Spacer.Vertical gap={16} />
      <Row>
        <ButtonContainer>
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <Icon
                name="photo-camera"
                size={48}
                color={pressed ? theme.colors.CTA300 : theme.colors.black}
              />
            )}
          </Pressable>
        </ButtonContainer>
        <ButtonContainer>
          <Pressable onPress={choosePicture}>
            {({ pressed }) => (
              <Icon
                name="collections"
                size={48}
                color={pressed ? theme.colors.CTA300 : theme.colors.black}
              />
            )}
          </Pressable>
        </ButtonContainer>
      </Row>
      <Spacer.Vertical gap={bottom} />
    </BottomSheet>
  );
};

const Row = styled.View({ flexDirection: "row" });

const ButtonContainer = styled.View({ flex: 1 });

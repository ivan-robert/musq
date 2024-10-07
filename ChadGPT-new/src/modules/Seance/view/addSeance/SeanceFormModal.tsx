import styled from "@emotion/native";
import { Modal, View, ViewStyle } from "react-native";
import CrossIcon from "../../../../shared/icons/CrossIcon";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { Spacer } from "#shared/view/components/Spacer";
import { KeyboardAvoidingView } from "#shared/view/KeyboardAvoidingView";

type SeanceFormModalProps = {
  isModalVisible: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  title?: string;
  style?: ViewStyle;
};

export const SeanceFormModal = ({
  closeModal,
  isModalVisible,
  children,
  style,
  title,
}: SeanceFormModalProps) => {
  return (
    <Modal
      transparent
      visible={isModalVisible}
      onRequestClose={closeModal}
      animationType="fade"
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView>
        <CenterView>
          <ModalView style={style}>
            <ModalHeader closeModal={closeModal} title={title} />
            {children}
          </ModalView>
        </CenterView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const ModalHeader = ({
  closeModal,
  title,
}: {
  closeModal: () => void;
  title?: string;
}) => {
  const theme = useTheme();
  return (
    <View>
      <HeaderContainer>
        {title ? (
          <Typography.TitleL.bold>{title}</Typography.TitleL.bold>
        ) : (
          <View />
        )}
        <Spacer.Horizontal gap={8} />
        <CrossIconContainer onPress={closeModal}>
          <CrossIcon height={24} width={24} color={theme.colors.text500} />
        </CrossIconContainer>
      </HeaderContainer>
      <Separator />
    </View>
  );
};

const CenterView = styled.View({
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
  flex: 1,
});

const ModalView = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.white,
  borderRadius: 16,
  flexShrink: 1,
  paddingTop: 8,
  shadowColor: theme.colors.black,
  shadowOffset: {
    width: 5,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
}));

const Separator = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.black,
}));

const HeaderContainer = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 16,
});

const CrossIconContainer = styled.TouchableHighlight(({ theme }) => ({
  backgroundColor: theme.colors.redDelete,
  padding: 4,
  borderRadius: 4,
  borderColor: theme.colors.black,
}));

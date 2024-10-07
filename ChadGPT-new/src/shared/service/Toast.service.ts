import Toast from "react-native-toast-message";

type ShowToastProps = {
  type: "error" | "info" | "success";
  title: string;
  message: string;
};

interface IToastService {
  show: (props: ShowToastProps) => void;
}

export const ToastService: IToastService = {
  show: ({ title, message, type }) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      swipeable: true,
      text1Style: {
        fontSize: 12 * 1.6,
      },
      text2Style: { fontSize: 12 },
    });
  },
};

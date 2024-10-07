import styled from "@emotion/native";

type Props = {
  children: React.ReactElement | React.ReactElement[];
  isRead: boolean;
  onPress?: () => void;
};

export const NotificationItemLayout: React.FC<Props> = ({
  children,
  ...containerProps
}) => {
  return <Container {...containerProps}>{children}</Container>;
};

const Container = styled.Pressable<{ isRead: boolean }>(
  ({ theme, isRead }) => ({
    backgroundColor: isRead ? theme.colors.primary200 : theme.colors.primary500,
    padding: 8,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderWidth: 1,
    borderColor: isRead ? theme.colors.black : theme.colors.CTA300,
  })
);

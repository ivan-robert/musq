import styled from "@emotion/native";
import { Typography } from "./Typography/Typography";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@emotion/react";
import { Spacer } from "./Spacer";
import { MuscleIcon } from "../../icons/MuscleIcon";
import CrossIcon from "#shared/icons/CrossIcon";
import { GoBackArrow } from "#shared/view/components/GoBackArrow";

type PageHeaderProps = {
  onGoBackPress?: () => void;
  onCrossIconPress?: () => void;
  leftIcon?: React.ReactElement;
  headerText: string;
};

export const PageHeader = ({
  onGoBackPress,
  onCrossIconPress,
  headerText,
  leftIcon,
}: PageHeaderProps) => {
  const theme = useTheme();

  return (
    <ContentContainer>
      <ArrowContainer>
        {onGoBackPress ? (
          <GoBackArrow />
        ) : (
          leftIcon || <MuscleIcon color={theme.colors.text500} />
        )}
      </ArrowContainer>
      <CrossContainer>
        {onCrossIconPress && (
          <TouchableOpacity
            accessibilityLabel="retour"
            accessibilityRole="button"
            onPress={onCrossIconPress}
          >
            <CrossIcon color={theme.colors.text500} height={32} width={32} />
          </TouchableOpacity>
        )}
      </CrossContainer>
      <Spacer.Horizontal gap={8} />
      <Typography.TitleL.bold
        color={theme.colors.text500}
        style={{ flexShrink: 1, marginHorizontal: 32, textAlign: "center" }}
      >
        {headerText}
      </Typography.TitleL.bold>
    </ContentContainer>
  );
};

const ContentContainer = styled.View(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  paddingVertical: 8,
  paddingHorizontal: 16,
  backgroundColor: theme.colors.neutral,
  borderBottomColor: theme.colors.grey300,
  borderBottomWidth: 1,
}));

const ArrowContainer = styled.View({
  left: 16,
  position: "absolute",
});

const CrossContainer = styled.View({
  right: 16,
  position: "absolute",
});

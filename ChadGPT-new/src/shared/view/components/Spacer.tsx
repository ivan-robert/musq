import styled from "@emotion/native";

interface SpacerVerticalProps {
  gap: number;
}

interface SpacerHorizontalProps {
  gap: number;
}

const SpacerVertical = styled.View<SpacerVerticalProps>(({ gap }) => ({
  height: gap,
}));

const SpacerHorizontal = styled.View<SpacerHorizontalProps>(({ gap }) => ({
  width: gap,
}));

const SpacerFlex = styled.View({ flex: 1 });

interface Spacer {
  Vertical: typeof SpacerVertical;
  Horizontal: typeof SpacerHorizontal;
  Flex: typeof SpacerFlex;
}

export const Spacer: Spacer = {
  Vertical: SpacerVertical,
  Horizontal: SpacerHorizontal,
  Flex: SpacerFlex,
};

import { Item } from "#shared/domain/item.types";
import { SmallShowArrowIcon } from "#shared/icons/SmallShowArrowIcon";
import { ScrollView } from "#shared/view/components/ScrollView";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { Pressable, View, ViewStyle } from "react-native";

type SingleDropDownPickerProps = {
  items: Item[];
  leftIcon?: React.ReactNode;
  onSelect: (item: Item) => void;
  selected: Item | null;
  style?: ViewStyle;
  zIndex?: number;
};

export const SingleDropDownPicker = (props: SingleDropDownPickerProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <DisplayDropdownPressable
        onPress={() => setOpen(!open)}
        style={{ ...props.style }}
      >
        {props.leftIcon}
        <Spacer.Horizontal gap={8} />
        <Typography.TextM.regular
          color={theme.colors.text500}
          numberOfLines={1}
        >
          {props.selected?.label ?? "..."}
        </Typography.TextM.regular>
        <Spacer.Horizontal gap={8} />
        <Spacer.Flex />
        <IconContainer>
          <SmallShowArrowIcon
            color={theme.colors.text500}
            height={10}
            width={10}
            style={{
              transform: open ? [{ rotate: "180deg" }] : [{ rotate: "0deg" }],
            }}
          />
        </IconContainer>
      </DisplayDropdownPressable>
      <View>
        {open && (
          <ItemsContainer>
            {props.items.map((item) => (
              <DropDownItem
                item={item}
                onPress={() => {
                  props.onSelect(item);
                  setOpen(false);
                }}
                key={item.value}
              />
            ))}
          </ItemsContainer>
        )}
      </View>
    </Container>
  );
};

export const DisplayDropdownPressable = ({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}) => {
  const theme = useTheme();
  return (
    <Pressable
      style={({ pressed }) => ({
        borderRadius: 5,
        backgroundColor: pressed
          ? theme.colors.primary200
          : theme.colors.neutral,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        ...style,
      })}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

type DropDownItemProps = {
  item: Item;
  onPress: () => void;
};

const DropDownItem = ({ item, onPress }: DropDownItemProps) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: pressed ? theme.colors.CTA300 : "transparent",
      })}
    >
      <Typography.TextM.regular color={theme.colors.text500}>
        {item.label}
      </Typography.TextM.regular>
    </Pressable>
  );
};

const ItemsContainer = styled(ScrollView)<{ zIndex?: number }>(
  ({ theme, zIndex = 999 }) => ({
    maxHeight: 400,
    borderColor: theme.colors.text500,
    backgroundColor: theme.colors.neutral,
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 4,
    position: "absolute",
    width: "100%",
    shadowColor: theme.colors.text500,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    zIndex,
  })
);

const Container = styled.View(({ theme }) => ({
  borderColor: theme.colors.text500,
}));

const IconContainer = styled.View({});

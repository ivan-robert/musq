import { RestInputType } from "#modules/Seance/view/addSeance/SerieCard/TimeSelection/TimeSelectionModal";
import { Item } from "#shared/domain/item.types";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Fragment } from "react";
import { Pressable, ViewStyle } from "react-native";

export type RestTabItem = {
  value: RestInputType;
  label: string;
};

type TimeSelectionTabsProps = {
  tabsItems: RestTabItem[];
  onTabPress: (item: RestTabItem) => void;
  selectedTab: Item;
};

export const TimeSelectionTabs = ({
  onTabPress,
  selectedTab,
  tabsItems,
}: TimeSelectionTabsProps) => {
  return (
    <>
      <TabsContainer>
        {tabsItems.map((tab, index) => (
          <Fragment key={tab.value}>
            <Tab
              key={tab.value}
              label={tab.label}
              isSelected={tab.value === selectedTab.value}
              OnPress={() => onTabPress(tab)}
            />
            {index !== tabsItems.length - 1 && <VerticalSeparator />}
          </Fragment>
        ))}
      </TabsContainer>
      <HorizontalSeparator />
    </>
  );
};

type TabProps = {
  isSelected: boolean;
  OnPress: () => void;
  label: string;
};

const Tab = ({ isSelected, OnPress, label }: TabProps) => {
  const theme = useTheme();
  return (
    <Pressable
      style={{
        ...tabStyle,
        backgroundColor: isSelected
          ? theme.colors.primary200
          : theme.colors.white,
      }}
      onPress={OnPress}
    >
      <Typography.TextM.bold
        color={isSelected ? theme.colors.CTA300 : theme.colors.black}
      >
        {label}
      </Typography.TextM.bold>
    </Pressable>
  );
};

const TabsContainer = styled.View({
  flexDirection: "row",
  width: "100%",
});

const tabStyle: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 8,
};

const VerticalSeparator = styled.View(({ theme }) => ({
  height: "100%",
  width: 1,
  backgroundColor: theme.colors.black,
}));

const HorizontalSeparator = styled.View(({ theme }) => ({
  height: 1,
  width: "100%",
  backgroundColor: theme.colors.black,
}));

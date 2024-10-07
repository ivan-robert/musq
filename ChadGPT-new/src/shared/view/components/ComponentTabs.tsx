import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Fragment } from "react";
import { Pressable, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

export type ComponentTabItem<T> = {
  component: (props: SvgProps) => React.ReactElement;
  value: T;
};

type ComponentTabsProps<T> = {
  tabsItems: ComponentTabItem<T>[];
  selectedTabValue: string;
  onTabPress: (item: ComponentTabItem<T>) => void;
};

export const ComponentTabs = <T extends string>({
  onTabPress,
  selectedTabValue,
  tabsItems,
}: ComponentTabsProps<T>) => {
  return (
    <>
      <TabsContainer>
        {tabsItems.map((tab, index) => (
          <Fragment key={tab.value}>
            <ComponentTab
              key={tab.value}
              component={tab.component}
              isSelected={tab.value === selectedTabValue}
              onPress={() => onTabPress(tab)}
            />
            {index !== tabsItems.length - 1 && <VerticalSeparator />}
          </Fragment>
        ))}
      </TabsContainer>
    </>
  );
};

type ComponentTabProps = {
  isSelected: boolean;
  onPress: () => void;
  component: (props: SvgProps) => React.ReactElement;
};

const ComponentTab = ({
  component,
  isSelected,
  onPress,
}: ComponentTabProps) => {
  const theme = useTheme();
  return (
    <Pressable
      style={{
        ...tabStyle,
        backgroundColor: isSelected ? theme.colors.CTA300 : theme.colors.white,
      }}
      onPress={onPress}
    >
      {component({
        color: isSelected ? theme.colors.white : theme.colors.text300,
        height: 24,
        width: 24,
      })}
    </Pressable>
  );
};

const tabStyle: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 8,
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
};

const TabsContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: theme.colors.black,
  width: "100%",
}));

const VerticalSeparator = styled.View(({ theme }) => ({
  width: 1,
  backgroundColor: theme.colors.grey300,
  height: "100%",
}));

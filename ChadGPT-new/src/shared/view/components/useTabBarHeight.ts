import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export const useTabBarHeight = () => {
  try {
    const tabBarHeight = useBottomTabBarHeight();
    return tabBarHeight;
  } catch (e) {
    return 0;
  }
};

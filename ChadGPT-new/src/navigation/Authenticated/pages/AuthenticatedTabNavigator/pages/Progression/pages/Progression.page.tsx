import { PageTemplate } from "#shared/view/components/PageTemplate";
import { PageHeader } from "#shared/view/components/PageHeader";
import { ChooseExoStatistics } from "#modules/Statistics/ByExercise/view/ChooseExoStatistics";
import { GlobalStatsCarousel } from "#modules/Statistics/SessionsStats/view/GlobalStatsCarousel";
import { Spacer } from "#shared/view/components/Spacer";
import { useTranslation } from "react-i18next";
import { ScrollView } from "#shared/view/components/ScrollView";
import { useTabBarHeight } from "#shared/view/components/useTabBarHeight";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ProgressionPage = () => {
  const height = useTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation("statistics");
  return (
    <PageTemplate type="tab">
      <ScrollView
        contentContainerStyle={{ paddingBottom: height + 32 + bottom }}
      >
        <PageHeader headerText={t("common.yourGrowth")} />
        <Spacer.Vertical gap={16} />
        <GlobalStatsCarousel />
        <Spacer.Vertical gap={16} />
        <ChooseExoStatistics />
      </ScrollView>
    </PageTemplate>
  );
};

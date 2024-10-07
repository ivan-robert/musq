import { ReadMonthSeances } from "#modules/Seance/view/readSeances/ReadMonthSeances";
import { ReadTemplates } from "#modules/Seance/view/readSeances/ReadTemplates";
import { SkeletonCaledarQueryBoundaries } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Seances/ReadSeancesSkeletonLoader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { ScrollView } from "#shared/view/components/ScrollView";

import { Spacer } from "#shared/view/components/Spacer";

export const ReadSeancesPage = () => {
  return (
    <PageTemplate type="tab">
      <Spacer.Vertical gap={16} />
      <SkeletonCaledarQueryBoundaries>
        <ScrollView>
          <ReadMonthSeances />
          <ReadTemplates />
        </ScrollView>
      </SkeletonCaledarQueryBoundaries>
    </PageTemplate>
  );
};

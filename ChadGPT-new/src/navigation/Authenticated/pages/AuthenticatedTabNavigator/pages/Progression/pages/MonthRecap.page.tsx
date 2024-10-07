import { SessionsStats } from "#modules/Statistics/SessionsStats/view/SessionsStats";
import { SessionsStatsHeader } from "#modules/Statistics/SessionsStats/view/SessionsStatsHeader";
import { Loader } from "#shared/view/components/Loader/Loader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { useTheme } from "@emotion/react";
import { DateTime } from "luxon";
import { Suspense, useState } from "react";
import { View } from "react-native";

export const MonthRecapPage = () => {
  const theme = useTheme();
  const [referenceDate, setReferenceDate] = useState<DateTime>(DateTime.now());
  return (
    <PageTemplate topInsetColor={theme.colors.white} type="tab">
      <SessionsStatsHeader
        referenceDate={referenceDate}
        setReferenceDate={setReferenceDate}
      />
      <Suspense fallback={<LoadingView />}>
        <SessionsStats referenceDate={referenceDate} />
      </Suspense>
    </PageTemplate>
  );
};

const LoadingView = () => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Loader color={theme.colors.text500} />
    </View>
  );
};

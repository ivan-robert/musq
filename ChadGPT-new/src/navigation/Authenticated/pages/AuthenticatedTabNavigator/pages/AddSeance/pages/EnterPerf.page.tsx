import { EnterClassicPerf } from "#modules/Seance/view/add-workout/EnterClassicPerf";
import { EnterSuperset } from "#modules/Seance/view/add-workout/EnterSuperset";
import { AddSeanceNavigatorParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/AddSeance/AddSeanceNavigator.types";
import { useOfficialExosContext } from "#shared/exo/view/OfficialExos.context";
import { circuitSetAtom, classicPerfAtom } from "#shared/store/perf.store";
import { ConfirmationModal } from "#shared/view/components/ConfirmationModal";
import { NewWorkoutPageHeader } from "#shared/view/components/NewWorkoutPageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useAtom } from "jotai";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export const EnterPerfPage: React.FC = () => {
  const theme = useTheme();
  const { params } =
    useRoute<RouteProp<AddSeanceNavigatorParamList, "enter-perf">>();
  const exos = useOfficialExosContext();
  const { navigate } =
    useNavigation<NavigationProp<AddSeanceNavigatorParamList>>();
  const exercisesIds = params?.exercises.split(",");
  if (!exercisesIds) {
    navigate("new-workout");

    return null;
  }
  const [perf, setPerf] = useAtom(classicPerfAtom);
  const [, setSuperset] = useAtom(circuitSetAtom);
  const [showCancel, setShowCancel] = useState(false);

  const exercises = exercisesIds.map((id) => exos[id]);

  const cancel = () => {
    if (exercises.length === 1 && !perf?.series.length)
      return navigate("new-workout");

    return setShowCancel(true);
  };

  return (
    <PageTemplate topInsetColor={theme.colors.primary500}>
      <NewWorkoutPageHeader
        title="Perf"
        rightIcon={
          <TouchableOpacity
            onPress={cancel}
            hitSlop={{ top: 16, bottom: 16, left: 8, right: 8 }}
          >
            <Typography.TextM.regular color={theme.colors.redDelete}>
              Cancel
            </Typography.TextM.regular>
          </TouchableOpacity>
        }
      />
      <Spacer.Vertical gap={16} />
      {exercises.length === 1 && <EnterClassicPerf exercise={exercises[0]} />}
      {exercises.length > 1 && (
        <EnterSuperset exercises={exercises} initialPerf={null} />
      )}
      <ConfirmationModal
        confirmLabel="Cancel"
        cancelLabel="Continue"
        isVisble={showCancel}
        onCancel={() => {
          setShowCancel(false);
        }}
        onConfirm={() => {
          navigate("new-workout");
          setPerf(null);
          setSuperset(null);
          setShowCancel(false);
        }}
        title="Cancel perf"
        isNegative
        description="This performance will not be saved"
      />
    </PageTemplate>
  );
};

import { ExoType } from "#shared/exo/domain/exo.types";
import { ChronoIcon } from "#shared/icons/ChronoIcon";
import { DumbbellIcon } from "#shared/icons/DumbbellIcon";
import { HumanIcon } from "#shared/icons/HumanIcon";
import { ComponentTabItem } from "#shared/view/components/ComponentTabs";
import { View } from "react-native";
import { SvgProps } from "react-native-svg";

export const exoTypeItems: ComponentTabItem<ExoType>[] = [
  {
    value: "poids",
    component: (props: SvgProps) => {
      return (
        <View
          style={{
            alignItems: "center",
            transform: [{ rotate: "-45deg" }],
          }}
        >
          <DumbbellIcon {...props} />
        </View>
      );
    },
  },
  {
    value: "temps",
    component: ChronoIcon,
  },
  {
    value: "reps",
    component: HumanIcon,
  },
];

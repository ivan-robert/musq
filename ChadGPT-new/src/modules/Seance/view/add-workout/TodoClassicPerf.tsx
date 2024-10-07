import {
  ClassicPerf,
  ClassicPerfTemplate,
  GenericPerf,
} from "#modules/Seance/domain/perf.types";
import { Serie } from "#modules/Seance/domain/serie.types";

import {
  ClassicSetHeader,
  TodoClassicSetItem,
} from "#modules/Seance/view/add-workout/TodoClassicSetItem";
import { Typography } from "#shared/view/components/Typography/Typography";
import { ThemeInterface } from "#theme/emotion";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import React from "react";

type Props = {
  perfTemplate: ClassicPerfTemplate;
  savePerf: (perf: ClassicPerf) => void;
  isDisabled?: boolean;
  isValidated?: boolean;
  perfs: GenericPerf[];
  index: number;
};

const getEnhancedColors = (
  colors: ThemeInterface["colors"],
  status: "validated" | "disabled" | "neutral"
): ThemeInterface["colors"] => {
  if (status === "validated") {
    return {
      ...colors,
      CTA500: colors.statusSuccess,
      CTA300: colors.statusSuccess,
      text500: colors.statusSuccess,
    };
  }

  return colors;
};

export const TodoClassicPerf: React.FC<Props> = React.memo(
  ({ perfTemplate, savePerf, isDisabled, isValidated, index, perfs }) => {
    const theme = useTheme();
    const form = useForm<ClassicPerf>({
      defaultValues: {
        exo: perfTemplate.exo,
        rest: perfTemplate.rest,
        perfType: "CLASSIC",
        series: [],
        perfId: "",
      },
    });

    const enhancedColors = getEnhancedColors(
      theme.colors,
      isValidated ? "validated" : "neutral"
    );

    return (
      <TableContainer style={{ borderColor: enhancedColors.text500 }}>
        <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
          <Typography.TextM.regular color={enhancedColors.text500}>
            {perfTemplate.exo.exoName}
          </Typography.TextM.regular>
        </View>
        <HorizontalSeparator
          style={{ backgroundColor: enhancedColors.text500 }}
        />
        <ClassicSetHeader
          exoType={perfTemplate.exo.exoType}
          isValidated={isValidated}
        />
        {perfTemplate.series.map((serie, j) => {
          const isFutureSerie = j > form.watch("series").length;
          const isNextSet = j === form.watch("series").length;

          if (perfs[index]?.perfType === "CIRCUIT") return;

          const completedSet = perfs[index]?.series[j];

          return (
            <TodoClassicSetItem
              isPerfValidated={!!isValidated}
              index={j + 1}
              key={j}
              restTime={perfTemplate.rest}
              setTemplate={serie}
              isDisabled={!isValidated && (!!isDisabled || isFutureSerie)}
              onSaveSet={(set) => {
                if (isNextSet) {
                  form.setValue("series", [...form.getValues("series"), set]);
                  savePerf(form.getValues());
                }

                form.setValue(
                  "series",
                  form.getValues("series").map((v, i) => {
                    if (i === j) return set;
                    return v;
                  })
                );

                savePerf(form.getValues());
              }}
              completedSet={completedSet as Serie}
            />
          );
        })}
      </TableContainer>
    );
  }
);

const TableContainer = styled.View(({ theme }) => ({
  borderWidth: 1,
  borderRadius: 16,
  borderColor: theme.colors.text500,
}));

const HorizontalSeparator = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.text500,
}));

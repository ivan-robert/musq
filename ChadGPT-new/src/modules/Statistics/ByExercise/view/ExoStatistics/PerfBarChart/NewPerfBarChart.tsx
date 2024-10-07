import { DisplayableTimeSeriesPoint } from "#modules/Statistics/ByExercise/utils/displayablePoints.types";
import { useChartTools } from "#modules/Statistics/ByExercise/view/ExoStatistics/PerfBarChart/useChartTools";
import { Exo } from "#shared/exo/domain/exo.types";
import { hex2rgba } from "#shared/utils/hex2rgba";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTheme } from "@emotion/react";
import { DialogLoading } from "@rneui/base/dist/Dialog/Dialog.Loading";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Line, LinearGradient, Rect, Stop, Svg } from "react-native-svg";

const GRAD_HEIGHT = 10;
const LEFT_PADDING = 16;

type Props = {
  timeserie: DisplayableTimeSeriesPoint[];
  exo: Exo;
  showIntensity: boolean;
  showFailures: boolean;
  isLoading: boolean;
};

export const NewPerfBarChart: React.FC<Props> = ({
  exo,
  showIntensity,
  isLoading,
  showFailures,
  timeserie,
}) => {
  const theme = useTheme();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const {
    barPositions,
    barWidth,
    barHeights,
    intensityBarHeights,
    chartHeight,
    legend,
    chartWidth,
  } = useChartTools({
    exo,
    height: size.height,
    width: size.width,
    timeserie,
    showIntensity,
  });
  const xlegendHeight = size.height - chartHeight;

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <DialogLoading loadingProps={{ color: theme.colors.CTA300 }} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {/* Y INTENSITY LEGEND */}

      <>
        <View
          style={{
            height: chartHeight,
          }}
        >
          {legend.intensity.map((legend) => {
            return (
              <>
                <Typography.TextS.regular
                  style={{
                    fontSize: legend.size,
                    opacity: 0,
                  }}
                >
                  {legend.label}
                </Typography.TextS.regular>
                <View
                  key={legend.height}
                  style={{
                    transform: [
                      {
                        translateY:
                          chartHeight - legend.height - legend.size / 2,
                      },
                    ],
                    position: "absolute",
                    alignSelf: "flex-end",
                  }}
                >
                  <Typography.TextS.regular
                    style={{
                      opacity: showIntensity ? 1 : 0,
                      fontSize: legend.size,
                      lineHeight: legend.size,
                      textAlign: "right",
                    }}
                    color={"lightblue"}
                  >
                    {legend.label}
                  </Typography.TextS.regular>
                </View>
              </>
            );
          })}
        </View>
        <Spacer.Horizontal gap={8} />
      </>

      {/* Y MAIN LEGEND */}
      <>
        <View
          style={{
            height: chartHeight,
          }}
        >
          {legend.y.map((legend) => {
            return (
              <>
                <Typography.TextS.regular
                  style={{
                    fontSize: legend.size,
                    opacity: 0,
                  }}
                >
                  {legend.label}
                </Typography.TextS.regular>
                <View
                  key={legend.height}
                  style={{
                    transform: [
                      {
                        translateY:
                          chartHeight - legend.height - legend.size / 2,
                      },
                    ],
                    position: "absolute",
                    alignSelf: "flex-end",
                  }}
                >
                  <Typography.TextS.regular
                    style={{
                      fontSize: legend.size,
                      lineHeight: legend.size,
                      textAlign: "right",
                    }}
                    color={theme.colors.text500}
                  >
                    {legend.label}
                  </Typography.TextS.regular>
                </View>
              </>
            );
          })}
        </View>
        <Spacer.Horizontal gap={4} />
      </>

      {/* GRAPH */}
      <Svg
        style={{ flex: 1 }}
        onLayout={(e) => {
          setSize({
            height: e.nativeEvent.layout.height,
            width:
              e.nativeEvent.layout.width -
              e.nativeEvent.layout.x +
              LEFT_PADDING,
          });
        }}
      >
        <LinearGradient
          id={"barGradient"}
          x1={0}
          x2={0}
          y1={chartHeight}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0} stopColor={theme.colors.CTA500} />
          <Stop offset={0.3} stopColor={theme.colors.CTA300} />
          <Stop offset={0.7} stopColor={theme.colors.secondary500} />
          <Stop offset={1} stopColor={theme.colors.secondary300} />
        </LinearGradient>

        {/* Background (TODO COOL animated linear gradient) */}
        <Rect
          height={chartHeight}
          width={chartWidth}
          fill={hex2rgba("#000000", 0.2)}
          stroke={theme.colors.CTA300}
          strokeWidth={0}
        />

        {/* X Axis */}
        <Line
          x1={0}
          x2={chartWidth}
          y1={chartHeight}
          y2={chartHeight}
          stroke={theme.colors.CTA500}
          strokeWidth={3}
        />

        {/* Y TICKS */}
        {legend.y.map((step) => (
          <Line
            key={`line-${step.height}`}
            x1={0}
            x2={chartWidth}
            y1={step.height}
            y2={step.height}
            stroke={theme.colors.grey300}
            strokeWidth={2}
            strokeDasharray={[4, 4]}
          />
        ))}

        {/* BARS */}
        {timeserie.map((point, index) => {
          return (
            <FullyAnimatedRect
              barHeight={barHeights[index]}
              chartHeight={chartHeight}
              key={point.date}
              x={barPositions[index] - barWidth / 2}
              width={barWidth}
              fill={
                showFailures && point.failure
                  ? theme.colors.redDelete
                  : "url(#barGradient)"
              }
            />
          );
        })}
        {/* INTENSITY BARS */}
        {showIntensity &&
          timeserie.map((point, index) => {
            return (
              <Rect
                key={point.date}
                x={barPositions[index] - barWidth / 2}
                y={chartHeight - intensityBarHeights[index]}
                height={intensityBarHeights[index]}
                width={barWidth}
                fill={hex2rgba(theme.colors.secondary500, 0.3)}
              />
            );
          })}

        {/* X TICKS */}
        {barPositions.map((x, i) => {
          return (
            <Line
              //very bad practice to use index as key, prone to bugs. Doing it when x = 0 to avoid console warnings
              key={x === 0 ? i : x}
              x1={x}
              x2={x}
              y1={chartHeight - GRAD_HEIGHT / 2}
              y2={chartHeight + GRAD_HEIGHT / 2}
              stroke={theme.colors.text500}
              strokeWidth={2}
            />
          );
        })}

        {/* X LEGEND */}
        <View
          style={{
            height: xlegendHeight,
            transform: [{ translateY: chartHeight }],
            width: chartWidth,
          }}
        >
          {legend.x.map((label, index) => {
            return (
              <View
                key={label}
                style={{
                  top: xlegendHeight / 3,
                  left: barPositions[index] - barWidth / 4,
                  position: "absolute",
                  transform: [{ rotate: "-30deg" }],
                }}
              >
                <Typography.TextS.regular
                  style={{ fontSize: 11, lineHeight: 14 }}
                  color={theme.colors.text500}
                >
                  {label}
                </Typography.TextS.regular>
              </View>
            );
          })}
        </View>
      </Svg>
    </View>
  );
};

const AnimatedRect = Animated.createAnimatedComponent(Rect);

type FullyAnimatedRectProps = {
  x: number;
  width: number;
  fill: string;
  barHeight: number;
  chartHeight: number;
};

const FullyAnimatedRect = ({
  barHeight,
  chartHeight,
  fill,
  width,
  x,
}: FullyAnimatedRectProps) => {
  const animatedBarsHeight = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => {
    return {
      height: barHeight * animatedBarsHeight.value,
      y: chartHeight - barHeight * animatedBarsHeight.value,
    };
  });
  useEffect(() => {
    animatedBarsHeight.value = withTiming(1, {
      duration: 500,
    });
  }, [barHeight, animatedBarsHeight]);
  return (
    <AnimatedRect
      x={x}
      width={width}
      fill={fill}
      animatedProps={animatedProps}
    />
  );
};

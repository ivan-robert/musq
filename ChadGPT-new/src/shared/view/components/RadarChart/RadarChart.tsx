import {
  Point,
  edgePointCalculatorFor,
} from "#shared/view/components/RadarChart/utils";
import { useTheme } from "@emotion/react";
import { Dimensions, View } from "react-native";

import { Circle, Line, Polygon, Svg, Text } from "react-native-svg";

const WINDOW_WIDTH = Dimensions.get("window").width;
const RADIUS = WINDOW_WIDTH / 3;
const CENTER_POINT: Point = [WINDOW_WIDTH / 2, WINDOW_WIDTH / 2 - 10];
const STROKE_SIZE = 10;

const calculateEdgePoint = edgePointCalculatorFor(CENTER_POINT, RADIUS);
const LEGEND_EXPANSION_PERCENTAGE = 10;

const LEGEND_RADIUS_PERCENTAGE = 110;

export type DataPoint = {
  label: string;
  value: number;
};

type Props = {
  data: DataPoint[];
  showValues?: boolean;
};

export const RadarChart: React.FC<Props> = ({ data, showValues }) => {
  const theme = useTheme();

  const numberOfPoints = data.length;
  const ENUM_POINTS = Array.from(
    { length: numberOfPoints },
    (_, index) => index
  );

  return (
    <View
      style={{
        width: WINDOW_WIDTH,
        height: WINDOW_WIDTH,
      }}
    >
      <Svg>
        {[0, 1, 2, 3].map((i) => (
          <Circle
            key={`circle_outline_${i}`}
            cx={CENTER_POINT[0]}
            cy={CENTER_POINT[1]}
            r={(i + 1) * RADIUS * 0.25}
            stroke={theme.colors.grey100}
            strokeWidth="1"
            fill={theme.colors.grey300}
            fillOpacity={i * 0.05}
          />
        ))}
        {ENUM_POINTS.map((i) => (
          <Line
            key={`crosshair_${i}`}
            x1={calculateEdgePoint((i * 360) / numberOfPoints)[0]}
            y1={calculateEdgePoint((i * 360) / numberOfPoints)[1]}
            x2={CENTER_POINT[0]}
            y2={CENTER_POINT[1]}
            stroke={theme.colors.grey200}
            strokeWidth="1"
            fill="transparent"
            strokeDasharray={STROKE_SIZE}
          />
        ))}
        <Polygon
          stroke={theme.colors.secondary300}
          strokeWidth={1}
          fill={theme.colors.secondary300}
          fillOpacity={0.6}
          points={`${data.map((point, index) => {
            const edgePoint = calculateEdgePoint(
              (index * 360) / numberOfPoints,
              point.value
            );
            return `${edgePoint[0]},${edgePoint[1]}`;
          })}`}
        />
        {showValues &&
          data.map((point, index) => {
            const edgePoint = calculateEdgePoint(
              (index * 360) / numberOfPoints,
              point.value
            );
            return (
              <AnnotationPoint
                key={`annotation_${index}`}
                label={point.value.toString()}
                position={edgePoint}
                fillColor={theme.colors.secondary300}
                pointSizeMultiplicator={0.05}
                value={point.value}
                translate={[
                  LEGEND_EXPANSION_PERCENTAGE *
                    Math.cos((index * 2 * Math.PI) / numberOfPoints),
                  LEGEND_EXPANSION_PERCENTAGE *
                    Math.sin((index * 2 * Math.PI) / numberOfPoints),
                ]}
              />
            );
          })}

        {data.map((point, index) => {
          const edgePoint = calculateEdgePoint(
            (index * 360) / numberOfPoints,
            LEGEND_RADIUS_PERCENTAGE
          );
          return (
            <AnnotationPoint
              key={`name_${index}`}
              label={point.label}
              position={edgePoint}
              fillColor={theme.colors.text500}
              value={1}
              translate={[
                LEGEND_EXPANSION_PERCENTAGE *
                  Math.cos((index * 2 * Math.PI) / numberOfPoints),
                LEGEND_EXPANSION_PERCENTAGE *
                  Math.sin((index * 2 * Math.PI) / numberOfPoints),
              ]}
            />
          );
        })}
      </Svg>
    </View>
  );
};
type AnnotationPointProps = {
  label: string;
  position: Point;
  pointSizeMultiplicator?: number;
  fillColor: string;
  value: number;
  translate?: Point;
};
const AnnotationPoint: React.FC<AnnotationPointProps> = ({
  label,
  position,
  pointSizeMultiplicator,
  fillColor,
  value,
  translate = [0, 0],
}) => {
  const x = position[0];
  const y = position[1];

  return (
    <>
      {!!pointSizeMultiplicator && (
        <Circle
          r={value * pointSizeMultiplicator}
          fill={fillColor}
          cx={x}
          cy={y}
        />
      )}
      <Text
        fill={fillColor}
        x={x}
        y={y}
        textAnchor="middle"
        translateX={translate[0]}
        translateY={translate[1]}
      >
        {label}
      </Text>
    </>
  );
};

import { Slider } from "@rneui/base";
import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { MarkerProps } from "react-native-a11y-slider";

const Marker = ({ color }: MarkerProps) => {
  const styled = useMemo(() => {
    const colorStyle: ViewStyle = {};
    if (color) {
      colorStyle.backgroundColor = color;
    }
    return [styles.marker, colorStyle];
  }, [color]);

  return <View style={styled} />;
};
Marker.size = 24;
export default Marker;

const styles = StyleSheet.create({
  marker: {
    width: Marker.size,
    height: Marker.size,
    borderRadius: Marker.size / 2,
  },
});

type SliderProps = {
  value: number;
  onChange: (values: number) => void;
};
export const MuscleSlider = ({ onChange, value }: SliderProps) => {
  return (
    <Slider
      minimumValue={1}
      maximumValue={100}
      onValueChange={onChange}
      value={value}
    />
  );
};

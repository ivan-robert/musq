// type HelperProps = {
//   value: SharedValue<number>;
//   left: SharedValue<number>;
//   top: SharedValue<number>;
//   height: number;
//   width: number;
// };
// const Helper: React.FC<HelperProps> = ({ value, left, top, height, width }) => {
//   const [displayedValue, setDisplayedValue] = useState(0);
//   const theme = useTheme();
//   useDerivedValue(() => {
//     runOnJS(setDisplayedValue)(value.value);
//     return value.value;
//   });

//   return (
//     <Animated.View
//       style={{
//         position: "absolute",
//         left: left.value - width / 2,
//         top: top.value - height / 2,
//         justifyContent: "center",
//         borderRadius: 8,
//         height,
//         width,
//       }}
//     >
//       <Animated.Text
//         style={{
//           fontFamily: theme.fonts["Montserrat-Regular"],
//           alignSelf: "center",
//           color: theme.colors.primary500,
//         }}
//       >
//         {displayedValue}
//       </Animated.Text>
//     </Animated.View>
//   );
// };

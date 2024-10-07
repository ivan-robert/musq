import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
export const ChronoIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <G id="style=bulk">
      <G id="chronometer">
        <Path
          id="line (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.4697 7.53027C18.1768 7.23738 18.1768 6.7625 18.4697 6.46961L19.9697 4.96961C20.2626 4.67672 20.7374 4.67672 21.0303 4.96961C21.3232 5.2625 21.3232 5.73738 21.0303 6.03027L19.5303 7.53027C19.2374 7.82316 18.7626 7.82316 18.4697 7.53027Z"
          fill={props.color ?? "#000000"}
        />
        <Path
          id="line (Stroke)_2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.5303 6.53027C22.2374 6.82316 21.7626 6.82316 21.4697 6.53027L19.4697 4.53027C19.1768 4.23738 19.1768 3.7625 19.4697 3.46961C19.7626 3.17672 20.2374 3.17672 20.5303 3.46961L22.5303 5.46961C22.8232 5.7625 22.8232 6.23738 22.5303 6.53027Z"
          fill={props.color ?? "#000000"}
        />
        <Path
          id="vector (Stroke)"
          fillRule="evenodd"
          strokeWidth={1.5}
          stroke={props.color ?? "#000000"}
          clipRule="evenodd"
          d="M2.25 13.2499C2.25 7.86773 6.61779 3.49994 12 3.49994C17.3822 3.49994 21.75 7.86773 21.75 13.2499C21.75 18.6322 17.3822 22.9999 12 22.9999C6.61779 22.9999 2.25 18.6322 2.25 13.2499Z"
          fill="transparent"
        />
        <Path
          id="line (Stroke)_3"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.25 1.74994C8.25 2.16415 8.58579 2.49994 9 2.49994L15 2.49994C15.4142 2.49994 15.75 2.16415 15.75 1.74994C15.75 1.33572 15.4142 0.999938 15 0.999938L9 0.999939C8.58579 0.999939 8.25 1.33573 8.25 1.74994Z"
          fill={props.color ?? "#000000"}
        />
        <Path
          id="Vector (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 7.49994C12.4142 7.49994 12.75 7.83573 12.75 8.24994V13.2499C12.75 13.6642 12.4142 13.9999 12 13.9999C11.5858 13.9999 11.25 13.6642 11.25 13.2499V8.24994C11.25 7.83573 11.5858 7.49994 12 7.49994Z"
          fill={props.color ?? "#000000"}
        />
      </G>
    </G>
  </Svg>
);

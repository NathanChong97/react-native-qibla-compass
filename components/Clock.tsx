import React, { useState } from "react";
import Svg from "react-native-svg";
import { Dimensions } from "react-native";
import ClockMarkings from "./ClockMarkings";
import Hand from "./Hand";
import { useInterval } from "../helpers/useInterval";
import { getTime } from "../helpers/time";

const { width } = Dimensions.get("window");
const diameter = width - 40;
const center = width / 2;
const radius = diameter / 2;
const hourStickCount = 12;
const minuteStickCount = 12 * 6;

const Clock = () => {
  let [time, setTime] = useState(getTime);

  useInterval(() => {
    setTime(getTime);
  }, 1000);

  return (
    <Svg height={width} width={width}>
      <ClockMarkings
        minutes={minuteStickCount}
        hours={hourStickCount}
        radius={radius}
        center={center}
      />
      <Hand
        angle={time.seconds}
        center={center}
        radius={radius}
        stroke='red'
        strokeWidth='1'
      />
      <Hand
        angle={time.minutes}
        center={center}
        radius={radius}
        stroke='black'
        strokeWidth='5'
      />
      <Hand
        angle={time.hours}
        center={center}
        radius={radius}
        stroke='black'
        strokeWidth='7'
      />
    </Svg>
  );
};

export default Clock;
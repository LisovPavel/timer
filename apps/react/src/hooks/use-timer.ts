import { useState, useEffect } from "react";

import { TimerService, Subscriber } from "../services/timer";

type TimerProps = {
  duration: number;
};

const timer = new TimerService();

export const useTimer = ({ duration }: TimerProps) => {
  useEffect(() => timer.subscribe(handleTick), []);
  const [leftTime, setLeftTime] = useState(duration);
  const handleTick: Subscriber = ({ time }) => {
    setLeftTime(duration - time);
  };

  return {
    start: timer.start,
    stop: timer.stop,
    leftTime,
  };
};

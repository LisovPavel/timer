import { useCallback } from "react";
import { useState, useEffect } from "react";
import { Subscriber } from "@timer/types";
import { TimerStatus } from "../services/timer";

export const useTimer = () => {
  useEffect(() => window.timerApi.subscribe(handleTick), []);
  const [leftTime, setLeftTime] = useState(0);
  const [extraTime, setExtraTime] = useState(0);
  const [status, setSetStatus] = useState<TimerStatus>("stopped");
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleTick: Subscriber = useCallback(
    ({ time, isActive: isTimerActive, status, extraTime, isActive }) => {
      setLeftTime(time);
      setExtraTime(extraTime);
      setSetStatus(status);
      setIsActive(isTimerActive);
    },
    []
  );

  return {
    init: window.timerApi.init,
    start: window.timerApi.start,
    stop: window.timerApi.stop,
    leftTime,
    extraTime,
    status,
    isActive,
  };
};

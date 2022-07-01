import { ExtendedInterval } from "@timer/types";
import { useCallback } from "react";
import { useState, useEffect } from "react";
import { Subscriber } from "@timer/types";
import { TimerStatus } from "../services/timer";

export const useTimer = () => {
  useEffect(() => window.timerApi.subscribe(handleTick), []);
  const [pastedTime, setPastedTime] = useState(0);
  const [extraTime, setExtraTime] = useState(0);
  const [status, setSetStatus] = useState<TimerStatus>("stopped");
  const [timer, setTimer] = useState<any>(null);
  const [intervals, setIntervals] = useState<ExtendedInterval[]>([]);
  const handleTick: Subscriber = useCallback(({ intervals, timer }) => {
    setPastedTime(timer.pastedTime);
    setExtraTime(extraTime);
    setSetStatus(status);
    setIntervals(intervals);
  }, []);

  return {
    ...window.timerApi,
    leftTime: pastedTime,
    extraTime,
    status,
    intervals,
    timer,
  };
};

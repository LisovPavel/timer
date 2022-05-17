import { IntervalStatus } from "../../apps/electron/src/services/intervals/intervals.service";
import { Interval } from "../../apps/electron/src/services/intervals/intervals.service";

export const addFinishAt = (
  interval: Interval,
  index: number,
  intervals: Interval[]
) => {
  return {
    ...interval,
    finishAt: (intervals?.[index - 1]?.finishAt ?? 0) + interval.duration,
  };
};

export const addStatus = (passedTime: number) => (interval: Interval) => {
  if (passedTime > interval.finishAt) {
    return { ...interval, status: IntervalStatus.finished };
  }
  if (passedTime < interval.finishAt && passedTime > interval.finishAt) {
    return { ...interval, status: IntervalStatus.active };
  }
  return { ...interval, status: IntervalStatus.pending };
};

export const extractStatus = (interval: Interval) => {
  return {
    ...interval,
    isActive: interval.status === IntervalStatus.active,
    isFinished: interval.status === IntervalStatus.finished,
    isStarted: [IntervalStatus.active, IntervalStatus.finished].includes(
      interval.status
    ),
  };
};

export const addProgress = (passedTime: number) => (interval: Interval) => {
  let progress = 0;
  if (interval.status === IntervalStatus.finished) {
    progress = 100;
  }
  if (interval.status === IntervalStatus.active) {
    progress = (interval.duration / 100) * (passedTime - interval.finishAt);
  }
  return {
    ...interval,
    progress,
  };
};

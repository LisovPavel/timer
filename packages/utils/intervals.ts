import { Interval } from "@timer/types";

export enum IntervalStatus {
  "pending" = "PENDING",
  "active" = "ACTIVE",
  "finished" = "FINISHED",
}

export const calcSumDurations = (
  intervals: Interval[],
  from: number,
  to: number
) => {
  let sum = 0;
  for (let i = from; i <= to; i++) {
    sum += intervals?.[i].duration ?? 0;
  }
  return sum;
};

export const addStartFinishAt = (
  interval: Interval,
  index: number,
  intervals: Interval[]
) => {
  const finishAt = calcSumDurations(intervals, 0, index);
  return {
    ...interval,
    startAt: finishAt - interval.duration,
    finishAt,
  };
};

export const addStatus = (pastedTime: number) => (interval: Interval) => {
  if (pastedTime >= interval.finishAt!) {
    return { ...interval, status: IntervalStatus.finished };
  }
  if (pastedTime < interval.finishAt! && pastedTime >= interval.startAt!) {
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
      interval.status!
    ),
  };
};

export const addProgress = (passedTime: number) => (interval: Interval) => {
  let progress = 0;
  let leftTimeToEnd = interval.duration;
  if (interval.status === IntervalStatus.finished) {
    progress = 100;
    leftTimeToEnd = 0;
  }
  if (interval.status === IntervalStatus.active) {
    leftTimeToEnd = interval.finishAt! - passedTime;
    progress = (passedTime - interval.startAt!) / (interval.duration / 100);
  }
  return {
    ...interval,
    progress,
    leftTimeToEnd,
  };
};

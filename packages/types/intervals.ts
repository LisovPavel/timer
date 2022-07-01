import { TimerStatus } from "./timer";

export enum IntervalStatus {
  "pending" = "PENDING",
  "active" = "ACTIVE",
  "finished" = "FINISHED",
}

export type InitialInterval = {
  duration: number;
};

export type Interval = InitialInterval & {
  id: string;
  leftTimeToEnd?: number;
  status?: IntervalStatus;
  isStarted?: boolean;
  isActive?: boolean;
  isFinished?: boolean;
  progress?: number;
  finishAt?: number;
  startAt?: number;
};

export type ExtendedInterval = Required<Interval>;

export type IntervalServiceState = {
  isFinished: boolean;
  extraTime: number;
  intervals: ExtendedInterval[];
  allIntervalsDuration: number;
};

export type IntervalsServicePayload = {
  intervals: ExtendedInterval[];
  timer: {
    status: TimerStatus;
    isFinished: boolean;
    extraTime: number;
    pastedTime: number;
  };
};

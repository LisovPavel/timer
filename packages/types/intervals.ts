export enum IntervalStatus {
  "pending" = "PENDING",
  "active" = "ACTIVE",
  "finished" = "FINISHED",
}

export type Interval = {
  id: string;
  duration: number;
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

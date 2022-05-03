export type TimerStatus = "stopped" | "started" | "paused";

export type TickCallbackPayload = {
  time: number;
  extraTime: number;
  status: TimerStatus;
  isFinished: boolean;
  isActive: boolean;
};
export type Subscriber = (payload: TickCallbackPayload) => void;
export type Interval = number;

export type TimerApi = {
  init: (intervals: Interval[]) => void;
  start: () => void;
  stop: () => void;
  increase: (extraTime: Interval) => void;
  subscribe: (callback: Subscriber) => void;
};

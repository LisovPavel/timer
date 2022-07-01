import { InitialInterval } from "./intervals";
import { IntervalsServicePayload } from "./intervals";
import { Interval } from "./intervals";

export type TimerStatus = "stopped" | "started" | "paused";

export type TickCallbackPayload = {
  time: number;
  extraTime: number;
  status: TimerStatus;
  isFinished: boolean;
  isActive: boolean;
};
export type Subscriber = (payload: IntervalsServicePayload) => void;

export type TimerApi = {
  start: () => void;
  stop: () => void;
  pause: () => void;
  addIntervals: (intervals: InitialInterval[]) => void;
  subscribe: (callback: any) => void;
};

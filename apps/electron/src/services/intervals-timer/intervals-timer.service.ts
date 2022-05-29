import { TimerStatus } from "@timer/types";
import {
  ExtendedInterval,
  IntervalsService,
} from "../intervals/intervals.service";
import { StopwatchService } from "../stopwatch-service/stopwatch.service";
import { SubscribeService } from "../subscribe/subscribe.service";

type IntervalsServicePayload = {
  intervals: ExtendedInterval[];
  timer: {
    status: TimerStatus;
    isFinished: boolean;
    extraTime: number;
    pastedTime: number;
  };
};

export class IntervalsTimerService {
  constructor(
    private timer: StopwatchService,
    private intervals: IntervalsService,
    private subs: SubscribeService<IntervalsServicePayload>
  ) {
    this.timer.onTick(this.onTick);
  }

  status: TimerStatus = "stopped";
  private startTime = 0;

  private setStatus = (status: TimerStatus) => {
    this.status = status;
  };

  start = () => {
    this.timer.start();
    this.setStatus("started");
  };

  stop = () => {
    this.startTime = 0;
    this.timer.stop();
    this.setStatus("stopped");
  };

  pause = () => {
    this.timer.pause();
    this.setStatus("paused");
  };

  addIntervals = this.intervals.add;
  subscribe = this.subs.subscribe;

  onTick = (pastedTime: number) => {
    const state = this.intervals.getState(pastedTime);
    const timer = {
      pastedTime: pastedTime,
      status: this.status,
      isFinished: state.isFinished,
      extraTime: state.extraTime,
    };
    this.subs.publishEvent({ intervals: state.intervals, timer });
  };
}

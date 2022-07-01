import { IntervalsServicePayload, TimerStatus } from "@timer/types";
import { IntervalsService } from "../intervals/intervals.service";
import { StopwatchService } from "../stopwatch-service/stopwatch.service";
import { SubscribeService } from "../subscribe/subscribe.service";

export class IntervalsTimerService {
  constructor(
    private timer: StopwatchService,
    private intervals: IntervalsService,
    private subs: SubscribeService<IntervalsServicePayload>
  ) {
    this.timer.onTick(this.onTick);
  }

  status: TimerStatus = "stopped";

  private setStatus = (status: TimerStatus) => {
    this.status = status;
  };

  start = () => {
    this.timer.start();
    this.setStatus("started");
  };

  stop = () => {
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

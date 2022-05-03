import { Interval, Subscriber, TimerStatus } from "@timer/types";

export interface Timer {
  start: (callback: () => void) => void;
  stop: () => void;
}

export class IntervalsTimerService {
  constructor(private timer: Timer) {}
  tickCounter = 0;

  private subs: Set<Subscriber> = new Set();
  status: TimerStatus = "stopped";
  private startTime = 0;
  private intervals: Interval[] = [];

  init = (intervals: Interval[]) => {
    this.setIntervals(intervals);
  };

  start = () => {
    if (this.status === "started") return;

    this.setStartTime(
      this.status === "paused" ? Date.now() - this.currentTime : Date.now()
    );

    this.timer.start(this.tick);
    this.setStatus("started");
    this.tick();
  };

  stop = () => {
    this.startTime = 0;
    this.timer.stop();
    this.setStatus("stopped");
    this.tick();
  };

  pause = () => {
    this.timer.stop();
    this.setStatus("paused");
    this.tick();
  };

  increase = (extraTime: number) => {
    this.addIntervals([extraTime]);
    this.tick();
  };

  subscribe = (callback: Subscriber) => {
    this.subs.add(callback);
    return () => {
      this.subs.delete(callback);
    };
  };

  private tick = () => {
    const leftTime = this.intervalsDurationsSum - this.currentTime;
    const time = leftTime > 0 ? leftTime : 0;
    const extraTime = time === 0 ? Math.abs(leftTime) : 0;
    for (const sub of this.subs) {
      sub({
        time,
        extraTime,
        status: this.status,
        isFinished: this.isFinished,
        isActive: this.status === "started",
      });
    }
  };

  private get currentTime() {
    if (!this.startTime) return 0;
    return Math.floor((Date.now() - this.startTime) / 1000) * 1000;
  }

  private get intervalsDurationsSum() {
    return this.intervals.reduce((acc, dur) => acc + dur, 0);
  }

  private get isFinished() {
    return this.intervalsDurationsSum < this.currentTime;
  }

  private setStatus = (status: TimerStatus) => {
    this.status = status;
  };

  private setStartTime = (time: number) => {
    this.startTime = time;
  };

  private setIntervals = (intervals?: Interval[]) => {
    if (!intervals) {
      this.intervals = [];
    }
    this.intervals = intervals;
  };

  private addIntervals = (intervals: Interval[]) => {
    this.intervals.push(...intervals);
  };
}

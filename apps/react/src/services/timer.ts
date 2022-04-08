export type TimerStatus = "stopped" | "started" | "paused";

type TickCallbackPayload = {
  time: number;
  status: TimerStatus;
  isActive: boolean;
};

export type Subscriber = (payload: TickCallbackPayload) => void;

export class TimerService {
  constructor(private tickDuration: number = 1000) {}
  subs: Set<Subscriber> = new Set();
  status: TimerStatus = "stopped";
  isActive = false;
  startTime = 0;
  interval?: number;

  start = () => {
    if (this.startTime) {
      this.stop();
    }
    this.status = "started";
    this.startTime = Date.now();
    this.interval = window.setInterval(this.tick, this.tickDuration);
  };

  stop = () => {
    this.startTime = 0;
    if (this.interval) {
      window.clearInterval(this.interval);
    }
    this.status = "stopped";
    this.isActive = false;
    this.tick();
  };

  tick = () => {
    const time = Date.now() - this.startTime;
    for (let sub of this.subs) {
      sub({ time, isActive: this.isActive, status: this.status });
    }
  };

  subscribe = (callback: Subscriber) => {
    this.subs.add(callback);
    return () => {
      this.subs.delete(callback);
    };
  };
}

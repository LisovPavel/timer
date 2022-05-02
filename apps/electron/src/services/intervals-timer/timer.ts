import { Timer as TimerInterface } from "./intervals-timer-service";

export class Timer implements TimerInterface {
  constructor(private tickDuration: number) {}
  private interval: NodeJS.Timer;

  start = (callback: () => void) => {
    this.interval = setInterval(callback, this.tickDuration);
  };

  stop = () => {
    clearInterval(this.interval);
  };
}

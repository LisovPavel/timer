export class StopwatchService {
  private interval: NodeJS.Timer;
  private callback: (pastedTime: number) => void = null;
  pastedTime = 0;
  constructor(private tickInterval: number = 1000) {}
  startTime = 0;

  start = () => {
    this.startTime = Date.now() - this.pastedTime;
    this.interval = setInterval(this.setPastedTime, this.tickInterval);
  };

  stop = () => {
    clearInterval(this.interval);
    this.pastedTime = 0;
  };

  pause = () => {
    clearInterval(this.interval);
  };

  onTick = (callback: (pastedTime: number) => void) => {
    this.callback = callback;
  };

  private setPastedTime = () => {
    this.pastedTime = Date.now() - this.startTime;
    this.callback?.(this.pastedTime);
  };
}

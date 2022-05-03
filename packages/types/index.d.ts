import { TimerApi } from "./timer";

export * from "./timer";

declare global {
  interface Window {
    timerApi: TimerApi;
  }
}

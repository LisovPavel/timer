import { TimerApi } from "./timer";

export * from "./timer";
export * from "./intervals";

declare global {
  interface Window {
    timerApi: TimerApi;
  }
}

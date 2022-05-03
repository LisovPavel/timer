import { contextBridge, ipcRenderer } from "electron";
import {
  Interval,
  TimerApi,
  Subscriber,
  TickCallbackPayload,
} from "@timer/types";

export enum TimerApiChannels {
  init = "timer-api:init",
  start = "timer-api:start",
  stop = "timer-api:stop",
  increase = "timer-api:increase",
  subscribe = "timer-api:subscribe",
  serviceSubscribe = "service:timer-api:subscribe",
}

class SubsManager {
  subs = new Map<Subscriber, Subscriber>();
  subscribe = (callback: Subscriber) => {
    if (!this.subs.has(callback)) {
      this.subs.set(callback, callback);
    }
    return () => this.unsubscribe(callback);
  };
  unsubscribe = (callback: Subscriber) => {
    this.subs.delete(callback);
  };
  trigger = (payload: TickCallbackPayload) => {
    this.subs.forEach((callback) => callback(payload));
  };
  get isEmpty() {
    return !this.subs.size;
  }
}

const subsManager = new SubsManager();

const subscribeIpcMain = (function () {
  let isSubscribed = false;
  return () => {
    if (isSubscribed) return;
    isSubscribed = true;
    ipcRenderer.send(TimerApiChannels.serviceSubscribe);
    ipcRenderer.on(TimerApiChannels.subscribe, (_, payload) => {
      subsManager.trigger(payload);
    });
  };
})();

const api: TimerApi = {
  init: (intervals: Interval[]) =>
    ipcRenderer.send(TimerApiChannels.init, intervals),
  start: () => ipcRenderer.send(TimerApiChannels.start),
  stop: () => ipcRenderer.send(TimerApiChannels.stop),
  increase: (extraTime: Interval) =>
    ipcRenderer.send(TimerApiChannels.increase, extraTime),
  subscribe: (callback: Subscriber) => {
    subscribeIpcMain();
    return subsManager.subscribe(callback);
  },
};

export const exposeTimerApi = () =>
  contextBridge.exposeInMainWorld("timerApi", api);

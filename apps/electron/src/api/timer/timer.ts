import { contextBridge, ipcRenderer } from "electron";
import { TimerApi, InitialInterval } from "@timer/types";
import { SubscribeService } from "../../services/subscribe/subscribe.service";

export enum TimerApiChannels {
  init = "timer-api:init",
  start = "timer-api:start",
  stop = "timer-api:stop",
  pause = "timer-api:pause",
  addIntervals = "timer-api:add-intervals",
  subscribe = "timer-api:subscribe",
  serviceSubscribe = "service:timer-api:subscribe",
}

const subsManager = new SubscribeService();

const subscribeIpcMain = (function () {
  let isSubscribed = false;
  return () => {
    if (isSubscribed) return;
    isSubscribed = true;
    ipcRenderer.send(TimerApiChannels.serviceSubscribe);
    ipcRenderer.on(TimerApiChannels.subscribe, (_, payload) => {
      subsManager.publishEvent(payload);
    });
  };
})();

const api: TimerApi = {
  start: () => ipcRenderer.send(TimerApiChannels.start),
  stop: () => ipcRenderer.send(TimerApiChannels.stop),
  pause: () => ipcRenderer.send(TimerApiChannels.pause),
  addIntervals: (intervals: InitialInterval[]) =>
    ipcRenderer.send(TimerApiChannels.addIntervals, intervals),
  subscribe: (callback: any) => {
    subscribeIpcMain();
    return subsManager.subscribe(callback);
  },
};

export const exposeTimerApi = () =>
  contextBridge.exposeInMainWorld("timerApi", api);

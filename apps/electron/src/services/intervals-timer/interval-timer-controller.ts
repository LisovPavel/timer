import { ipcMain, BrowserWindow } from "electron";

import { TimerApiChannels } from "../../api/timer/timer";
import { IntervalsTimerService } from "./intervals-timer-service";
import { Timer } from "./timer";

const timer = new Timer(5000);
const timerService = new IntervalsTimerService(timer);

export function initIntervalsTimerController(targetWindow: BrowserWindow) {
  ipcMain.on(TimerApiChannels.init, (_, intervals) => {
    timerService.init(intervals);
  });

  ipcMain.on(TimerApiChannels.start, () => {
    timerService.start();
  });

  ipcMain.on(TimerApiChannels.stop, () => {
    timerService.stop();
  });

  ipcMain.on(TimerApiChannels.increase, (_, extraTime) => {
    timerService.increase(extraTime);
  });

  ipcMain.on(TimerApiChannels.serviceSubscribe, () => {
    timerService.subscribe((payload) => {
      targetWindow.webContents.send(TimerApiChannels.subscribe, payload);
    });
  });
}

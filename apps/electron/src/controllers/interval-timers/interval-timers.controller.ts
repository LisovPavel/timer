import { ipcMain, BrowserWindow } from "electron";

import { TimerApiChannels } from "../../api/timer/timer";
import { IntervalsTimerService } from "../../services/intervals-timer/intervals-timer.service";
import { IntervalsService } from "../../services/intervals/intervals.service";
import { StopwatchService } from "../../services/stopwatch-service/stopwatch.service";
import { SubscribeService } from "../../services/subscribe/subscribe.service";

export class IntervalsTimerController {
  intervalsTimerService: IntervalsTimerService;
  constructor() {
    this.intervalsTimerService = new IntervalsTimerService(
      new StopwatchService(),
      new IntervalsService(),
      new SubscribeService()
    );
  }
  init = (targetWindow: BrowserWindow) => {
    ipcMain.on(TimerApiChannels.start, () => {
      this.intervalsTimerService.start();
    });

    ipcMain.on(TimerApiChannels.stop, () => {
      this.intervalsTimerService.stop();
    });

    ipcMain.on(TimerApiChannels.pause, () => {
      this.intervalsTimerService.pause();
    });

    ipcMain.on(TimerApiChannels.addIntervals, (_, intervals) => {
      this.intervalsTimerService.addIntervals(intervals);
    });

    ipcMain.on(TimerApiChannels.serviceSubscribe, () => {
      this.intervalsTimerService.subscribe((payload) => {
        targetWindow.webContents.send(TimerApiChannels.subscribe, payload);
      });
    });
  };
}

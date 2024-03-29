import { app, BrowserWindow } from "electron";
import * as path from "path";
import { IntervalsTimerController } from "./controllers/interval-timers/interval-timers.controller";

if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    frame: false,
    resizable: false,
    movable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  mainWindow.webContents.openDevTools();

  mainWindow.loadURL("http://localhost:3002");
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const mainIntervalsTimerController = new IntervalsTimerController();

app.whenReady().then(() => {
  mainIntervalsTimerController.init(mainWindow);
});

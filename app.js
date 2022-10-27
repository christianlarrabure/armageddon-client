const { app, BrowserWindow, ipcMain } = require("electron");

const url = require("url");
const path = require("path");
const backend = require("./backend");
const sequelize = require("./backend/utils/database");

let mainWindow;

sequelize
  .sync()
  .then(() => {
    try {
      function createWindow() {
        mainWindow = new BrowserWindow({
          show: false,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
          },
        });

        mainWindow.loadFile("dist/client/index.html");

        mainWindow.maximize();
        mainWindow.show();

        mainWindow.on("closed", function () {
          mainWindow = null;
        });
      }

      app.whenReady().then(() => {
        createWindow();
        ipcMain.on("init", (event) => {
          backend.init(event);
        });

        ipcMain.on("sendInput", (event, input) => {
          backend.sendInput(input);
        });
      });

      app.on("window-all-closed", function () {
        if (process.platform !== "darwin") app.quit();
      });

      app.on("activate", function () {
        if (mainWindow === null) createWindow();
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  })
  .catch((error) => {
    console.error(error);
  });

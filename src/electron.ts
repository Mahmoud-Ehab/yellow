import { app, BrowserWindow } from "electron";
import { startServer, closeServer } from "./server";

import handler from "serve-handler";
import http from "http";
import path from "path";
import { argv } from "node:process";

import * as actions from "./server_lib/server.actions";

let app_server = null;

try {
  if (require("electron-squirrel-startup")) app.quit();
  const config = actions.getConfig().res as unknown as any;
  if (argv[2] != "--dev") {
    app_server = http.createServer((request, response) => {
      // You pass two more arguments for config and middleware
      // More details here: https://github.com/vercel/serve-handler#options
      return handler(request, response, {
        public: "resources/web",
      });
    });
    app_server.listen(config.app_port, config.host_ip, () => {
      console.log(
        `serve running at http://${config.host_ip}:${config.app_port}`,
      );
    });
  } else {
    config.app_port = 8081;
  }

  let mainWindow: BrowserWindow;
  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, "electron.preload.js"),
      },
    });
    mainWindow.loadURL(
      `${config.protocol}://${config.host_ip}:${config.app_port}`,
    );
    mainWindow.on("closed", () => (mainWindow = null));
  }

  app.on("ready", createWindow);

  app.on("window-all-closed", () => {
    closeServer();
    if (app_server) app_server.close();
    app.quit();
  });

  app.on("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  startServer();
} catch (err) {
  console.error(err);
  closeServer();
  if (app_server) app_server.close();
  app.quit();
}

import { ipcMain } from "electron";
try {
  const Actions = actions.Actions;
  ipcMain.handle(Actions.GET_INFO, (_) => actions.getInfo());
  ipcMain.handle(Actions.SET_INFO, (_, username, ipaddr) =>
    actions.setInfo(username, ipaddr),
  );
  ipcMain.handle(Actions.SET_IMAGE, (_, imguri) => actions.setImage(imguri));
  ipcMain.handle(Actions.GET_CONTACTS, (_) => actions.getContacts());
  ipcMain.handle(Actions.ADD_CONTACT, (_, username, ipaddr) =>
    actions.addContact(username, ipaddr),
  );
  ipcMain.handle(Actions.RMV_CONTACT, (_, ipaddr) => actions.rmvContact(ipaddr));

  ipcMain.handle(Actions.GET_MESSAGES, (_, ipaddr) => actions.getMessages(ipaddr));
  ipcMain.handle(Actions.ADD_MESSAGES, (_, ipaddr, msgs_texts) =>
    actions.addMessages(ipaddr, msgs_texts),
  );

  ipcMain.handle(Actions.GET_CONFIG, () => actions.getConfig());
  ipcMain.handle(Actions.UPDATE_CONFIG, (_, config) => {
    const actionReturn = actions.updateConfig(config as unknown);
    if (actionReturn.res === true) {
      closeServer();
      if (app_server) app_server.close();
      app.quit();
    } else {
      return actionReturn;
    }
  });
} catch (err) {
  console.error(err);
  closeServer();
  if (app_server) app_server.close();
  app.quit();
}

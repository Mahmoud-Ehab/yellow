import { app, BrowserWindow } from 'electron'
import { startServer, closeServer } from './server'
import { Actions } from './server.actions'

import handler from 'serve-handler'
import http from 'http'
import path from 'path'
import config from "./yellow.config"
import { argv } from 'node:process'

if (require('electron-squirrel-startup')) app.quit();

if (argv[2] != "--dev") {
  const server = http.createServer((request, response) => {
    // You pass two more arguments for config and middleware
    // More details here: https://github.com/vercel/serve-handler#options
    return handler(request, response, {
      public: "out/web"
    });
  });
  server.listen(config.app_port, config.host_ip, () => {
    console.log(`serve running at http://${config.host_ip}:${config.app_port}`);
  });
}

let mainWindow: BrowserWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "electron.preload.js")
    },
  })
  mainWindow.loadURL(`${config.protocol}://${config.host_ip}:${config.app_port}`)
  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  closeServer();
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

startServer();


import { ipcMain } from 'electron'
import { 
  getInfo,
  setInfo,
  setImage,
  getContacts,
  addContact,
  rmvContact,
  getMessages,
  addMessages
} from './server'

ipcMain.handle(Actions.GET_INFO, (_) => getInfo())
ipcMain.handle(Actions.SET_INFO, (_, username, ipaddr) => setInfo(username, ipaddr))
ipcMain.handle(Actions.SET_IMAGE, (_, imguri) => setImage(imguri))
ipcMain.handle(Actions.GET_CONTACTS, (_) => getContacts())
ipcMain.handle(Actions.ADD_CONTACT, (_, username, ipaddr) => addContact(username, ipaddr))
ipcMain.handle(Actions.RMV_CONTACT, (_, ipaddr) => rmvContact(ipaddr))

ipcMain.handle(Actions.GET_MESSAGES, (_, ipaddr) => getMessages(ipaddr))
ipcMain.handle(Actions.ADD_MESSAGES, (_, ipaddr, msgs_texts) => addMessages(ipaddr, msgs_texts))

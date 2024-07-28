import { app, BrowserWindow } from 'electron'

import { startServer, closeServer, Actions } from './js/server.mjs'
import path from 'path'
import isDiv from 'electron-is-dev'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import config from "./yellow.config.mjs"

import handler from 'serve-handler'
import http from 'http'

if (!isDiv) {
  const server = http.createServer((request, response) => {
    // You pass two more arguments for config and middleware
    // More details here: https://github.com/vercel/serve-handler#options
    return handler(request, response, {
      public: "dist"
    });
  });

  server.listen(config.app_port, config.host_ip, () => {
    console.log(`serve running at http://${config.host_ip}:${config.app_port}`);
  });
}

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "electron.preload.mjs")
    },
  })
  mainWindow.loadURL(`${config.protocol}://${config.host_ip}:${config.app_port}`)
  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  closeServer();
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
} from './js/server.mjs'

ipcMain.handle(Actions.GET_INFO, (_) => getInfo())
ipcMain.handle(Actions.SET_INFO, (_, username, ipaddr) => setInfo(username, ipaddr))
ipcMain.handle(Actions.SET_IMAGE, (_, imguri) => setImage(imguri))
ipcMain.handle(Actions.GET_CONTACTS, (_) => getContacts())
ipcMain.handle(Actions.ADD_CONTACT, (_, username, ipaddr) => addContact(username, ipaddr))
ipcMain.handle(Actions.RMV_CONTACT, (_, username, ipaddr) => rmvContact(username, ipaddr))

ipcMain.handle(Actions.GET_MESSAGES, (_, ipaddr) => getMessages(ipaddr))
ipcMain.handle(Actions.ADD_MESSAGES, (_, ipaddr, msgs_texts) => addMessages(ipaddr, msgs_texts))

import { app, BrowserWindow } from 'electron'

import { startServer, closeServer } from './js/server.mjs'
import path from 'path'
import isDiv from 'electron-is-dev'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "electron.preload.mjs")
    },
  });
  
  // TODO: add the built html file location
  const startURL = isDiv ? 'http://localhost:8081' : "file://" 
  mainWindow.loadURL(startURL);
  mainWindow.on('closed', () => (mainWindow = null));
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
  getContacts 
} from './js/server.mjs'

ipcMain.handle('getContacts', () => {
  return getContacts()
})

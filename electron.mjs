// electron.js
import { app, BrowserWindow } from 'electron'
import { startServer, closeServer } from './js/server.mjs'
import isDiv from 'electron-is-dev'

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
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

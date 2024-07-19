// electron.js
import { app, BrowserWindow } from 'electron'
import { startServer, closeServer } from './js/server.mjs'

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startURL = 'http://localhost:8081'
  mainWindow.loadURL(startURL);
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    closeServer();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

startServer();

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  getContacts: (callback) => ipcRenderer.invoke('getContacts').then(res => callback(res)),

  setImage: (imgbuff) => ipcRenderer.invoke("setImage", imgbuff),
})

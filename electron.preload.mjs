import { contextBridge, ipcRenderer } from 'electron'
import { Actions } from './js/server.mjs'

contextBridge.exposeInMainWorld('electron', {
  getInfo: (callback) => ipcRenderer.invoke(Actions.GET_INFO).then(res => callback(res)),
  setInfo: (username, ipaddr, callback) => ipcRenderer.invoke(Actions.SET_INFO, username, ipaddr).then(res => callback(res)), 
  setImage: (imgbuff, callback) => ipcRenderer.invoke(Actions.SET_IMAGE, imgbuff).then(res => callback(res)),
  getContacts: (callback) => ipcRenderer.invoke(Actions.GET_CONTACTS).then(res => callback(res)),
  addContact: (username, ipaddr, callback) => ipcRenderer.invoke(Actions.ADD_CONTACT, username, ipaddr).then(res => callback(res)),
  rmvContact: (ipaddr, callback) => ipcRenderer.invoke(Actions.RMV_CONTACT, ipaddr).then(res => callback(res)),
})

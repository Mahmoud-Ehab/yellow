import { contextBridge, ipcRenderer } from "electron";
import { Actions } from "./server_lib/server.actions";

contextBridge.exposeInMainWorld("electron", {
  getInfo: (callback: Function) =>
    ipcRenderer.invoke(Actions.GET_INFO).then((res) => callback(res)),
  setInfo: (username: string, ipaddr: string, callback: Function) =>
    ipcRenderer
      .invoke(Actions.SET_INFO, username, ipaddr)
      .then((res) => callback(res)),
  setImage: (imguri: string, callback: Function) =>
    ipcRenderer.invoke(Actions.SET_IMAGE, imguri).then((res) => callback(res)),
  getContacts: (callback: Function) =>
    ipcRenderer.invoke(Actions.GET_CONTACTS).then((res) => callback(res)),
  addContact: (username: string, ipaddr: string, callback: Function) =>
    ipcRenderer
      .invoke(Actions.ADD_CONTACT, username, ipaddr)
      .then((res) => callback(res)),
  rmvContact: (ipaddr: string, callback: Function) =>
    ipcRenderer
      .invoke(Actions.RMV_CONTACT, ipaddr)
      .then((res) => callback(res)),
  getMessages: (ipaddr: string, callback: Function) =>
    ipcRenderer
      .invoke(Actions.GET_MESSAGES, ipaddr)
      .then((res) => callback(res)),
  addMessages: (
    ipaddr: string,
    msgs_texts: Array<string>,
    callback: Function,
  ) =>
    ipcRenderer
      .invoke(Actions.ADD_MESSAGES, ipaddr, msgs_texts)
      .then((res) => callback(res)),
  getConfig: (callback: Function) =>
    ipcRenderer.invoke(Actions.GET_CONFIG).then((res) => callback(res)),
  updateConfig: (
    host_ip: string,
    server_port: number,
    app_port: number,
    callback: Function,
  ) =>
    ipcRenderer
      .invoke(Actions.UPDATE_CONFIG, {
        host_ip,
        server_port,
        app_port,
      })
      .then((res) => callback(res)),
});

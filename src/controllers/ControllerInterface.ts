import { ActionReturn } from '../server.actions'

export type Callback = (res: ActionReturn) => void;

export interface Controller {
  getInfo: (callback: Callback) => void,
  setInfo: (username: string, ipaddr: string, callback: Callback) => void, 
  setImage: (imgUrl: string, callback: Callback) => void,
  getContacts: (callback: Callback) => void, 
  addContact: (username: string, ipaddr: string, callback: Callback) => void,
  rmvContact: (ipaddr: string, callback: Callback) => void,
  getMessages: (ipaddr: string, callback: Callback) => void,
  addMessages: (ipaddr: string, msgs_texts: string[], callback: Callback) => void,
  getConfig: (callback: Callback) => void,
  updateConfig: (host_ip: string, server_port: number, app_port: number, callback: Callback) => void
}

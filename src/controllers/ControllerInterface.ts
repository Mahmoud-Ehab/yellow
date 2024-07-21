import { ActionReturn } from '../server'

export type Callback = (res: ActionReturn) => void;

export interface Controller {
  getInfo: (callback: Callback) => void,
  setInfo: (username: string, ipaddr: string, callback: Callback) => void, 
  setImage: (input: Uint8Array, callback: Callback) => void,
  getContacts: (callback: Callback) => void, 
  addContact: (username: string, ipaddr: string, callback: Callback) => void,
  rmvContact: (ipaddr: string, callback: Callback) => void,
}

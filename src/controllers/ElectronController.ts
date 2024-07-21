import { Controller, Callback } from './ControllerInterface'

export class ElectronController implements Controller {
  getInfo(callback: Callback) {
    (window as any).electron.getInfo(callback)
  }
  setInfo(username: string, ipaddr: string, callback: Callback) {
    (window as any).electron.setInfo(username, ipaddr, callback)
  } 
  setImage(input: Uint8Array, callback: Callback) {
    (window as any).electron.setImage(input, callback)
  }
  getContacts(callback: Callback) {
    (window as any).electron.getContacts(callback)
  }
  addContact(username: string, ipaddr: string, callback: Callback) {
    (window as any).electron.addContact(username, ipaddr, callback)
  }
  rmvContact(ipaddr: string, callback: Callback) {
    (window as any).electron.rmvContact(ipaddr, callback)
  }
}

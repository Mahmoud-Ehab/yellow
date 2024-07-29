import { Controller, Callback } from "./ControllerInterface";

export class ElectronController implements Controller {
  getInfo(callback: Callback) {
    (window as any).electron.getInfo(callback);
  }
  setInfo(username: string, ipaddr: string, callback: Callback) {
    (window as any).electron.setInfo(username, ipaddr, callback);
  }
  setImage(imgUri: string, callback: Callback) {
    (window as any).electron.setImage(imgUri, callback);
  }
  getContacts(callback: Callback) {
    (window as any).electron.getContacts(callback);
  }
  addContact(username: string, ipaddr: string, callback: Callback) {
    (window as any).electron.addContact(username, ipaddr, callback);
  }
  rmvContact(ipaddr: string, callback: Callback) {
    (window as any).electron.rmvContact(ipaddr, callback);
  }
  getMessages(ipaddr: string, callback: Callback) {
    (window as any).electron.getMessages(ipaddr, callback);
  }
  addMessages(ipaddr: string, msgs_texts: string[], callback: Callback) {
    (window as any).electron.addMessages(ipaddr, msgs_texts, callback);
  }
  getConfig(callback: Callback) {
    (window as any).electron.getConfig(callback);
  }
  updateConfig(
    host_ip: string,
    server_port: number,
    app_port: number,
    callback: Callback,
  ) {
    (window as any).electron.updateConfig(
      host_ip,
      server_port,
      app_port,
      callback,
    );
  }
}

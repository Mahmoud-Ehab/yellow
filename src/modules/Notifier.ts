export type Notification = {
  text: string;
  type: "success" | "warning" | "error";
  time?: number;
};

type Listener = {
  name: string;
  func: (notifier: Notifier) => any;
};

export class Notifier {
  private list: Notification[] = [];
  private onChangeListeners: Listener[] = [];

  get notifications() {
    return this.list;
  }

  notify(notif: Notification) {
    this.list = [...this.list, notif];
    for (let listener of this.onChangeListeners) listener.func(this);
    setTimeout(() => this.remove(notif), notif.time || 5000);
  }

  addOnChangeListener(listener: Listener) {
    const found = this.onChangeListeners.find((l) => l.name === listener.name);
    if (!found) this.onChangeListeners.push(listener);
  }

  private remove(notif: Notification) {
    this.list = this.list.filter((n) => n !== notif);
    for (let listener of this.onChangeListeners) listener.func(this);
  }
}

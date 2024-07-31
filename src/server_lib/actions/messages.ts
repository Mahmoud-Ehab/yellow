import { StateFile } from "cracksdb"
import { SM } from "../../inits/stateManager.init"
import { getInfo } from "./user"
import { Message, ActionReturn } from "../types"
import { getSocket } from "../sockets"


// ipaddr: the ip of the contacts
// index: the number of the crack file (from cracksdb), defaults to 0.
export const getMessages = (ipaddr: string, index?: number): ActionReturn => {
  const sf = SM.get(ipaddr);
  if (!sf) {
    return { res: [] };
  }
  const i = index || 0;
  return { res: sf.getList(0, 25 * (i + 1)) };
};

// expected to be invoked when the users add (send) messages to the chat
export const addMessages = (
  ipaddr: string,
  msgs_texts: Array<string>,
): ActionReturn => {
  const messages: Array<Message> = [];
  for (let text of msgs_texts) {
    messages.push({
      content: text,
      sender_ip: (getInfo().res as unknown as any).ipaddr,
      pending: true,
    });
  }
  const sent = sendMessages(ipaddr, messages);
  for (let msg of messages) {
    msg.pending = !sent;
  }
  addMsgs(ipaddr, messages);
  return { res: true };
};

// an auxiliary function to addMessages
export const sendMessages = (ipaddr: string, messages: Array<Message>) => {
  const socket = getSocket(ipaddr);
  if (!socket) {
    return false;
  }
  const msgs_texts = [];
  for (let msg of messages) {
    msgs_texts.push(msg.content);
  }
  socket.emit("message", { msgs_texts });
  return true;
};

// an auxiliary function to addMessages... In addition it can be used
// in recieving messages. (it add messages without invoking sendMessages)
export const addMsgs = (ipaddr: string, messages: Array<Message>) => {
  const sf = SM.get(ipaddr);
  if (!sf) {
    return false;
  }
  for (let msg of messages) {
    sf.add(msg);
  }
  return true;
}

// shall be invoked in the end of a socket communication
export const saveMsgs = (ipaddr: string) => {
  try {
    const sf = SM.get(ipaddr);
    if (!sf) {
      return false;
    }
    sf.save();
    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

// shall be invoked while establishing a socket connection in order to 
// check out the messages that have been wrote while the connection was off.
export const getPendingMsgs = (ipaddr: string) => {
  const sf = SM.get(ipaddr) as StateFile<Message>;
  if (!sf) {
    return [];
  }
  return sf.getListWhere((msg) => msg.pending === true);
}

// shall be used once all pending messages are sent successfully
export const adjustPendings = (ipaddr: string) => {
  const sf = SM.get(ipaddr) as StateFile<Message>;
  if (!sf) {
    return false;
  }
  sf.updateWhere(
    (msg) => msg.pending === true,
    (msg) => ({ ...msg, pending: false }),
  )
}

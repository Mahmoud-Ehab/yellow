import { contacts } from "../statefiles/contacts"
import { createMsgRoom, deleteMsgRoom } from "../statefiles/messages"
import { ActionReturn } from "../types"

export const getContacts = (): ActionReturn => {
  return { res: contacts.getListWhere(() => true) };
}

export const addContact = (username: string, ipaddr: string): ActionReturn => {
  try {
    const found = contacts.getWhere((obj) => obj.ipaddr === ipaddr);
    if (Object.keys(found).length > 0) {
      return { err: "contact already exists.", res: false };
    }
    contacts.add({
      username,
      ipaddr,
    });
    createMsgRoom(ipaddr); // Initialize the permenant storage to save and retrieve messages
    return { res: true };
  } catch (err) {
    console.error(err);
    return { err, res: false };
  }
}

export const rmvContact = (ipaddr: string): ActionReturn => {
  try {
    const indexes = contacts.getIndexOf((obj) => obj.ipaddr === ipaddr);
    if (indexes.length === 0) {
      return { err: "contact not realy found!", res: false };
    }
    for (let index of indexes) {
      contacts.remove(index);
      deleteMsgRoom(ipaddr);
    }
    return { res: true };
  } catch (err) {
    console.error(err);
    return { err, res: false };
  }
}


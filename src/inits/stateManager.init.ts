import { FileManager, StateManager, StateFile } from "cracksdb" 

export type Contact = {
    username: string,
    ipaddr: string,
}

export type Message = {
  content: string,
  sender_ip: string,
  pending: boolean
}

const SM = new StateManager("./js/sfs", new FileManager({}))

let myinfo: StateFile<Contact> = null;
let contacts: StateFile<Contact> = null;
try {
    myinfo = SM.get("myinfo") as StateFile<Contact>;
    contacts = SM.get("contacts") as StateFile<Contact>;
}
catch(err) {
    myinfo = SM.add<Contact>("myinfo");
    myinfo.add({username: "", ipaddr: ""});
    contacts = SM.add<Contact>("contacts");
}

export { contacts }

export const user = {
    get: () => myinfo.get(0),
    set: (username: string, ipaddr: string) => {
        myinfo.update(0, () => ({ username, ipaddr }))
    }
}

export const createMsgRoom = function (ipaddr: string) {
  try {
    const sf = SM.add<Message>(ipaddr, ipaddr)
    sf.extendUnitType({ 
      content: "string", 
      sender_ip: "string", 
      pending: "boolean" 
    })
    sf.setLimit(25)
    sf.setSimul(false)
  }
  catch(err) {
    console.warn(err)
  }
}

export const deleteMsgRoom = function (ipaddr: string) {
  SM.delete(ipaddr, ipaddr)
}

export const getMsgs = (ipaddr: string, index: number) => {
  const sf = SM.get(ipaddr)
  if (!sf) {
    return []
  }
  const i = index || 0
  return sf.getList(0, 25 * (i + 1))
}

export const addMsgs = (ipaddr: string, messages: Array<Message>) => {
  const sf = SM.get(ipaddr)
  if (!sf) {
    return false
  }
  for (let msg of messages) {
    sf.add(msg)
  }
  return true
}

export const saveMsgs = (ipaddr: string) => {
  try {
    const sf = SM.get(ipaddr)
    if (!sf) {
      return false
    }
    sf.save()
    return true
  }
  catch(err) {
    console.warn(err)
    return false
  }
}

export const getPendingMsgs = (ipaddr: string) => {
  const sf = SM.get(ipaddr) as StateFile<Message>
  if (!sf) {
    return []
  }
  return sf.getListWhere(msg => msg.pending === true)
} 

export const adjustPendings = (ipaddr: string) => {
  const sf = SM.get(ipaddr) as StateFile<Message>
  if (!sf) {
    return false
  }
  sf.updateWhere(
    msg => msg.pending === true,
    msg => ({...msg, pending: false})
  )
}

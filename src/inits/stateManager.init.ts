import { FileManager, StateManager, StateFile } from "cracksdb" 
import { execSync } from "node:child_process"

function myIpAddr() {
  const stdout = execSync("ipconfig", { encoding: "utf8" })
  const start = stdout.search("192")
  let out: Array<any> = stdout.substring(start, start + 15).split(".")
  if (out.length < 4) {
    console.error("couldn't find an ip address!")
    return ""
  }
  out.length = 4
  out = out.map(elem => parseInt(elem))
  return out.join(".")
}

export type Contact = {
    username: string,
    ipaddr: string,
}

export type Message = {
  content: string,
  sender_ip: string,
  pending: boolean
}

export type Config = {
  protocol: "http" | "https",
  host_ip: string,
  server_port: number,
  app_port: number
}

const SM = new StateManager("./resources/js/sfs", new FileManager({}))

let myinfo: StateFile<Contact> = null;
let contacts: StateFile<Contact> = null;
let config: StateFile<Config> = null;
try {
    myinfo = SM.get("myinfo") as StateFile<Contact>;
    contacts = SM.get("contacts") as StateFile<Contact>;
    config = SM.get("config") as StateFile<Config>;
}
catch(err) {
    myinfo = SM.add<Contact>("myinfo");
    myinfo.extendUnitType({ username: "string", ipaddr: "string" })
    myinfo.add({username: "", ipaddr: ""});
    contacts = SM.add<Contact>("contacts");
    config = SM.add<Config>("config");
    config.extendUnitType({
      protocol: "string",
      host_ip: "string",
      server_port: "number",
      app_port: "number"
    })
    config.add({
      protocol: "http",
      host_ip: myIpAddr() || "localhost",
      server_port: 5123,
      app_port: 8123, 
    })
}

export { contacts }

export const user = {
    get: () => myinfo.get(0),
    set: (username: string, ipaddr: string) => {
      myinfo.update(0, () => ({ username, ipaddr }))
    }
}

export const getConfig = () => config.get(0);
export const updateConfig = (newconfig: Partial<Config>) => {
  config.update(0, prev => ({...prev, ...newconfig}))
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

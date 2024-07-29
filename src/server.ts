import path from "path"
import fs from 'fs'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/*** trivial express server with only two endpoints ***/
import express from "express"
import http from 'http'
import cors from "cors"
import bodyParser from "body-parser"
import config from "./yellow.config"

const app = express();
const server = http.createServer(app);

app.use(cors())
app.use(bodyParser.json());

app.get('/', (_, res) => {
    res.json({response: user.get()}).end();
})

app.get('/image', (_, res) => {
    res.sendFile(path.join(__dirname, '/usrimg.jpg'))
})

/*** export functions for starting and stopping the server ***/
export const startServer = () => {
  server.listen(config.server_port, config.host_ip, () => {
    console.log(`listening on ${config.protocol}://${config.host_ip}:${config.server_port}`);
  })
}

export const closeServer = () => {
  server.close((err) => {
    if (err) {
      console.log("server has shutdown due to an error...")
      console.error(err)
      return
    }
    console.log("server has shutdown gracefully.")
  })
}


/*** Action functions that manipulate the database ***/
import { user, contacts, createMsgRoom, deleteMsgRoom } from "./inits/stateManager.init";
import { ActionReturn } from "./server.actions"

export const getInfo = (): ActionReturn => {
    return {res: user.get()}
}

export const setInfo = (username: string, ipaddr: string): ActionReturn => {
    try {
        user.set(username, ipaddr)
        return {res: true}
    }
    catch(err) {
        console.error(err);
        return {err, res: false}
    }
}

export const setImage = (imgUri: string): ActionReturn => {
  try {
    fs.writeFileSync(
      path.join(__dirname, '/usrimg.jpg'),
      Buffer.from(imgUri.split(',')[1], 'base64')
    ) 
    return {res: true}
  }
  catch(err) {
    console.error(err)
    return {res: false, err: "something went wrong!"}
  }
}

export const getContacts = (): ActionReturn => {
    return {
      res: contacts.getListWhere(() => true)
    }
}

export const addContact = (username: string, ipaddr: string): ActionReturn => {
    try {
        const found = contacts.getWhere((obj) => obj.ipaddr === ipaddr);
        if (Object.keys(found).length > 0) {
            return {err: "contact already exists.", res: false};
        }
        contacts.add({
            username,
            ipaddr
        })
        createMsgRoom(ipaddr) // Initialize the permenant storage to save and retrieve messages
        return {res: true}
    }
    catch(err) {
        console.error(err);
        return {err, res: false}
    }
}

export const rmvContact = (ipaddr: string): ActionReturn => {
    try {
        const indexes = contacts.getIndexOf((obj) => obj.ipaddr === ipaddr)
        if (indexes.length === 0) {
            return {err: "contact not realy found!", res: false}
        }
        for (let index of indexes) {
            contacts.remove(index)
            deleteMsgRoom(ipaddr)
        }
        return {res: true}
    }
    catch(err) {
        console.error(err);
        return {err, res: false}
    }
}


/*** socket.io server for chatting rooms ***/
import { Server } from "socket.io"
import { 
  Message,
  getMsgs,
  saveMsgs,
  addMsgs,
  getPendingMsgs,
  adjustPendings
} from "./inits/stateManager.init"

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})
const sockets = {}

io.on("connection", (socket) => {
  const ipaddr = socket.handshake.address.split(":").reverse()[0] 
  sockets[ipaddr] = socket
  console.log("user connected: ", ipaddr)
  
  // ensure with the client that a connection has been established
  // and exchange pending messages
  socket.emit("listening")
  const pending_msgs = getPendingMsgs(ipaddr)
  if (sendMessages(ipaddr, pending_msgs)) {
    adjustPendings(ipaddr)
  }

  socket.on("message", ({ msgs_texts }) => {
    const messages: Array<Message> = []
    for (let msg_text of msgs_texts) {
      messages.push({
        content: msg_text,
        sender_ip: ipaddr,
        pending: false
      })
    }
    addMsgs(ipaddr, messages)
  })

  socket.on("disconnect", () => {
    saveMsgs(ipaddr)
    sockets[ipaddr] = undefined
    console.log("user disconnected: ", ipaddr)
  })
})

// ipaddr: the ip of the contacts
// index: the number of the crack file (from cracksdb), defaults to 0.
export const getMessages = (ipaddr: string, index?: number): ActionReturn => {
  return { res: getMsgs(ipaddr, index)  }
}

export const addMessages = (ipaddr: string, msgs_texts: Array<string>): ActionReturn => {
  const messages: Array<Message> = []
  for (let text of msgs_texts) {
    messages.push({
      content: text,
      sender_ip: user.get().ipaddr,
      pending: true
    })
  }
  const sent = sendMessages(ipaddr, messages)
  for (let msg of messages) {
    msg.pending = !sent
  }
  addMsgs(ipaddr, messages)
  return { res: true }
}

const sendMessages = (ipaddr: string, messages: Array<Message>) => {
  const socket = sockets[ipaddr]
  if (!socket) {
    return false
  }
  const msgs_texts = []
  for (let msg of messages) {
      msgs_texts.push(msg.content)
  }
  socket.emit("message", { msgs_texts })
  return true
}


import { user, contacts, createMsgRoom } from "./inits/stateManager.init";
import express from "express"
import http from 'http'
import cors from "cors"
import bodyParser from "body-parser"
import path from "path"
import fs from 'fs'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export type ActionReturn = {
  err?: string,
  res: object | Array<any> | boolean
}

export const Actions = {
  GET_INFO: "getInfo",
  SET_INFO: "setInfo",
  SET_IMAGE: "setImage",
  GET_CONTACTS: "getContacts",
  ADD_CONTACT: "addContact",
  RMV_CONTACT: "rmvContact"
}

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
        }
        return {res: true}
    }
    catch(err) {
        console.error(err);
        return {err, res: false}
    }
}

export const startServer = () => {
  server.listen(5000, () => {
    console.log('listening on localhost:5000');
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

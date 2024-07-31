import http from "http"
import { Server } from "socket.io" 
import { storeSocket, rmvSocket } from "./sockets"

import {
  addMsgs,
  saveMsgs,
  sendMessages, 
  getPendingMsgs, 
  adjustPendings 
} from "./actions/messages"

import { Message } from "./types"

export function initSocketServer(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    const ipaddr = socket.handshake.address.split(":").reverse()[0];
    storeSocket(ipaddr, socket)
    console.log("user connected: ", ipaddr);

    // ensure with the client that a connection has been established
    // and exchange pending messages
    socket.emit("listening");
    const pending_msgs = getPendingMsgs(ipaddr);
    if (sendMessages(ipaddr, pending_msgs)) {
      adjustPendings(ipaddr);
    }

    socket.on("message", onRecieveMessage(ipaddr));
    socket.on("disconnect", () => {
      saveMsgs(ipaddr);
      rmvSocket(ipaddr);
      console.log("user disconnected: ", ipaddr);
    });
  });
}

function onRecieveMessage(ipaddr: string) {
  return function({ msgs_texts }) {
    const messages: Array<Message> = [];
    for (let msg_text of msgs_texts) {
      messages.push({
        content: msg_text,
        sender_ip: ipaddr,
        pending: false,
      });
    }
    addMsgs(ipaddr, messages);
  }
}

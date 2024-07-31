import { SM } from "../../inits/stateManager.init"
import { Message } from "../types"

export const createMsgRoom = function (ipaddr: string) {
  try {
    const sf = SM.add<Message>(ipaddr, ipaddr);
    sf.extendUnitType({
      content: "string",
      sender_ip: "string",
      pending: "boolean",
    });
    sf.setLimit(25);
    sf.setSimul(false);
  } catch (err) {
    console.warn(err);
  }
}

export const deleteMsgRoom = function (ipaddr: string) {
  SM.delete(ipaddr, ipaddr);
}


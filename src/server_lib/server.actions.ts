import { getInfo, setInfo, setImage } from "./actions/user"
import { getContacts, addContact, rmvContact } from "./actions/contacts"
import { getMessages, addMessages } from "./actions/messages"
import { getConfig, updateConfig } from "./actions/config"

export const Actions = {
  GET_INFO: "getInfo",
  SET_INFO: "setInfo",
  SET_IMAGE: "setImage",
  GET_CONTACTS: "getContacts",
  ADD_CONTACT: "addContact",
  RMV_CONTACT: "rmvContact",
  GET_MESSAGES: "getMessages",
  ADD_MESSAGES: "addMessages",
  GET_CONFIG: "getConfig",
  UPDATE_CONFIG: "updateConfig",
};

export {
  getInfo,
  setInfo,
  setImage,

  getContacts,
  addContact,
  rmvContact,

  getMessages,
  addMessages,

  getConfig,
  updateConfig,
}

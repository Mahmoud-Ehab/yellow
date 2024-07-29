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
  RMV_CONTACT: "rmvContact",
  GET_MESSAGES: "getMessages",
  ADD_MESSAGES: "addMessages"
}


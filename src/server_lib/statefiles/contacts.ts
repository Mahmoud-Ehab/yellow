import { StateFile } from "cracksdb" 
import { SM } from "../../inits/stateManager.init"
import { Contact } from "../types"

let contacts: StateFile<Contact>;
try { 
  contacts = SM.get("contacts") as StateFile<Contact>
}
catch(_) {
  contacts = SM.add<Contact>("contacts");
}
export { contacts }

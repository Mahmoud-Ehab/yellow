import { StateFile } from "cracksdb" 
import { SM } from "../../inits/stateManager.init"
import { Contact } from "../types"

let user: StateFile<Contact>
try {
  user = SM.get("myinfo") as StateFile<Contact>;
}
catch(_) {
  user = SM.add<Contact>("myinfo");
  user.extendUnitType({ username: "string", ipaddr: "string" });
  user.add({ username: "", ipaddr: "" });
}

export { user }

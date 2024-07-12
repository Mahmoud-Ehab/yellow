import { FileManager, StateManager, StateFile } from "cracksdb"

type Contact = {
    username: string,
    ipaddr: string,
}

export const SM = new StateManager("./js/sfs", new FileManager({}))

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
        myinfo.update(0, {
            username,
            ipaddr
        })
    }
}
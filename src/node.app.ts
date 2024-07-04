import { SM } from "./inits/stateManager.init";
const usersSF = SM.get("users");
console.log(usersSF.getListWhere((obj) => true));

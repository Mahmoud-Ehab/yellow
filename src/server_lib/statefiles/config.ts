import { StateFile } from "cracksdb"
import { SM } from "../../inits/stateManager.init"
import { Config } from "../types"

let config: StateFile<Config>
try {
  config = SM.get("config") as StateFile<Config>;
} catch (err) {
  config = SM.add<Config>("config");
  config.extendUnitType({
    protocol: "string",
    host_ip: "string",
    server_port: "number",
    app_port: "number",
  });
  config.add({
    protocol: "http",
    host_ip: myIpAddr() || "localhost",
    server_port: 5123,
    app_port: 8123,
  });
}
export { config }

import { execSync } from "node:child_process";
function myIpAddr() {
  const stdout = execSync("ipconfig", { encoding: "utf8" });
  const start = stdout.search("192");
  let out: Array<any> = stdout.substring(start, start + 15).split(".");
  if (out.length < 4) {
    console.error("couldn't find an ip address!");
    return "";
  }
  out.length = 4;
  out = out.map((elem) => parseInt(elem));
  return out.join(".");
}

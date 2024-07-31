import path from "path"
import process from "node:process"

/*** trivial express server with only two endpoints ***/
import express from "express"
import http from "http"
import cors from "cors"
import bodyParser from "body-parser"

import { getInfo } from "./server_lib/actions/user"
import { getConfig } from "./server_lib/actions/config"
import { initSocketServer } from "./server_lib/socket.server"

const config = getConfig().res as unknown as any;
const app = express();
const server = http.createServer(app);
initSocketServer(server)

app.use(cors());
app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.json({ response: getInfo().res }).end();
});

app.get("/image", (_, res) => {
  res.sendFile(path.join(process.cwd(), "/resources/usrimg.jpg"));
});

/*** export functions for starting and stopping the server ***/
export const startServer = () => {
  server.listen(config.server_port, config.host_ip, () => {
    console.log(
      `listening on ${config.protocol}://${config.host_ip}:${config.server_port}`,
    );
  });
};

export const closeServer = () => {
  server.close((err) => {
    if (err) {
      console.log("server has shutdown due to an error...");
      console.error(err);
      return;
    }
    console.log("server has shutdown gracefully.");
  });
};


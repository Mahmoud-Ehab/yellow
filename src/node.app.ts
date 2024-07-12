import { user, contacts } from "./inits/stateManager.init";
import express from "express"
import http from 'http'
import cors from "cors"
import bodyParser from "body-parser";

const app = express();
const server = http.createServer(app);

app.use(cors())
app.use(bodyParser.json());

app.get('/', (_, res) => {
    res.json({response: user.get()}).end();
})

app.get('/contacts', (_, res) => {
    res.json({response: contacts.getListWhere(() => true)}).end();
})

app.post('/', (req, res) => {
    try {
        if (!req.body["username"] || !req.body["ipaddr"]) {
            res.status(400).end();
            return;
        }
        user.set(req.body["username"], req.body["ipaddr"])
        res.status(200).end();
    }
    catch(err) {
        console.error(err);
        res.status(500).end();
    }
})

app.post('/contacts/add', (req, res) => {
    try {
        if (!req.body["username"] || !req.body["ipaddr"]) {
            res.status(400).end();
            return;
        }
        const exists = contacts.getWhere((obj) => obj.ipaddr === req.body["ipaddr"]);
        if (exists) {
            res.status(409).end();
            return;
        }
        contacts.add({
            username: req.body["username"],
            ipaddr: req.body["ipaddr"]
        })
        res.status(200).end();
    }
    catch(err) {
        console.error(err);
        res.status(500).end();
    }
})

app.delete('/contacts/remove', (req, res) => {
    try {
        if (!req.body["ipaddr"]) {
            res.status(400).end();
            return;
        }
        const indexes = contacts.getIndexOf((obj) => obj.ipaddr === req.body["ipaddr"]);
        if (indexes.length === 0) {
            res.status(404).end();
            return;
        }
        for (let index of indexes)
            contacts.remove(index)
        res.status(200).end();
    }
    catch(err) {
        console.error(err);
        res.status(500).end();
    }
})

server.listen(5000, () => {
  console.log('listening on localhost:5000');
})
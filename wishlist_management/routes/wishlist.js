"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
const childrenArr = require('../assets/children.json');
app.get('/children', (req, res) => {
    res.send(childrenArr).status(200);
});
app.get('/children/:id/wishes', (req, res) => {
    const id = parseInt(req.params.id);
    const exists = childrenArr.find(e => e.id === id);
    if (exists) {
        res.send(exists.wishes).status(200);
        return;
    }
    res.status(404).send("child not found");
});
app.post('/children', (req, res) => {
    if (req.body.id && req.body.name && req.body.age && req.body.wishes) {
        let maxID = childrenArr[0].id;
        for (let i = 1; i < childrenArr.length; i++) {
            if (childrenArr[i].id > maxID) {
                maxID = childrenArr[i].id + 1;
            }
        }
        const child = { "id": maxID,
            "name": req.body.name,
            "age": req.body.age,
            "wishes": req.body.wishes };
        childrenArr.push(child);
        res.status(201).send("created");
        return;
    }
    res.status(403).send("Bad request");
});
module.exports = app;

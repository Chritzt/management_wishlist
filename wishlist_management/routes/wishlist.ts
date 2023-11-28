import express, {Request, Response, Router} from 'express';
import {IChild} from "../components/IChild";

const app:Router = express.Router();


const childrenArr:IChild[] = require('../assets/children.json')

app.get('/children', (req : Request, res : Response) =>{
    res.send(childrenArr).status(200);
})
app.get('/children/:id/wishes', (req:Request, res:Response) =>{
   const id = parseInt(req.params.id);
   const exists = childrenArr.find(e => e.id === id);

   if(exists){
       res.send(exists.wishes).status(200);
       return;
   }

   res.status(404).send("child not found");
})

app.post('/children', (req : Request, res: Response) =>{

    if(req.body.id && req.body.name && req.body.age && req.body.wishes){
        let maxID = childrenArr[0].id;

        for (let i = 1; i < childrenArr.length; i++) {
            if(childrenArr[i].id > maxID){
                maxID = childrenArr[i].id + 1;
            }
        }

        const child : IChild = {"id" : maxID,
            "name" : req.body.name,
            "age" : req.body.age,
            "wishes" : req.body.wishes};

        childrenArr.push(child);

        res.status(201).send("created");
        return;
    }

    res.status(403).send("Bad request");

})


module.exports = app;
import express, {Request, Response, Router} from 'express';
import {IChild} from "../components/IChild";
import {IWish} from "../components/IWish";

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
                maxID = childrenArr[i].id ;
            }
        }

        const child : IChild = {"id" : maxID + 1,
            "name" : req.body.name,
            "age" : req.body.age,
            "wishes" : req.body.wishes};

        childrenArr.push(child);

        res.status(201).send("created");
        return;
    }

    res.status(403).send("Bad request");

})

app.post('/children/:id/wishes', (req : Request, res : Response) =>{
    const id = parseInt(req.params.id);

    if(req.body.id && req.body.name && req.body.url && req.body.img_url){

        const indexOfChild : number = childrenArr.findIndex(e => e.id === id);

        if(indexOfChild < 0){
            res.status(404).send("child not found");
            return;
        }

        let maxID = childrenArr[indexOfChild].wishes[0].id;

        for (let i = 1; i < childrenArr[indexOfChild].wishes.length; i++) {
            if(childrenArr[indexOfChild].wishes[i].id > maxID){
                maxID = childrenArr[indexOfChild].wishes[i].id ;
            }
        }

        const wish : IWish = {"id" : maxID + 1,
            "name" : req.body.name,
            "url" : req.body.url,
            "img_url" : req.body.url
        }

        childrenArr[indexOfChild].wishes.push(wish);

        res.status(201).send("created");
        return;
    }

    res.status(403).send("Bad request");

})


module.exports = app;
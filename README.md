                  Module:7-Node and express js fundamental

7.2 common.js and esm modular system.
**common.js=>require , export/module.exports.js
**esm=>import, export default.mjs

7.3  synchronous and asynchronous  node.js  filesystem module;

**synchronous filesystem=>const fs=require('fs');


//readfile
const read=fs.readFileSync('./Text/read.txt','utf-8');


// write file
const writeFile=fs.readFileSync('/Text/write.txt' ,read );
console.log(writeFile);



**asynchronous fileSystem=> google search and see w3 school=>node.js fileSystem module
=>
const fs =require('fs');


fs.readFile('./Text/read.txt','utf-8',(err,data)=>{
    if(err){
        throw Error ('Read error')
    }
    console.log(data);


    fs.writeFile('./Text/read-3',data,(err)=>{
        if(err){
            console.log(err);
        }
        console.log("lolll");
    })
})

7-4 Event Driven Architecture, Create Your Own Events

=>event emitter  search in google =>emitter.emit
const EventEmitter=require('events');


const myEmit=new EventEmitter;


// first listener


myEmit.on('birthday',()=>{
    console.log(`happy bdy to u`);
})


// second listener
myEmit.on('birthday',(param)=>{
    console.log(`i will send u a gift  ${param} `);
})


myEmit.emit('birthday','bike')

7.5Stream And Buffer, Create Your Own Server
const http =require('http')
const fs=require('fs')
const { buffer } = require('stream/consumers')


// create a local server to receive data
const server=http.createServer((req,res)=>{
   if(req.url==='/read-file',req.method==="GET");
    // readStream see the filesystem in doc of node.js
    const readSream=fs.createReadStream(process.cwd()+'/Text/read.txt')
    readSream.on('data',(buffer)=>{
        res.write(buffer);
    })


    readSream.on('end',()=>{
        res.end('heloo world')
    })
   
   
})


server.listen('5000',()=>{
    console.log('the server is running on port no 5000');
})

7.6 Installing Express With Typescript
=>file open by vs =>npm init =>yarn add express =>yarn add -D typescript
=>tsc –init          //for configure the root dir out dir

app.ts=>const express = require('express')
const app = express()




app.get('/', (req, res) => {
    res.send('Hello World!')
  })






export default app

server.ts=>import { Server } from 'http';
import app from './app';


let server=Server;
let PORT=5000


async function bootStrap(){
    server=app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
      })
}
bootStrap()





7.7how to auto compile tsc  and how to auto js compiler
**tsc compile=>tsc -w
**js compile=>yarn add -D nodemon ;
Go package.json setting=>”start:dev”:”nodemon ./dist/server.js”
runcommand=> yarn start:dev

***app.ts=>const express = require('express')
import {Request,Response} from "express"
const app = express()
const port = 3000


// parsers
app.use(express.text())


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})


app.post('/',(req:Request,res:Response)=>{
  console.log(req.body);
  res.json({
    message:'successfully'
  })
 
})


export default app

***server.ts=>import app from "./app"
const PORT=5000;


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })

7.8  middleware and parser use
// parsers
app.use(express.text())


// middleware
const logger=(req:Request,res:Response,next:NextFunction)=>{
     console.log(req.url,req.method,req.hostname);
     next()
}

7.9 Routing In Express.Js
const express = require('express')


import {NextFunction, Request,Response} from "express"
const app = express()
const port = 3000


// parsers
app.use(express.text())


// middleware
const logger=(req:Request,res:Response,next:NextFunction)=>{
     console.log(req.url,req.method,req.hostname);
     next()
}
// route


const userRouter=express.Router();
const courseRoute=express.Router();






app.use('/api/v1/users',userRouter);
app.use('/api/v1/courses',courseRoute);


userRouter.get('/create-user',(req:Request,res:Response)=>{
  const user=req.body;
  console.log(user);
  res.json({
    success:true,
    message:'usre create',
    data:user
  })
 
})


courseRoute.post('/create-course',(req:Request,res:Response)=>{
  const course=req.body;
  console.log(course);
  res.json({
    success:true,
    message:'course create',
    data:course,
  })
 
})






app.get('/:userId/:myId', logger, (req:Request, res:Response) => {
  console.log(req);
 
  res.send('Hello World!')
})


app.post('/',logger,(req:Request,res:Response)=>{
  console.log(req.body);
  res.json({
    message:'successfully'
  })
 
})


export default app


7.10. Error handler and global error handler

Error handler:app.get("/", async (req, res) => {
  try {
    res.send(jjjj);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "data wrong",
    });
  }
})

**7.10 Global Error handler:=>
First send the error to global=>
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(jjjj);
  } catch (error) {
    next(error);
  }
});

Then global handle the error,global have 4 parameter
=>//global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
  next();
})


7.10   router error custom message

=>//route error handle
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Api is not Found",
  });
});








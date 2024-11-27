import express from 'express';
import fs from 'fs';
import { createTable } from './configDB.js';
import { createJobTable } from './configDB.js';
import https from 'https';
import { insertJobs } from './Controler/Job.js';


const app = express();
app.use(express.json());
createTable();
createJobTable();
insertJobs();



import router from './routes.js'
app.use(router);

app.listen( 3000, ()=>console.log("Api Rodando."))

https.createServer({
    
}, app).listen(3001, ()=> console.log("Rodando em https"));
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql';
import sql from 'mssql';
import cors from 'cors';
import sequelize from './config/db.config2.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config();

// Sync Sequelize models
try{
    sequelize.sync({force:false})
} catch(error){
    console.log(error)
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, 'static')));
app.use('', express.static(path.join(__dirname, 'images')));
app.use(cors());



// Routes
import userRouters from "./routes/user.js";


import { fileURLToPath } from 'url';

app.use('/api/auth', userRouters);

export default app;
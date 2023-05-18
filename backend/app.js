import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql';
import sql from 'mssql';
import cors from 'cors';
import sequelize from './config/db.config2.js';

const app = express();




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



// Routes
import userRouters from './routes/user';




app.use('/api/auth', userRouters);

export default app;
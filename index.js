import env from 'dotenv';
env.config();

import userRouter from './routes/user.routes.js'

import express from 'express';
const app = express();

import connectToDB from './database/databaseConnection.js';
import booksRouter from './routes/books.routes.js';
import categoryRouter from './routes/categories.routes.js';
connectToDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/v1/user', userRouter);
app.use('/api/v1/books', booksRouter);
app.use('/api/v1/categories', categoryRouter);


app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log('Error in Listening ', err);
    }else{
        console.log('App is Listening on Port ', process.env.PORT);
    }
})
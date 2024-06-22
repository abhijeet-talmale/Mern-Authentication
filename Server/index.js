import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config()
import { UserRouter } from './routes/User.js';
const app=express();
// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // specify your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json());
app.use('/auth',UserRouter);

mongoose.connect('mongodb://127.0.0.1:27017/authentication')
app.listen(process.env.PORT,()=>{
    console.log('server is running port 3000');
})
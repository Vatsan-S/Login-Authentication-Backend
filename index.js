import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./Database/config.js";
import userRouter from './Router/userRouter.js'


const app = express()
dotenv.config()


//middleware
app.use(express.json())
app.use(cors(
    {
        origin:'*',
        credential:true
    }
))

//Db Connection

connectDB()


//default routes

app.get('/',(req,res)=>{
    res.status(200).send("Hi welcome to the great kirikalan magic show")
})


//api routes

app.use('/api/user',userRouter)

//Listen
app.listen(process.env.PORT,()=>{
    console.log("App is started and being listened")
})
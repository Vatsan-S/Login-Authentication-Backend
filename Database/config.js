import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from "express";

dotenv.config()
const mongodb_url = process.env.MONGODB_URL
const connectDB = async(res,req)=>{
    try {
        const connection = await mongoose.connect(mongodb_url)
        console.log("DB connected successfully")
        return connection
    } catch (error) {
        console.log(error)
        
    }
};

export default connectDB;

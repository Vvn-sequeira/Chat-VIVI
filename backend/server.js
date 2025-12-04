import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";
import chatRouter from "./Routes/Chat.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api" , chatRouter)

app.listen(PORT, () => {
  console.log(`server Running on ${PORT}`);
  connectDB()
});

const connectDB = async()=> {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB is connected")
  } catch (error) {
    console.log("Failed to Connect to the DB , ", error)
  }
}

//  app.post("/test", async (req, res ) => {
 
// });


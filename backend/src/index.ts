import dotenv from "dotenv";
dotenv.config();
import express, { type NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from './Routes.js';
import passport from "passport";

export const port  = process.env.PORT || 3000;
const app = express();

const MONGO_URL = process.env.MONGO_URL;
export const JWT_TOKEN = process.env.JWT_TOKEN;

//db connection
mongoose
  .connect(MONGO_URL as string)
  .then(() => {
    console.log("mongo db connected Successfully");
  })
  .catch((err) => {
    console.log("mongo db connection failed " + err);
  });

//middlewares
app.use(express.json());
app.use(cors({
  origin:"*",
  credentials:true
}));

//routes
app.use(passport.initialize());
app.use("/",route);

 
app.listen(port, () => {
  console.log(`backend is listening on port ${port}`);
});
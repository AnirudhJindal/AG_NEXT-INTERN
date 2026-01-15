import express from "express"
 import {taskRouter } from "./routers/user"
import cors from "cors"
import { authRouter } from "./routers/auth"
import mongoose from "mongoose"


mongoose.connect(process.env.MONGO_URI!);
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth" , authRouter)
 app.use("/api/task" , taskRouter)
export default app;
   


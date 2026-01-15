import express from "express"
 import {taskRouter } from "./routers/user"
import cors from "cors"
import { authRouter } from "./routers/auth"
import mongoose from "mongoose"

mongoose.connect("mongodb+srv://ANIRUDH:q543H7zVHKujxL9h@cluster0.lbiokv1.mongodb.net/TaskIt")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth" , authRouter)
 app.use("/api/task" , taskRouter)
app.listen(3000 , ()=>{
    console.log("app has started on port 3000")
})
   


import express from "express"
import mongoose, { Mongoose } from "mongoose"
import jwt from "jsonwebtoken"
import { userRouter } from "./routers/user"
import cors from "cors"

const app = express()

mongoose.connect("mongodb+srv://ANIRUDH:WegfUIhsKJu5q9VO@cluster0.lbiokv1.mongodb.net/brainly")

app.use(express.json())
app.use(cors())
app.use("/user" , userRouter)









































app.listen(3000)
   


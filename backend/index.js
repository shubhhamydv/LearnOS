import express from "express"
import dotenv from 'dotenv'
import { connect } from "mongoose"
import connectDb from "./config/ConnectDB.js"
import cookieParser from 'cookie-parser'
import authRouter from "./route/authRoute.js"
dotenv.config()

const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)

app.get("/",(req,res)=>{
    res.send("hello from server")

})

app.listen(port, () =>{
    console.log("server started")
    connectDb()
})